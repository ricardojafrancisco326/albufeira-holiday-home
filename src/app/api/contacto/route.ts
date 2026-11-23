
import { NextResponse } from "next/server";
import { Resend } from "resend";


export async function POST(request: Request) {
  try {
    const dados = await request.json();

    if (!dados || typeof dados !== "object" || Array.isArray(dados)) {
      return NextResponse.json(
        { erro: "Dados inválidos." },
        { status: 400 }
      );
    }

    const { nome, email, telefone, mensagem, consentimento, website } =
      dados;

    // Campo invisível para bloquear bots simples.
    if (website) {
      return NextResponse.json({ sucesso: true });
    }

    if (
      typeof nome !== "string" ||
      !nome.trim() ||
      nome.length > 120 ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      email.length > 254 ||
      typeof mensagem !== "string" ||
      mensagem.trim().length < 10 ||
      mensagem.length > 3000 ||
      (telefone !== undefined &&
        (typeof telefone !== "string" || telefone.length > 30)) ||
      consentimento !== "sim"
    ) {
      return NextResponse.json(
        { erro: "Preenche corretamente os campos obrigatórios." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const destinatario = process.env.CONTACT_EMAIL;
    const remetente = process.env.RESEND_FROM_EMAIL;

    if (!apiKey || !destinatario || !remetente) {
      console.error("Configuração de email incompleta.");
      return NextResponse.json(
        { erro: "Serviço indisponível." },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: remetente,
      to: destinatario,
      subject: "Novo pedido de informação sobre a casa",
      replyTo: email,
      text: [
        "Novo pedido de contacto",
        "",
        `Nome: ${nome.trim()}`,
        `Email: ${email.trim()}`,
        `Telefone: ${telefone?.trim() || "Não indicado"}`,
        "",
        "Mensagem:",
        mensagem.trim(),
        "",
        "Consentimento para resposta ao pedido: Sim",
      ].join("\n"),
    });

    if (error) {
      console.error("Erro no envio:", error);
      return NextResponse.json(
        { erro: "Falha no envio." },
        { status: 502 }
      );
    }

    return NextResponse.json({ sucesso: true });
  } catch {
    return NextResponse.json(
      { erro: "Pedido inválido ou erro interno." },
      { status: 400 }
    );
  }
}
