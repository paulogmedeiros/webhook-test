export const RESET_PASSWORD_TEMPLATE = `
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <title>Recuperação de senha</title>
  </head>
  <body style="margin:0; padding:0; background:#f4f6f8; font-family: Arial, sans-serif;">
    <div style="max-width:600px; margin:0 auto; background:#ffffff; padding:32px; border-radius:8px;">
      <h1 style="color:#111827;">Recuperação de senha</h1>

      <p style="color:#374151;">
        Recebemos uma solicitação para redefinir sua senha.
      </p>

      <a
        href="{{RESET_PASSWORD_URL}}"
        style="
          display:inline-block;
          margin-top:24px;
          background:#2563eb;
          color:#ffffff;
          padding:14px 24px;
          border-radius:6px;
          text-decoration:none;
          font-weight:bold;
        "
      >
        Redefinir senha
      </a>

      <p style="margin-top:24px; font-size:14px; color:#6b7280;">
        Este link é válido por 30 minutos.  
        Se você não solicitou esta ação, ignore este email.
      </p>
    </div>
  </body>
</html>
`;
