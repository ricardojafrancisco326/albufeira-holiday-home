
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Mail,
  Phone,
  UserRound,
  Users,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function ContactForm() {
  const [estado, setEstado] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const [erro, setErro] = useState("");
  const [entrada, setEntrada] = useState("");
  const [saida, setSaida] = useState("");

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEstado("sending");
    setErro("");

    const formulario = e.currentTarget;
    const dados = new FormData(formulario);

    if (entrada && saida && saida <= entrada) {
      setErro("A data de saída deve ser posterior à entrada.");
      setEstado("error");
      return;
    }

    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

    if (!endpoint) {
      setErro("O formulário ainda não está configurado.");
      setEstado("error");
      return;
    }

    try {
      const resposta = await fetch(endpoint, {
        method: "POST",
        body: dados,
        headers: {
          Accept: "application/json",
        },
      });

      if (!resposta.ok) {
        throw new Error(
          "Não foi possível enviar o pedido. Tente novamente."
        );
      }

      formulario.reset();
      setEntrada("");
      setSaida("");
      setEstado("success");
    } catch (erro) {
      setErro(
        erro instanceof Error
          ? erro.message
          : "Ocorreu um erro de ligação."
      );
      setEstado("error");
    }
  }

  const campo =
    "w-full rounded-xl border border-slate-200 bg-[#faf9f6] px-4 py-3.5 text-[#183b43] outline-none transition focus:border-[#b28a53] focus:ring-2 focus:ring-[#b28a53]/15";

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl md:p-12">
        <div className="mb-9">
          <h3 className="mb-3 font-serif text-3xl font-bold text-[#183b43]">
            Peça informações
          </h3>
          <p className="leading-7 text-slate-500">
            Preencha o formulário e entraremos em contacto
            para esclarecer as suas questões.
          </p>
        </div>

        <form onSubmit={enviar} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="nome" className="mb-2 block text-sm font-semibold">
                <UserRound size={16} className="mr-2 inline text-[#b28a53]" />
                Nome completo *
              </label>
              <input
                id="nome"
                name="nome"
                required
                maxLength={120}
                autoComplete="name"
                placeholder="O seu nome"
                className={campo}
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold">
                <Mail size={16} className="mr-2 inline text-[#b28a53]" />
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                maxLength={254}
                autoComplete="email"
                placeholder="email@exemplo.pt"
                className={campo}
              />
            </div>
          </div>

          <div>
            <label htmlFor="telefone" className="mb-2 block text-sm font-semibold">
              <Phone size={16} className="mr-2 inline text-[#b28a53]" />
              Contacto telefónico
            </label>
            <input
              id="telefone"
              name="telefone"
              type="tel"
              maxLength={30}
              autoComplete="tel"
              placeholder="+351 900 000 000"
              className={campo}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="entrada" className="mb-2 block text-sm font-semibold">
                <CalendarDays size={16} className="mr-2 inline text-[#b28a53]" />
                Data de entrada
              </label>
              <input
                id="entrada"
                name="data_entrada"
                type="date"
                value={entrada}
                onChange={(e) => setEntrada(e.target.value)}
                className={campo}
              />
            </div>

            <div>
              <label htmlFor="saida" className="mb-2 block text-sm font-semibold">
                <CalendarDays size={16} className="mr-2 inline text-[#b28a53]" />
                Data de saída
              </label>
              <input
                id="saida"
                name="data_saida"
                type="date"
                min={entrada || undefined}
                value={saida}
                onChange={(e) => setSaida(e.target.value)}
                className={campo}
              />
            </div>
          </div>

          <div>
            <label htmlFor="hospedes" className="mb-2 block text-sm font-semibold">
              <Users size={16} className="mr-2 inline text-[#b28a53]" />
              Número de hóspedes
            </label>
            <select
              id="hospedes"
              name="numero_hospedes"
              defaultValue=""
              className={campo}
            >
              <option value="">Selecione o número de hóspedes</option>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "pessoa" : "pessoas"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="mensagem" className="mb-2 block text-sm font-semibold">
              <MessageSquare size={16} className="mr-2 inline text-[#b28a53]" />
              Mensagem *
            </label>
            <textarea
              id="mensagem"
              name="mensagem"
              required
              minLength={10}
              maxLength={3000}
              rows={5}
              placeholder="Gostaria de obter informações sobre disponibilidade, preços..."
              className={`${campo} resize-y`}
            />
          </div>

          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <label className="flex items-start gap-3 text-sm leading-6 text-slate-600">
            <input
              type="checkbox"
              name="consentimento"
              value="sim"
              required
              className="mt-1 accent-[#183b43]"
            />
            <span>
  Li e compreendi a{" "}
  <Link
    href="/politica-de-privacidade"
    target="_blank"
    rel="noopener noreferrer"
    className="font-semibold text-[#b28a53] underline"
  >
    Política de Privacidade
  </Link>
  {" "}e autorizo a utilização dos meus dados
  para responder ao pedido de contacto.
</span>
          </label>

          <button
            type="submit"
            disabled={estado === "sending"}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#183b43] px-6 py-4 font-semibold text-white transition hover:bg-[#285b65] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {estado === "sending"
              ? "A enviar pedido..."
              : "Enviar pedido de informações"}
            <ArrowRight size={19} />
          </button>

          {estado === "success" && (
            <div
              role="status"
              className="flex items-center gap-3 rounded-xl bg-green-50 p-4 text-sm font-medium text-green-800"
            >
              <CheckCircle2 size={21} />
              Pedido enviado com sucesso! Entraremos em contacto brevemente.
            </div>
          )}

          {estado === "error" && (
            <div
              role="alert"
              className="flex items-center gap-3 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700"
            >
              <AlertCircle size={21} />
              {erro}
            </div>
          )}

          <p className="text-center text-xs leading-5 text-slate-400">
            O envio deste formulário não constitui uma reserva.
            A disponibilidade e as condições são confirmadas
            diretamente com a proprietária.
          </p>
        </form>
      </div>
    </div>
  );
}
