
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Images,
  Mail,
  MapPin,
  Menu,
  Phone,
  Users,
  UtensilsCrossed,
  X,
} from "lucide-react";

import ContactForm from "@/components/ContactForm";

const fotografias = Array.from(
  { length: 33 },
  (_, i) => i + 1
)
  .filter((numero) => numero !== 6)
  .map((numero) => `/imagens/${numero}.JPG`);

const navegacao = [
  { id: "inicio", titulo: "Início" },
  { id: "sobre", titulo: "A propriedade" },
  { id: "galeria", titulo: "Galeria" },
  { id: "localizacao", titulo: "Localização" },
  { id: "contacto", titulo: "Contacto" },
];

const caracteristicas = [
  {
    icon: BedDouble,
    titulo: "2 quartos",
    descricao: "Apartamento T2",
  },
  {
    icon: Users,
    titulo: "Até 6 pessoas",
    descricao: "Ideal para famílias e amigos",
  },
  {
    icon: MapPin,
    titulo: "Localização central",
    descricao: "A cerca de 5 minutos do centro",
  },
  {
    icon: CalendarDays,
    titulo: "Estadias semanais",
    descricao: "Férias ao seu ritmo",
  },
];

export default function Home() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [secaoAtiva, setSecaoAtiva] = useState("inicio");
  const [mostrarTodas, setMostrarTodas] = useState(false);
  const [imagemAtiva, setImagemAtiva] = useState<number | null>(
    null
  );

  const imagensVisiveis = mostrarTodas
    ? fotografias
    : fotografias.slice(0, 9);

  // Identificar automaticamente a secção ativa.
  useEffect(() => {
    const atualizarSecao = () => {
      const posicao = window.scrollY + 160;
      let ativa = "inicio";

      for (const item of navegacao) {
        const elemento = document.getElementById(item.id);

        if (
          elemento &&
          elemento.getBoundingClientRect().top +
            window.scrollY <=
            posicao
        ) {
          ativa = item.id;
        }
      }

      // Garantir que a última secção fica ativa
      // quando chegamos ao fundo da página.
      const chegouAoFim =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 30;

      if (chegouAoFim) {
        ativa = "contacto";
      }

      setSecaoAtiva(ativa);
    };

    atualizarSecao();

    window.addEventListener("scroll", atualizarSecao, {
      passive: true,
    });

    window.addEventListener("resize", atualizarSecao);

    return () => {
      window.removeEventListener("scroll", atualizarSecao);
      window.removeEventListener("resize", atualizarSecao);
    };
  }, []);

  // Navegação da galeria por teclado.
  useEffect(() => {
    if (imagemAtiva === null) return;

    function aoPremirTecla(evento: KeyboardEvent) {
      if (evento.key === "Escape") {
        setImagemAtiva(null);
      }

      if (evento.key === "ArrowRight") {
        setImagemAtiva((atual) =>
          atual === null
            ? null
            : (atual + 1) % fotografias.length
        );
      }

      if (evento.key === "ArrowLeft") {
        setImagemAtiva((atual) =>
          atual === null
            ? null
            : (atual - 1 + fotografias.length) %
              fotografias.length
        );
      }
    }

    document.addEventListener("keydown", aoPremirTecla);

    return () => {
      document.removeEventListener("keydown", aoPremirTecla);
    };
  }, [imagemAtiva]);

  // Impedir o scroll enquanto a galeria está aberta.
  useEffect(() => {
    if (imagemAtiva === null) return;

    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = anterior;
    };
  }, [imagemAtiva]);

  const imagemAnterior = () => {
    setImagemAtiva((atual) =>
      atual === null
        ? null
        : (atual - 1 + fotografias.length) %
          fotografias.length
    );
  };

  const imagemSeguinte = () => {
    setImagemAtiva((atual) =>
      atual === null
        ? null
        : (atual + 1) % fotografias.length
    );
  };

  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#183b43]">
      {/* CABEÇALHO */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-5 px-5 md:px-8">
          <a
            href="#inicio"
            onClick={() => setMenuAberto(false)}
            className="flex shrink-0 flex-col"
          >
            <span className="font-serif text-xl font-bold tracking-wide md:text-2xl">
              ALBUFEIRA
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#b28a53]">
              Holiday Home
            </span>
          </a>

          {/* MENU DESKTOP */}
          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-7 lg:flex"
          >
            {navegacao
              .filter((item) => item.id !== "contacto")
              .map((item) => {
                const ativo = secaoAtiva === item.id;

                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    aria-current={
                      ativo ? "location" : undefined
                    }
                    className={`group relative py-3 text-sm font-semibold transition-colors duration-300 ${
                      ativo
                        ? "text-[#b28a53]"
                        : "text-[#183b43] hover:text-[#b28a53]"
                    }`}
                  >
                    {item.titulo}

                    <span
                      className={`absolute bottom-1 left-0 h-[2px] rounded-full bg-[#b28a53] transition-all duration-300 ${
                        ativo
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    />
                  </a>
                );
              })}

            <a
              href="#contacto"
              aria-current={
                secaoAtiva === "contacto"
                  ? "location"
                  : undefined
              }
              className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ${
                secaoAtiva === "contacto"
                  ? "bg-[#b28a53] shadow-lg shadow-[#b28a53]/20"
                  : "bg-[#183b43] hover:bg-[#285b65]"
              }`}
            >
              Pedir informações
              <ArrowUpRight size={16} />
            </a>
          </nav>

          {/* BOTÃO MOBILE */}
          <button
            type="button"
            aria-label={
              menuAberto ? "Fechar menu" : "Abrir menu"
            }
            aria-expanded={menuAberto}
            aria-controls="menu-mobile"
            onClick={() => setMenuAberto(!menuAberto)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-[#183b43] lg:hidden"
          >
            {menuAberto ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>

        {/* MENU MOBILE */}
        {menuAberto && (
          <nav
            id="menu-mobile"
            aria-label="Navegação móvel"
            className="border-t border-slate-100 bg-white px-5 py-4 shadow-xl lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {navegacao.map((item) => {
                const ativo = secaoAtiva === item.id;

                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    aria-current={
                      ativo ? "location" : undefined
                    }
                    onClick={() => setMenuAberto(false)}
                    className={`rounded-xl border-l-4 px-4 py-3 text-sm font-semibold transition-colors ${
                      ativo
                        ? "border-[#b28a53] bg-[#faf5ec] text-[#b28a53]"
                        : "border-transparent text-[#183b43] hover:bg-slate-50"
                    }`}
                  >
                    {item.titulo}
                  </a>
                );
              })}
            </div>
          </nav>
        )}
      </header>

      {/* HERO */}
      <section
        id="inicio"
        className="relative flex min-h-[650px] scroll-mt-20 items-center overflow-hidden bg-[#183b43] md:min-h-[750px]"
      >
        <Image
          src="/imagens/1.JPG"
          alt="Albufeira Holiday Home, apartamento de férias no Algarve"
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#102d35]/90 via-[#102d35]/65 to-[#102d35]/20" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 md:px-8">
          <div className="max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
              <MapPin size={15} className="text-[#e5c38b]" />
              Albufeira, Algarve
            </div>

            <h1 className="mb-7 font-serif text-5xl font-bold leading-[1.1] text-white md:text-7xl">
              O seu refúgio
              <br />
              no coração
              <br />
              <span className="italic text-[#e5c38b]">
                do Algarve.
              </span>
            </h1>

            <p className="mb-10 max-w-xl text-lg leading-8 text-white/85">
              Desfrute de dias inesquecíveis em Albufeira,
              num apartamento T2 acolhedor, ideal para
              famílias e amigos, perto do centro da cidade.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contacto"
                className="inline-flex items-center gap-3 rounded-full bg-[#b28a53] px-7 py-4 font-semibold text-white transition hover:bg-[#9c7746]"
              >
                Pedir informações
                <ArrowRight size={18} />
              </a>

              <a
                href="#galeria"
                className="inline-flex items-center gap-3 rounded-full border border-white/50 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                Ver fotografias
                <Images size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 text-xs uppercase tracking-[0.25em] text-white/70 md:block">
          Descubra mais ↓
        </div>
      </section>

      {/* CARACTERÍSTICAS RÁPIDAS */}
      <section className="relative z-10 mx-auto -mt-8 max-w-7xl px-5 md:px-8">
        <div className="grid overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-900/10 sm:grid-cols-2 lg:grid-cols-4">
          {caracteristicas.map((item, index) => {
            const Icone = item.icon;

            return (
              <div
                key={item.titulo}
                className={`flex items-center gap-4 px-6 py-7 ${
                  index > 0 ? "border-t border-slate-100 sm:border-t-0" : ""
                }`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f6efe5] text-[#b28a53]">
                  <Icone size={23} />
                </div>

                <div>
                  <p className="font-bold text-[#183b43]">
                    {item.titulo}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {item.descricao}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SOBRE */}
      <section
        id="sobre"
        className="scroll-mt-24 px-6 py-24 md:py-32"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-xl">
              <Image
                src="/imagens/2.JPG"
                alt="Interior do apartamento Albufeira Holiday Home"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-7 right-5 rounded-2xl bg-[#183b43] px-8 py-6 text-white shadow-xl md:-right-5">
              <p className="font-serif text-4xl font-bold text-[#e5c38b]">
                T2
              </p>
              <p className="mt-1 text-sm text-white/80">
                Até 6 hóspedes
              </p>
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#b28a53]">
              A propriedade
            </p>

            <h2 className="mb-7 font-serif text-4xl font-bold leading-tight md:text-5xl">
              Sinta-se em casa,
              <br />
              mesmo longe dela.
            </h2>

            <p className="mb-5 leading-8 text-slate-600">
              O Albufeira Holiday Home é um apartamento
              T2 situado em Albufeira, no coração do Algarve.
              Com capacidade até 6 pessoas, é uma opção
              para desfrutar de férias em família ou
              com amigos.
            </p>

            <p className="mb-8 leading-8 text-slate-600">
              A sua localização permite chegar ao centro
              de Albufeira em aproximadamente 5 minutos
              a pé, com acesso a restaurantes, cafés,
              comércio e diferentes opções de lazer.
            </p>

            <div className="mb-9 grid gap-4 sm:grid-cols-2">
              {[
                "Apartamento T2",
                "Capacidade até 6 pessoas",
                "Cozinha equipada",
                "Perto do centro",
                "Ideal para férias",
                "Estadias semanais",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm font-medium"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f6efe5] text-[#b28a53]">
                    <Check size={14} />
                  </span>
                  {item}
                </div>
              ))}
            </div>

            <a
              href="#contacto"
              className="inline-flex items-center gap-3 rounded-full bg-[#183b43] px-7 py-4 font-semibold text-white transition hover:bg-[#285b65]"
            >
              Saber mais
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* COMODIDADES */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#b28a53]">
              Conforto e comodidade
            </p>

            <h2 className="font-serif text-4xl font-bold md:text-5xl">
              Tudo para umas boas férias
            </h2>

            <p className="mt-6 leading-8 text-slate-500">
              Um espaço pensado para aproveitar Albufeira
              com conforto, tranquilidade e liberdade.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: BedDouble,
                titulo: "Dois quartos",
                texto: "Apartamento T2 para uma estadia confortável.",
              },
              {
                icon: Users,
                titulo: "Até 6 hóspedes",
                texto: "Uma opção para famílias ou grupos de amigos.",
              },
              {
                icon: UtensilsCrossed,
                titulo: "Cozinha equipada",
                texto: "Comodidade para preparar refeições durante as férias.",
              },
              {
                icon: MapPin,
                titulo: "Perto do centro",
                texto: "A poucos minutos a pé da zona central de Albufeira.",
              },
            ].map((item) => {
              const Icone = item.icon;

              return (
                <div
                  key={item.titulo}
                  className="group rounded-2xl border border-slate-100 bg-[#faf9f6] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#b28a53] shadow-sm">
                    <Icone size={27} />
                  </div>

                  <h3 className="mb-3 text-xl font-bold">
                    {item.titulo}
                  </h3>

                  <p className="text-sm leading-7 text-slate-500">
                    {item.texto}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section
        id="galeria"
        className="scroll-mt-24 px-5 py-24 md:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#b28a53]">
                Galeria
              </p>

              <h2 className="font-serif text-4xl font-bold md:text-5xl">
                Conheça cada detalhe
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-slate-500">
                Explore as fotografias do apartamento
                e descubra o espaço onde poderá passar
                as suas próximas férias.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm font-semibold text-[#b28a53]">
              <Images size={18} />
              {fotografias.length} fotografias
            </div>
          </div>

         
<div className="columns-2 gap-3 md:columns-3 md:gap-5">
  {imagensVisiveis.map((foto, index) => (
    <button
      key={foto}
      type="button"
      onClick={() => setImagemAtiva(index)}
      aria-label={`Ampliar fotografia ${index + 1}`}
      className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-slate-200 md:mb-5"
    >
      <Image
        src={foto}
        alt={`Fotografia ${index + 1} do Albufeira Holiday Home`}
        width={900}
        height={700}
        sizes="(max-width: 768px) 50vw, 33vw"
        className="h-auto w-full transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />

      <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#183b43] opacity-0 transition-opacity group-hover:opacity-100">
        <ArrowUpRight size={20} />
      </span>
    </button>
  ))}
</div>


          {!mostrarTodas && (
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() => setMostrarTodas(true)}
                className="inline-flex items-center gap-3 rounded-full border border-[#183b43] px-8 py-4 font-semibold text-[#183b43] transition hover:bg-[#183b43] hover:text-white"
              >
                <Images size={18} />
                Ver todas as fotografias
                <ArrowRight size={18} />
              </button>
            </div>
          )}

          {mostrarTodas && (
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => {
                  setMostrarTodas(false);
                  document
                    .getElementById("galeria")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-sm font-semibold text-[#b28a53] underline underline-offset-4"
              >
                Mostrar menos fotografias
              </button>
            </div>
          )}
        </div>
      </section>

      {/* LOCALIZAÇÃO */}
      <section
        id="localizacao"
        className="scroll-mt-24 bg-[#183b43] px-6 py-24 text-white"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#e5c38b]">
              Localização
            </p>

            <h2 className="mb-7 font-serif text-4xl font-bold leading-tight md:text-5xl">
              Albufeira,
              <br />
              o melhor do Algarve.
            </h2>

            <p className="mb-8 max-w-xl leading-8 text-white/75">
              Aproveite a proximidade ao centro de Albufeira,
              com restaurantes, cafés, lojas e várias opções
              de lazer. Uma localização prática para descobrir
              a cidade e desfrutar das suas férias.
            </p>

            <div className="mb-9 space-y-5">
              <div className="flex items-start gap-4">
                <MapPin
                  size={22}
                  className="mt-1 shrink-0 text-[#e5c38b]"
                />
                <div>
                  <p className="font-bold">
                    Albufeira, Algarve
                  </p>
                  <p className="mt-1 text-sm text-white/65">
                    Portugal
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock3
                  size={22}
                  className="mt-1 shrink-0 text-[#e5c38b]"
                />
                <div>
                  <p className="font-bold">
                    Perto do centro
                  </p>
                  <p className="mt-1 text-sm text-white/65">
                    Aproximadamente 5 minutos a pé
                  </p>
                </div>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Albufeira%2C+Portugal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-[#b28a53] px-7 py-4 font-semibold text-white transition hover:bg-[#9c7746]"
            >
              Explorar Albufeira
              <ArrowUpRight size={18} />
            </a>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] bg-[#285b65] p-8 md:p-12">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10" />
            <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full border border-white/10" />

            <div className="relative z-10 flex min-h-[350px] flex-col items-center justify-center text-center">
              <div className="mb-7 flex h-24 w-24 items-center justify-center rounded-full bg-white/10">
                <MapPin
                  size={45}
                  className="text-[#e5c38b]"
                />
              </div>

              <h3 className="font-serif text-3xl font-bold">
                Descubra Albufeira
              </h3>

              <p className="mt-5 max-w-sm leading-8 text-white/70">
                Sol, praias, gastronomia e momentos
                inesquecíveis no coração do Algarve.
              </p>

              <span className="mt-8 rounded-full border border-white/20 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-[#e5c38b]">
                Algarve · Portugal
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTOS */}
      <section
        id="contacto"
        className="scroll-mt-24 px-6 py-24 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#b28a53]">
              Contactos
            </p>

            <h2 className="font-serif text-4xl font-bold md:text-5xl">
              As suas próximas férias
              começam aqui.
            </h2>

            <p className="mt-6 leading-8 text-slate-500">
              Tem dúvidas sobre disponibilidade,
              preços ou condições? Entre em contacto
              connosco. Teremos todo o gosto em ajudar.
            </p>
          </div>

          <div className="mb-12 grid gap-5 md:grid-cols-2">
            <a
              href="tel:+351918449789"
              className="group flex items-center gap-5 rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f6efe5] text-[#b28a53]">
                <Phone size={25} />
              </div>

              <div className="min-w-0">
                <p className="text-sm text-slate-500">
                  Telefone
                </p>
                <p className="mt-1 text-lg font-bold">
                  +351 918 449 789
                </p>
              </div>

              <ArrowUpRight
                size={20}
                className="ml-auto shrink-0 text-[#b28a53]"
              />
            </a>

            <a
              href="mailto:albufeiraholidayhome168@gmail.com"
              className="group flex items-center gap-5 rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f6efe5] text-[#b28a53]">
                <Mail size={25} />
              </div>

              <div className="min-w-0">
                <p className="text-sm text-slate-500">
                  Email
                </p>
                <p className="mt-1 break-all text-sm font-bold sm:text-base">
                  albufeiraholidayhome168@gmail.com
                </p>
              </div>

              <ArrowUpRight
                size={20}
                className="ml-auto shrink-0 text-[#b28a53]"
              />
            </a>
          </div>

          {/* FORMULÁRIO FORMSPREE EXISTENTE */}
          <ContactForm />
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="bg-[#102d35] px-6 py-12 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-8 border-b border-white/10 pb-10 text-center md:flex-row md:text-left">
            <div>
              <p className="font-serif text-2xl font-bold">
                ALBUFEIRA
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#e5c38b]">
                Holiday Home
              </p>
              <p className="mt-4 max-w-xs text-sm leading-7 text-white/60">
                O seu espaço de férias no coração
                do Algarve.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/75">
              <a
                href="#inicio"
                className="hover:text-[#e5c38b]"
              >
                Início
              </a>
              <a
                href="#sobre"
                className="hover:text-[#e5c38b]"
              >
                A propriedade
              </a>
              <a
                href="#galeria"
                className="hover:text-[#e5c38b]"
              >
                Galeria
              </a>
              <a
                href="#contacto"
                className="hover:text-[#e5c38b]"
              >
                Contactos
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-5 pt-8 text-center text-xs text-white/50 md:flex-row">
            <p>
              © 2026 Albufeira Holiday Home.
              Todos os direitos reservados.
            </p>

            <Link
              href="/politica-de-privacidade"
              className="transition hover:text-white"
            >
              Política de Privacidade
            </Link>
          </div>
        </div>
      </footer>

      {/* LIGHTBOX DA GALERIA */}
      {imagemAtiva !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Visualizador de fotografias"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-3 md:p-10"
          onClick={() => setImagemAtiva(null)}
        >
          <button
            type="button"
            aria-label="Fechar fotografia"
            onClick={() => setImagemAtiva(null)}
            className="absolute right-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
          >
            <X size={25} />
          </button>

          <div
            className="relative h-[75vh] w-full max-w-6xl"
            onClick={(evento) => evento.stopPropagation()}
          >
            <Image
              src={fotografias[imagemAtiva]}
              alt={`Fotografia ampliada ${imagemAtiva + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />

            <button
              type="button"
              aria-label="Fotografia anterior"
              onClick={imagemAnterior}
              className="absolute left-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/80 md:-left-6"
            >
              <ChevronLeft size={28} />
            </button>

            <button
              type="button"
              aria-label="Fotografia seguinte"
              onClick={imagemSeguinte}
              className="absolute right-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/80 md:-right-6"
            >
              <ChevronRight size={28} />
            </button>
          </div>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm font-semibold tracking-widest text-white/80">
            {imagemAtiva + 1} / {fotografias.length}
          </p>
        </div>
      )}
    </main>
  );
}
