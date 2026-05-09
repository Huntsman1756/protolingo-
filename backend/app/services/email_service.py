"""Email service — wraps fastapi-mail for transactional emails.

Reads configuration from settings. If EMAIL_ENABLED=false, all send_*
functions are no-ops so the app works without SMTP configured.
"""
from __future__ import annotations

import logging
from pathlib import Path

from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType

from app.core.config import settings

logger = logging.getLogger(__name__)

_TEMPLATES_DIR = Path(__file__).parent.parent / "templates" / "email"


def _get_mail_config() -> ConnectionConfig:
    return ConnectionConfig(
        MAIL_USERNAME=settings.SMTP_USER,
        MAIL_PASSWORD=settings.SMTP_PASSWORD,
        MAIL_FROM=settings.SMTP_FROM,
        MAIL_PORT=settings.SMTP_PORT,
        MAIL_SERVER=settings.SMTP_HOST,
        MAIL_STARTTLS=settings.SMTP_TLS,
        MAIL_SSL_TLS=settings.SMTP_SSL,
        USE_CREDENTIALS=bool(settings.SMTP_USER),
        VALIDATE_CERTS=True,
    )


_VERIFY_I18N: dict[str, dict[str, str]] = {
    "en": {
        "greeting": "Hi {name},",
        "subject": "Verify your FreeLingo account",
        "body": "Thank you for creating your FreeLingo account.<br />Please verify your email address by clicking the button below. This link is valid for <strong>24 hours</strong>.",
        "button": "Verify my account",
        "link_fallback": "If the button doesn't work, copy and paste this link into your browser:",
        "footer": "If you didn't create this account, you can ignore this email.",
    },
    "es": {
        "greeting": "Hola {name},",
        "subject": "Verifica tu cuenta de FreeLingo",
        "body": "Gracias por crear tu cuenta de FreeLingo.<br />Por favor, verifica tu direcci\u00f3n de correo haciendo clic en el bot\u00f3n. Este enlace es v\u00e1lido durante <strong>24 horas</strong>.",
        "button": "Verificar mi cuenta",
        "link_fallback": "Si el bot\u00f3n no funciona, copia y pega este enlace en tu navegador:",
        "footer": "Si no creaste esta cuenta, puedes ignorar este correo.",
    },
    "fr": {
        "greeting": "Bonjour {name},",
        "subject": "V\u00e9rifiez votre compte FreeLingo",
        "body": "Merci de cr\u00e9er votre compte FreeLingo.<br />Veuillez v\u00e9rifier votre adresse e-mail en cliquant sur le bouton ci-dessous. Ce lien est valable <strong>24 heures</strong>.",
        "button": "V\u00e9rifier mon compte",
        "link_fallback": "Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur\u00a0:",
        "footer": "Si vous n'avez pas cr\u00e9\u00e9 ce compte, vous pouvez ignorer cet e-mail.",
    },
    "de": {
        "greeting": "Hallo {name},",
        "subject": "Verifiziere deinen FreeLingo-Account",
        "body": "Danke f\u00fcr die Erstellung deines FreeLingo-Accounts.<br />Bitte verifiziere deine E-Mail-Adresse \u00fcber den Button. Dieser Link ist <strong>24 Stunden</strong> g\u00fcltig.",
        "button": "Meinen Account verifizieren",
        "link_fallback": "Falls der Button nicht funktioniert, kopiere diesen Link in deinen Browser:",
        "footer": "Falls du diesen Account nicht erstellt hast, kannst du diese E-Mail ignorieren.",
    },
    "pt": {
        "greeting": "Ol\u00e1 {name},",
        "subject": "Verifique a sua conta FreeLingo",
        "body": "Obrigado por criar a sua conta FreeLingo.<br />Por favor, verifique o seu endere\u00e7o de e-mail clicando no bot\u00e3o. Este link \u00e9 v\u00e1lido por <strong>24 horas</strong>.",
        "button": "Verificar a minha conta",
        "link_fallback": "Se o bot\u00e3o n\u00e3o funcionar, copie e cole este link no seu navegador:",
        "footer": "Se n\u00e3o criou esta conta, pode ignorar este e-mail.",
    },
    "it": {
        "greeting": "Ciao {name},",
        "subject": "Verifica il tuo account FreeLingo",
        "body": "Grazie per aver creato il tuo account FreeLingo.<br />Verifica il tuo indirizzo e-mail cliccando sul pulsante. Questo link \u00e8 valido per <strong>24 ore</strong>.",
        "button": "Verifica il mio account",
        "link_fallback": "Se il pulsante non funziona, copia e incolla questo link nel browser:",
        "footer": "Se non hai creato questo account, puoi ignorare questa e-mail.",
    },
    "nl": {
        "greeting": "Hallo {name},",
        "subject": "Verifieer je FreeLingo-account",
        "body": "Bedankt voor het aanmaken van je FreeLingo-account.<br />Verifieer je e-mailadres door op de knop te klikken. Deze link is <strong>24 uur</strong> geldig.",
        "button": "Mijn account verifi\u00ebren",
        "link_fallback": "Als de knop niet werkt, kopieer en plak dan deze link in je browser:",
        "footer": "Als je dit account niet hebt aangemaakt, kun je deze e-mail negeren.",
    },
    "pl": {
        "greeting": "Cze\u015b\u0107 {name},",
        "subject": "Zweryfikuj swoje konto FreeLingo",
        "body": "Dzi\u0119kujemy za za\u0142o\u017cenie konta FreeLingo.<br />Zweryfikuj sw\u00f3j adres e-mail klikaj\u0105c przycisk poni\u017cej. Ten link jest wa\u017cny przez <strong>24 godziny</strong>.",
        "button": "Zweryfikuj moje konto",
        "link_fallback": "Je\u015bli przycisk nie dzia\u0142a, skopiuj i wklej ten link do przegl\u0105darki:",
        "footer": "Je\u015bli nie zak\u0142ada\u0142e\u015b tego konta, mo\u017cesz zignorowa\u0107 ten e-mail.",
    },
    "ro": {
        "greeting": "Bun\u0103 {name},",
        "subject": "Verific\u0103-\u021bi contul FreeLingo",
        "body": "Mul\u021bumim c\u0103 \u021bi-ai creat contul FreeLingo.<br />Te rug\u0103m s\u0103-\u021bi verifici adresa de e-mail f\u0103c\u00e2nd clic pe buton. Acest link este valabil <strong>24 de ore</strong>.",
        "button": "Verific\u0103-mi contul",
        "link_fallback": "Dac\u0103 butonul nu func\u021bioneaz\u0103, copiaz\u0103 \u0219i lipirii acest link \u00een browser:",
        "footer": "Dac\u0103 nu ai creat acest cont, po\u021bi ignora acest e-mail.",
    },
    "ru": {
        "greeting": "\u041f\u0440\u0438\u0432\u0435\u0442, {name},",
        "subject": "\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u0430\u043a\u043a\u0430\u0443\u043d\u0442 FreeLingo",
        "body": "\u0421\u043f\u0430\u0441\u0438\u0431\u043e \u0437\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044e \u0432 FreeLingo.<br />\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u0430\u0434\u0440\u0435\u0441 \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u043d\u043d\u043e\u0439 \u043f\u043e\u0447\u0442\u044b, \u043d\u0430\u0436\u0430\u0432 \u043d\u0430 \u043a\u043d\u043e\u043f\u043a\u0443. \u0421\u0441\u044b\u043b\u043a\u0430 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u044c\u043d\u0430 <strong>24 \u0447\u0430\u0441\u0430</strong>.",
        "button": "\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044c \u0430\u043a\u043a\u0430\u0443\u043d\u0442",
        "link_fallback": "\u0415\u0441\u043b\u0438 \u043a\u043d\u043e\u043f\u043a\u0430 \u043d\u0435 \u0440\u0430\u0431\u043e\u0442\u0430\u0435\u0442, \u0441\u043a\u043e\u043f\u0438\u0440\u0443\u0439\u0442\u0435 \u0438 \u0432\u0441\u0442\u0430\u0432\u044c\u0442\u0435 \u044d\u0442\u0443 \u0441\u0441\u044b\u043b\u043a\u0443 \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440:",
        "footer": "\u0415\u0441\u043b\u0438 \u0432\u044b \u043d\u0435 \u0441\u043e\u0437\u0434\u0430\u0432\u0430\u043b\u0438 \u044d\u0442\u043e\u0442 \u0430\u043a\u043a\u0430\u0443\u043d\u0442, \u043f\u0440\u043e\u0441\u0442\u043e \u0438\u0433\u043d\u043e\u0440\u0438\u0440\u0443\u0439\u0442\u0435 \u044d\u0442\u043e \u043f\u0438\u0441\u044c\u043c\u043e.",
    },
}

_RESET_I18N: dict[str, dict[str, str]] = {
    "en": {
        "greeting": "Hi {name},",
        "subject": "Reset your FreeLingo password",
        "body": "We received a request to reset the password for your FreeLingo account.<br />Click the button below to create a new password. This link is valid for <strong>1 hour</strong>.",
        "button": "Reset my password",
        "link_fallback": "If the button doesn't work, copy and paste this link into your browser:",
        "footer": "If you didn't request a password reset, you can safely ignore this email.",
    },
    "es": {
        "greeting": "Hola {name},",
        "subject": "Restablece tu contrase\u00f1a de FreeLingo",
        "body": "Hemos recibido una solicitud para restablecer la contrase\u00f1a de tu cuenta FreeLingo.<br />Haz clic en el bot\u00f3n para crear una nueva. Este enlace es v\u00e1lido durante <strong>1 hora</strong>.",
        "button": "Restablecer contrase\u00f1a",
        "link_fallback": "Si el bot\u00f3n no funciona, copia y pega este enlace en tu navegador:",
        "footer": "Si no solicitaste restablecer tu contrase\u00f1a, puedes ignorar este correo.",
    },
    "fr": {
        "greeting": "Bonjour {name},",
        "subject": "R\u00e9initialisez votre mot de passe FreeLingo",
        "body": "Nous avons re\u00e7u une demande de r\u00e9initialisation du mot de passe de votre compte FreeLingo.<br />Cliquez sur le bouton pour cr\u00e9er un nouveau mot de passe. Ce lien est valable <strong>1 heure</strong>.",
        "button": "R\u00e9initialiser mon mot de passe",
        "link_fallback": "Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur\u00a0:",
        "footer": "Si vous n'avez pas demand\u00e9 cette r\u00e9initialisation, vous pouvez ignorer cet e-mail.",
    },
    "de": {
        "greeting": "Hallo {name},",
        "subject": "Setze dein FreeLingo-Passwort zur\u00fcck",
        "body": "Wir haben eine Anfrage zum Zur\u00fccksetzen deines FreeLingo-Passworts erhalten.<br />Klicke auf den Button, um ein neues Passwort zu erstellen. Dieser Link ist <strong>1 Stunde</strong> g\u00fcltig.",
        "button": "Passwort zur\u00fccksetzen",
        "link_fallback": "Falls der Button nicht funktioniert, kopiere diesen Link in deinen Browser:",
        "footer": "Falls du keine Zur\u00fccksetzung beantragt hast, kannst du diese E-Mail ignorieren.",
    },
    "pt": {
        "greeting": "Ol\u00e1 {name},",
        "subject": "Redefina a sua senha do FreeLingo",
        "body": "Recebemos um pedido para redefinir a senha da sua conta FreeLingo.<br />Clique no bot\u00e3o para criar uma nova senha. Este link \u00e9 v\u00e1lido por <strong>1 hora</strong>.",
        "button": "Redefinir senha",
        "link_fallback": "Se o bot\u00e3o n\u00e3o funcionar, copie e cole este link no seu navegador:",
        "footer": "Se n\u00e3o solicitou esta redefini\u00e7\u00e3o, pode ignorar este e-mail.",
    },
    "it": {
        "greeting": "Ciao {name},",
        "subject": "Reimposta la tua password FreeLingo",
        "body": "Abbiamo ricevuto una richiesta di reimpostazione della password del tuo account FreeLingo.<br />Clicca sul pulsante per creare una nuova password. Questo link \u00e8 valido per <strong>1 ora</strong>.",
        "button": "Reimposta password",
        "link_fallback": "Se il pulsante non funziona, copia e incolla questo link nel browser:",
        "footer": "Se non hai richiesto la reimpostazione, puoi ignorare questa e-mail.",
    },
    "nl": {
        "greeting": "Hallo {name},",
        "subject": "Stel je FreeLingo-wachtwoord opnieuw in",
        "body": "We hebben een verzoek ontvangen om het wachtwoord van je FreeLingo-account opnieuw in te stellen.<br />Klik op de knop om een nieuw wachtwoord aan te maken. Deze link is <strong>1 uur</strong> geldig.",
        "button": "Wachtwoord opnieuw instellen",
        "link_fallback": "Als de knop niet werkt, kopieer en plak dan deze link in je browser:",
        "footer": "Als je dit niet hebt aangevraagd, kun je deze e-mail negeren.",
    },
    "pl": {
        "greeting": "Cze\u015b\u0107 {name},",
        "subject": "Zresetuj swoje has\u0142o do FreeLingo",
        "body": "Otrzymali\u015bmy pro\u015bb\u0119 o zresetowanie has\u0142a do konta FreeLingo.<br />Kliknij przycisk, aby utworzy\u0107 nowe has\u0142o. Ten link jest wa\u017cny przez <strong>1 godzin\u0119</strong>.",
        "button": "Zresetuj has\u0142o",
        "link_fallback": "Je\u015bli przycisk nie dzia\u0142a, skopiuj i wklej ten link do przegl\u0105darki:",
        "footer": "Je\u015bli nie prosi\u0142e\u015b o reset, mo\u017cesz zignorowa\u0107 ten e-mail.",
    },
    "ro": {
        "greeting": "Bun\u0103 {name},",
        "subject": "Resetez\u0103-\u021bi parola FreeLingo",
        "body": "Am primit o cerere de resetare a parolei contului t\u0103u FreeLingo.<br />F\u0103 clic pe buton pentru a crea o parol\u0103 nou\u0103. Acest link este valabil <strong>1 or\u0103</strong>.",
        "button": "Resetez\u0103 parola",
        "link_fallback": "Dac\u0103 butonul nu func\u021bioneaz\u0103, copiaz\u0103 \u0219i lipirii acest link \u00een browser:",
        "footer": "Dac\u0103 nu ai solicitat resetarea, po\u021bi ignora acest e-mail.",
    },
    "ru": {
        "greeting": "\u041f\u0440\u0438\u0432\u0435\u0442, {name},",
        "subject": "\u0421\u0431\u0440\u043e\u0441 \u043f\u0430\u0440\u043e\u043b\u044f FreeLingo",
        "body": "\u041c\u044b \u043f\u043e\u043b\u0443\u0447\u0438\u043b\u0438 \u0437\u0430\u043f\u0440\u043e\u0441 \u043d\u0430 \u0441\u0431\u0440\u043e\u0441 \u043f\u0430\u0440\u043e\u043b\u044f \u0432\u0430\u0448\u0435\u0433\u043e \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0430 FreeLingo.<br />\u041d\u0430\u0436\u043c\u0438\u0442\u0435 \u043a\u043d\u043e\u043f\u043a\u0443, \u0447\u0442\u043e\u0431\u044b \u0441\u043e\u0437\u0434\u0430\u0442\u044c \u043d\u043e\u0432\u044b\u0439 \u043f\u0430\u0440\u043e\u043b\u044c. \u0421\u0441\u044b\u043b\u043a\u0430 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u044c\u043d\u0430 <strong>1 \u0447\u0430\u0441</strong>.",
        "button": "\u0421\u0431\u0440\u043e\u0441\u0438\u0442\u044c \u043f\u0430\u0440\u043e\u043b\u044c",
        "link_fallback": "\u0415\u0441\u043b\u0438 \u043a\u043d\u043e\u043f\u043a\u0430 \u043d\u0435 \u0440\u0430\u0431\u043e\u0442\u0430\u0435\u0442, \u0441\u043a\u043e\u043f\u0438\u0440\u0443\u0439\u0442\u0435 \u0438 \u0432\u0441\u0442\u0430\u0432\u044c\u0442\u0435 \u044d\u0442\u0443 \u0441\u0441\u044b\u043b\u043a\u0443 \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440:",
        "footer": "\u0415\u0441\u043b\u0438 \u0432\u044b \u043d\u0435 \u0437\u0430\u043f\u0440\u0430\u0448\u0438\u0432\u0430\u043b\u0438 \u0441\u0431\u0440\u043e\u0441, \u043f\u0440\u043e\u0441\u0442\u043e \u0438\u0433\u043d\u043e\u0440\u0438\u0440\u0443\u0439\u0442\u0435 \u044d\u0442\u043e \u043f\u0438\u0441\u044c\u043c\u043e.",
    },
}


def _render_template(name: str, context: dict) -> str:
    """Render a plain HTML template with simple {{key}} substitution."""
    path = _TEMPLATES_DIR / name
    html = path.read_text(encoding="utf-8")
    for key, value in context.items():
        html = html.replace(f"{{{{{key}}}}}", str(value))
    return html


async def send_verification_email(to: str, display_name: str, token: str, locale: str = "en") -> None:
    """Send email verification link in the user's native language."""
    if not settings.EMAIL_ENABLED:
        return
    strings = _VERIFY_I18N.get(locale, _VERIFY_I18N["en"])
    url = f"{settings.APP_BASE_URL}/verify-email?token={token}"
    html = _render_template(
        "verify_email.html",
        {
            "greeting": strings["greeting"].format(name=display_name),
            "body": strings["body"],
            "button": strings["button"],
            "link_fallback": strings["link_fallback"],
            "footer": strings["footer"],
            "url": url,
            "base_url": settings.APP_BASE_URL,
        },
    )
    message = MessageSchema(
        subject=strings["subject"],
        recipients=[to],
        body=html,
        subtype=MessageType.html,
    )
    try:
        fm = FastMail(_get_mail_config())
        await fm.send_message(message)
    except Exception:
        logger.exception("Failed to send verification email to %s", to)


async def send_reset_password_email(to: str, display_name: str, token: str, locale: str = "en") -> None:
    """Send password reset link in the user's native language."""
    if not settings.EMAIL_ENABLED:
        return
    strings = _RESET_I18N.get(locale, _RESET_I18N["en"])
    url = f"{settings.APP_BASE_URL}/reset-password?token={token}"
    html = _render_template(
        "reset_password.html",
        {
            "greeting": strings["greeting"].format(name=display_name),
            "body": strings["body"],
            "button": strings["button"],
            "link_fallback": strings["link_fallback"],
            "footer": strings["footer"],
            "url": url,
            "base_url": settings.APP_BASE_URL,
        },
    )
    message = MessageSchema(
        subject=strings["subject"],
        recipients=[to],
        body=html,
        subtype=MessageType.html,
    )
    try:
        fm = FastMail(_get_mail_config())
        await fm.send_message(message)
    except Exception:
        logger.exception("Failed to send reset password email to %s", to)
