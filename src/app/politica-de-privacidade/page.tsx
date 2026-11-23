
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | Albufeira Holiday Home",
  description:
    "Informações sobre o tratamento de dados pessoais no website Albufeira Holiday Home.",
};

export default function PoliticaPrivacidade() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#183b43]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-6">
          <Link href="/" className="font-serif text-xl font-bold">
            ALBUFEIRA
            <span className="ml-2 text-sm text-[#b28a53]">
              HOLIDAY HOME
            </span>
          </Link>

          <Link
            href="/"
            className="text-sm font-semibold hover:text-[#b28a53]"
          >
            ← Voltar ao início
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-6 py-20">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#b28a53]">
          Proteção de dados
        </p>

        <h1 className="mb-8 font-serif text-4xl md:text-5xl">
          Política de Privacidade
        </h1>

        <p className="mb-12 leading-8 text-slate-600">
          O Albufeira Holiday Home respeita a privacidade dos
          visitantes e compromete-se a tratar os dados pessoais
          de forma transparente, de acordo com o Regulamento
          Geral sobre a Proteção de Dados (RGPD) e a legislação
          portuguesa aplicável.
        </p>

        <div className="space-y-10 leading-8 text-slate-600">
          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#183b43]">
              1. Responsável pelo tratamento
            </h2>
            <p>
              O tratamento dos dados pessoais recolhidos através
              deste website é da responsabilidade da pessoa ou
              entidade que gere o alojamento Albufeira Holiday Home.
            </p>
            <p className="mt-3">
              Contacto:{" "}
              <a
                href="mailto:albufeiraholidayhome168@gmail.com"
                className="break-all text-[#b28a53] underline"
              >
                albufeiraholidayhome168@gmail.com
              </a>
            </p>
            <p className="mt-3">
              Antes da publicação definitiva, será identificada
              aqui a pessoa ou entidade responsável pelo tratamento.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#183b43]">
              2. Dados pessoais recolhidos
            </h2>
            <p>
              Através do formulário de contacto poderão ser
              recolhidos os seguintes dados:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Nome completo;</li>
              <li>Endereço de email;</li>
              <li>Contacto telefónico, quando fornecido;</li>
              <li>Datas pretendidas para a estadia;</li>
              <li>Número de hóspedes;</li>
              <li>Conteúdo da mensagem enviada.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#183b43]">
              3. Finalidades do tratamento
            </h2>
            <p>
              Os dados são utilizados para responder a pedidos
              de informação, esclarecer questões sobre o
              alojamento e comunicar informações relativas
              à disponibilidade e condições de estadia.
            </p>
            <p className="mt-3">
              Não serão utilizados para comunicações de marketing
              sem uma base legal adequada.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#183b43]">
              4. Fundamento jurídico
            </h2>
            <p>
              O tratamento dos dados necessários à resposta a
              pedidos de informação poderá fundamentar-se em
              diligências pré-contratuais solicitadas pelo titular,
              nos termos do artigo 6.º, n.º 1, alínea b), do RGPD.
              Outras operações de tratamento serão avaliadas
              de acordo com a respetiva finalidade e fundamento
              jurídico aplicável.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#183b43]">
              5. Serviços externos
            </h2>
            <p>
              O formulário utiliza o serviço Formspree para
              processar e encaminhar os pedidos de contacto.
              Os dados poderão ser tratados por este fornecedor,
              nos termos das condições contratuais e da sua
              política de privacidade.
            </p>
            <p className="mt-3">
              Poderá consultar a política do fornecedor em{" "}
              <a
                href="https://formspree.io/legal/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#b28a53] underline"
              >
                Formspree
              </a>.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#183b43]">
              6. Conservação dos dados
            </h2>
            <p>
              Os dados serão conservados apenas durante o
              período necessário às finalidades para as quais
              foram recolhidos, tendo em conta eventuais
              obrigações legais aplicáveis.
            </p>
            <p className="mt-3">
              O prazo concreto de conservação deverá ser
              definido pelo responsável antes da publicação.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#183b43]">
              7. Direitos dos titulares
            </h2>
            <p>
              Nos termos da legislação aplicável, os titulares
              podem solicitar o acesso, retificação ou apagamento
              dos seus dados, bem como exercer outros direitos
              previstos no RGPD, quando aplicáveis.
            </p>
            <p className="mt-3">
              Os pedidos podem ser enviados para
              albufeiraholidayhome168@gmail.com.
            </p>
            <p className="mt-3">
              Os titulares podem também apresentar reclamação
              junto da Comissão Nacional de Proteção de Dados
              (CNPD), em www.cnpd.pt.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#183b43]">
              8. Segurança
            </h2>
            <p>
              São adotadas medidas técnicas e organizativas
              adequadas para proteger os dados pessoais contra
              acessos não autorizados, perda ou utilização indevida.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#183b43]">
              9. Atualizações
            </h2>
            <p>
              Esta Política de Privacidade poderá ser atualizada
              sempre que existam alterações nos serviços,
              procedimentos ou requisitos legais aplicáveis.
            </p>
          </section>
        </div>

        <div className="mt-14 border-t border-slate-200 pt-8">
          <Link
            href="/"
            className="inline-flex rounded-full bg-[#183b43] px-7 py-3 font-semibold text-white hover:bg-[#285b65]"
          >
            Voltar à página inicial
          </Link>
        </div>
      </article>
    </main>
  );
}
