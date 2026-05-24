"""Email service — wraps fastapi-mail for transactional emails.

Reads configuration from settings. If EMAIL_ENABLED=false, all send_*
functions are no-ops so the app works without SMTP configured.
"""
from __future__ import annotations

from pathlib import Path

from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType

from app.core.app_logger import get_logger
from app.core.config import settings

logger = get_logger(__name__)

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
        "link_fallback": "Dac\u0103 butonul nu func\u021bioneaz\u0103, copiaz\u0103 \u0219i lipi\u015fte acest link \u00een browser:",
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
        "link_fallback": "Dac\u0103 butonul nu func\u021bioneaz\u0103, copiaz\u0103 \u0219i lipi\u015fte acest link \u00een browser:",
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

_WELCOME_I18N: dict[str, dict[str, str]] = {
    "en": {
        "subject": "Welcome to FreeLingo!",
        "greeting": "Hi {name},",
        "body": "Your account is ready. Here is how to get started:",
        "step1": "Take the <strong>Assessment</strong> — it detects your current level (A1–C2) and your strengths and weak points.",
        "step2": "Generate your <strong>Study Plan</strong> — a week-by-week schedule tailored to your level and goals.",
        "step3": "Complete your first daily lesson and start building your streak.",
        "button": "Go to my dashboard",
        "footer": "Happy learning!",
    },
    "es": {
        "subject": "\u00a1Bienvenido a FreeLingo!",
        "greeting": "Hola {name},",
        "body": "Tu cuenta est\u00e1 lista. As\u00ed puedes empezar:",
        "step1": "Haz la <strong>Evaluaci\u00f3n</strong> \u2014 detecta tu nivel actual (A1\u2013C2) y tus puntos fuertes y d\u00e9biles.",
        "step2": "Genera tu <strong>Plan de estudio</strong> \u2014 un calendario semanal adaptado a tu nivel y objetivos.",
        "step3": "Completa tu primera lecci\u00f3n diaria y empieza a construir tu racha.",
        "button": "Ir a mi panel",
        "footer": "\u00a1Buena suerte con el aprendizaje!",
    },
    "fr": {
        "subject": "Bienvenue sur FreeLingo\u00a0!",
        "greeting": "Bonjour {name},",
        "body": "Votre compte est pr\u00eat. Voici comment commencer\u00a0:",
        "step1": "Passez l\u2019<strong>\u00e9valuation</strong> \u2014 elle d\u00e9tecte votre niveau actuel (A1\u2013C2) et vos points forts et faibles.",
        "step2": "G\u00e9n\u00e9rez votre <strong>plan d\u2019\u00e9tude</strong> \u2014 un planning semaine par semaine adapt\u00e9 \u00e0 votre niveau et vos objectifs.",
        "step3": "Terminez votre premi\u00e8re le\u00e7on quotidienne et commencez \u00e0 construire votre s\u00e9rie.",
        "button": "Aller \u00e0 mon tableau de bord",
        "footer": "Bon apprentissage\u00a0!",
    },
    "de": {
        "subject": "Willkommen bei FreeLingo!",
        "greeting": "Hallo {name},",
        "body": "Dein Konto ist bereit. So geht es los:",
        "step1": "Mache das <strong>Assessment</strong> \u2014 es erkennt dein aktuelles Niveau (A1\u2013C2) sowie deine St\u00e4rken und Schw\u00e4chen.",
        "step2": "Erstelle deinen <strong>Lernplan</strong> \u2014 einen wochenweisen Zeitplan, der auf dein Niveau und deine Ziele abgestimmt ist.",
        "step3": "Schlie\u00dfe deine erste t\u00e4gliche Lektion ab und baue deine Serie auf.",
        "button": "Zu meinem Dashboard",
        "footer": "Viel Spa\u00df beim Lernen!",
    },
    "pt": {
        "subject": "Bem-vindo ao FreeLingo!",
        "greeting": "Ol\u00e1 {name},",
        "body": "A sua conta est\u00e1 pronta. Veja como come\u00e7ar:",
        "step1": "Fa\u00e7a a <strong>Avalia\u00e7\u00e3o</strong> \u2014 ela deteta o seu n\u00edvel atual (A1\u2013C2) e os seus pontos fortes e fracos.",
        "step2": "Gere o seu <strong>Plano de estudo</strong> \u2014 um calend\u00e1rio semanal adaptado ao seu n\u00edvel e objetivos.",
        "step3": "Complete a sua primeira li\u00e7\u00e3o di\u00e1ria e comece a construir a sua sequ\u00eancia.",
        "button": "Ir para o meu painel",
        "footer": "Bons estudos!",
    },
    "it": {
        "subject": "Benvenuto su FreeLingo!",
        "greeting": "Ciao {name},",
        "body": "Il tuo account \u00e8 pronto. Ecco come iniziare:",
        "step1": "Fai la <strong>Valutazione</strong> \u2014 rileva il tuo livello attuale (A1\u2013C2) e i tuoi punti di forza e debolezza.",
        "step2": "Genera il tuo <strong>Piano di studio</strong> \u2014 un programma settimanale adattato al tuo livello e ai tuoi obiettivi.",
        "step3": "Completa la tua prima lezione quotidiana e inizia a costruire la tua serie.",
        "button": "Vai alla mia dashboard",
        "footer": "Buono studio!",
    },
    "nl": {
        "subject": "Welkom bij FreeLingo!",
        "greeting": "Hallo {name},",
        "body": "Je account is klaar. Zo ga je aan de slag:",
        "step1": "Doe de <strong>Assessment</strong> \u2014 het detecteert je huidige niveau (A1\u2013C2) en je sterke en zwakke punten.",
        "step2": "Genereer je <strong>Studieplan</strong> \u2014 een week-voor-week schema afgestemd op je niveau en doelen.",
        "step3": "Voltooi je eerste dagelijkse les en begin met het opbouwen van je reeks.",
        "button": "Naar mijn dashboard",
        "footer": "Veel leerplezier!",
    },
    "pl": {
        "subject": "Witamy w FreeLingo!",
        "greeting": "Cze\u015b\u0107 {name},",
        "body": "Twoje konto jest gotowe. Oto jak zacz\u0105\u0107:",
        "step1": "Wykonaj <strong>Assessment</strong> \u2014 wykryje Tw\u00f3j obecny poziom (A1\u2013C2) oraz mocne i s\u0142abe strony.",
        "step2": "Wygeneruj sw\u00f3j <strong>Plan nauki</strong> \u2014 tygodniowy harmonogram dostosowany do Twojego poziomu i cel\u00f3w.",
        "step3": "Uko\u0144cz pierwsz\u0105 codzienn\u0105 lekcj\u0119 i zacznij budowa\u0107 swoj\u0105 seri\u0119.",
        "button": "Przejd\u017a do mojego panelu",
        "footer": "Mi\u0142ej nauki!",
    },
    "ro": {
        "subject": "Bun venit la FreeLingo!",
        "greeting": "Bun\u0103 {name},",
        "body": "Contul t\u0103u este gata. Iat\u0103 cum po\u021bi \u00eencepe:",
        "step1": "F\u0103 <strong>Evaluarea</strong> \u2014 detecteaz\u0103 nivelul t\u0103u actual (A1\u2013C2) \u0219i punctele forte \u0219i slabe.",
        "step2": "Genereaz\u0103 <strong>Planul de studiu</strong> \u2014 un program s\u0103pt\u0103m\u00e2nal adaptat nivelului \u0219i obiectivelor tale.",
        "step3": "Finalizeaz\u0103 prima lec\u021bie zilnic\u0103 \u0219i \u00eencepe s\u0103 \u00ee\u021bi construie\u0219ti seria.",
        "button": "Mergi la tabloul meu de bord",
        "footer": "Mult succes la \u00eenv\u0103\u021bat!",
    },
    "ru": {
        "subject": "\u0414\u043e\u0431\u0440\u043e \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c \u0432 FreeLingo!",
        "greeting": "\u041f\u0440\u0438\u0432\u0435\u0442, {name},",
        "body": "\u0412\u0430\u0448 \u0430\u043a\u043a\u0430\u0443\u043d\u0442 \u0433\u043e\u0442\u043e\u0432. \u0412\u043e\u0442 \u043a\u0430\u043a \u043d\u0430\u0447\u0430\u0442\u044c:",
        "step1": "\u041f\u0440\u043e\u0439\u0434\u0438\u0442\u0435 <strong>\u0422\u0435\u0441\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435</strong> \u2014 \u043e\u043d\u043e \u043e\u043f\u0440\u0435\u0434\u0435\u043b\u0438\u0442 \u0432\u0430\u0448 \u0442\u0435\u043a\u0443\u0449\u0438\u0439 \u0443\u0440\u043e\u0432\u0435\u043d\u044c (A1\u2013C2), \u0441\u0438\u043b\u044c\u043d\u044b\u0435 \u0438 \u0441\u043b\u0430\u0431\u044b\u0435 \u0441\u0442\u043e\u0440\u043e\u043d\u044b.",
        "step2": "\u0421\u043e\u0437\u0434\u0430\u0439\u0442\u0435 <strong>\u041f\u043b\u0430\u043d \u043e\u0431\u0443\u0447\u0435\u043d\u0438\u044f</strong> \u2014 \u043f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u043e\u0435 \u0440\u0430\u0441\u043f\u0438\u0441\u0430\u043d\u0438\u0435, \u0430\u0434\u0430\u043f\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u043e\u0435 \u043f\u043e\u0434 \u0432\u0430\u0448 \u0443\u0440\u043e\u0432\u0435\u043d\u044c \u0438 \u0446\u0435\u043b\u0438.",
        "step3": "\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u0435 \u043f\u0435\u0440\u0432\u044b\u0439 \u0435\u0436\u0435\u0434\u043d\u0435\u0432\u043d\u044b\u0439 \u0443\u0440\u043e\u043a \u0438 \u043d\u0430\u0447\u043d\u0438\u0442\u0435 \u043d\u0430\u043a\u0430\u043f\u043b\u0438\u0432\u0430\u0442\u044c \u0441\u0435\u0440\u0438\u044e.",
        "button": "\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u043d\u0430 \u043f\u0430\u043d\u0435\u043b\u044c \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f",
        "footer": "\u0423\u0441\u043f\u0435\u0445\u043e\u0432 \u0432 \u043e\u0431\u0443\u0447\u0435\u043d\u0438\u0438!",
    },
}


_DELETION_I18N: dict[str, dict[str, str]] = {
    "en": {
        "subject": "Your FreeLingo account has been deleted",
        "greeting": "Hi {name},",
        "body": "Your FreeLingo account has been successfully deleted. All your data has been permanently removed from our servers.",
        "footer": "If you did not request this deletion, please contact us immediately.",
    },
    "es": {
        "subject": "Tu cuenta de FreeLingo ha sido eliminada",
        "greeting": "Hola {name},",
        "body": "Tu cuenta de FreeLingo ha sido eliminada correctamente. Todos tus datos han sido borrados permanentemente de nuestros servidores.",
        "footer": "Si no solicitaste esta eliminaci\u00f3n, cont\u00e1ctanos de inmediato.",
    },
    "fr": {
        "subject": "Votre compte FreeLingo a \u00e9t\u00e9 supprim\u00e9",
        "greeting": "Bonjour {name},",
        "body": "Votre compte FreeLingo a \u00e9t\u00e9 supprim\u00e9 avec succ\u00e8s. Toutes vos donn\u00e9es ont \u00e9t\u00e9 d\u00e9finitivement effac\u00e9es de nos serveurs.",
        "footer": "Si vous n\u2019avez pas demand\u00e9 cette suppression, contactez-nous imm\u00e9diatement.",
    },
    "de": {
        "subject": "Dein FreeLingo-Konto wurde gel\u00f6scht",
        "greeting": "Hallo {name},",
        "body": "Dein FreeLingo-Konto wurde erfolgreich gel\u00f6scht. Alle deine Daten wurden dauerhaft von unseren Servern entfernt.",
        "footer": "Falls du diese L\u00f6schung nicht beantragt hast, kontaktiere uns bitte sofort.",
    },
    "pt": {
        "subject": "A sua conta FreeLingo foi eliminada",
        "greeting": "Ol\u00e1 {name},",
        "body": "A sua conta FreeLingo foi eliminada com sucesso. Todos os seus dados foram removidos permanentemente dos nossos servidores.",
        "footer": "Se n\u00e3o solicitou esta elimina\u00e7\u00e3o, contacte-nos imediatamente.",
    },
    "it": {
        "subject": "Il tuo account FreeLingo \u00e8 stato eliminato",
        "greeting": "Ciao {name},",
        "body": "Il tuo account FreeLingo \u00e8 stato eliminato con successo. Tutti i tuoi dati sono stati rimossi definitivamente dai nostri server.",
        "footer": "Se non hai richiesto questa eliminazione, contattaci immediatamente.",
    },
    "nl": {
        "subject": "Je FreeLingo-account is verwijderd",
        "greeting": "Hallo {name},",
        "body": "Je FreeLingo-account is succesvol verwijderd. Al je gegevens zijn permanent van onze servers verwijderd.",
        "footer": "Als je deze verwijdering niet hebt aangevraagd, neem dan onmiddellijk contact met ons op.",
    },
    "pl": {
        "subject": "Twoje konto FreeLingo zosta\u0142o usuni\u0119te",
        "greeting": "Cze\u015b\u0107 {name},",
        "body": "Twoje konto FreeLingo zosta\u0142o pomy\u015blnie usuni\u0119te. Wszystkie Twoje dane zosta\u0142y trwale usuni\u0119te z naszych serwerk\u00f3w.",
        "footer": "Je\u015bli nie prosi\u0142e\u015b o usuni\u0119cie konta, skontaktuj si\u0119 z nami natychmiast.",
    },
    "ro": {
        "subject": "Contul t\u0103u FreeLingo a fost \u0219ters",
        "greeting": "Bun\u0103 {name},",
        "body": "Contul t\u0103u FreeLingo a fost \u0219ters cu succes. Toate datele tale au fost eliminate definitiv de pe serverele noastre.",
        "footer": "Dac\u0103 nu ai solicitat aceast\u0103 \u015ftergere, contacteaz\u0103-ne imediat.",
    },
    "ru": {
        "subject": "\u0412\u0430\u0448 \u0430\u043a\u043a\u0430\u0443\u043d\u0442 FreeLingo \u0443\u0434\u0430\u043b\u0451\u043d",
        "greeting": "\u041f\u0440\u0438\u0432\u0435\u0442, {name},",
        "body": "\u0412\u0430\u0448 \u0430\u043a\u043a\u0430\u0443\u043d\u0442 FreeLingo \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u0443\u0434\u0430\u043b\u0451\u043d. \u0412\u0441\u0435 \u0432\u0430\u0448\u0438 \u0434\u0430\u043d\u043d\u044b\u0435 \u0431\u044b\u043b\u0438 \u043d\u0430\u0432\u0441\u0435\u0433\u0434\u0430 \u0443\u0434\u0430\u043b\u0435\u043d\u044b \u0441 \u043d\u0430\u0448\u0438\u0445 \u0441\u0435\u0440\u0432\u0435\u0440\u043e\u0432.",
        "footer": "\u0415\u0441\u043b\u0438 \u0432\u044b \u043d\u0435 \u0437\u0430\u043f\u0440\u0430\u0448\u0438\u0432\u0430\u043b\u0438 \u0443\u0434\u0430\u043b\u0435\u043d\u0438\u0435, \u043d\u0435\u043c\u0435\u0434\u043b\u0435\u043d\u043d\u043e \u0441\u0432\u044f\u0436\u0438\u0442\u0435\u0441\u044c \u0441 \u043d\u0430\u043c\u0438.",
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


async def send_welcome_email(to: str, display_name: str, locale: str = "en") -> None:
    """Send a welcome email with onboarding steps in the user's native language."""
    if not settings.EMAIL_ENABLED:
        return
    strings = _WELCOME_I18N.get(locale, _WELCOME_I18N["en"])
    url = f"{settings.APP_BASE_URL}/dashboard"
    html = _render_template(
        "welcome.html",
        {
            "greeting": strings["greeting"].format(name=display_name),
            "body": strings["body"],
            "step1": strings["step1"],
            "step2": strings["step2"],
            "step3": strings["step3"],
            "button": strings["button"],
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
        logger.exception("Failed to send welcome email to %s", to)


async def send_contact_email(sender_email: str, subject: str, description: str) -> None:
    """Forward a contact-form submission to the configured CONTACT_EMAIL address."""
    if not settings.EMAIL_ENABLED:
        return
    if not settings.CONTACT_EMAIL:
        logger.warning("CONTACT_EMAIL is not configured — contact form submission dropped")
        return
    html = _render_template(
        "contact.html",
        {
            "sender_email": sender_email,
            "subject": subject,
            "description": description,
            "base_url": settings.APP_BASE_URL,
        },
    )
    message = MessageSchema(
        subject=f"[FreeLingo Contact] {subject}",
        recipients=[settings.CONTACT_EMAIL],
        reply_to=[sender_email],
        body=html,
        subtype=MessageType.html,
    )
    try:
        fm = FastMail(_get_mail_config())
        await fm.send_message(message)
    except Exception:
        logger.exception("Failed to send contact email from %s", sender_email)
        raise


async def send_account_deleted_email(to: str, display_name: str, locale: str = "en") -> None:
    """Send account deletion confirmation in the user's native language."""
    if not settings.EMAIL_ENABLED:
        return
    strings = _DELETION_I18N.get(locale, _DELETION_I18N["en"])
    html = _render_template(
        "account_deleted.html",
        {
            "greeting": strings["greeting"].format(name=display_name),
            "body": strings["body"],
            "footer": strings["footer"],
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
        logger.exception("Failed to send account deleted email to %s", to)


async def send_feedback_notification(
    entry_type: str,
    title: str,
    description: str,
    author_username: str,
    entry_id: int,
) -> None:
    """Notify CONTACT_EMAIL when a new feature request or bug report is submitted.

    Always sent in English (admin-facing notification, no i18n needed).
    Silently skipped when EMAIL_ENABLED=false or CONTACT_EMAIL is not set.
    Never raises — the feedback entry is already persisted before this is called.
    """
    if not settings.EMAIL_ENABLED:
        return
    if not settings.CONTACT_EMAIL:
        logger.warning("CONTACT_EMAIL is not configured — feedback notification dropped")
        return
    type_label = "Feature request" if entry_type == "feature" else "Bug report"
    admin_url = f"{settings.APP_BASE_URL}/admin/feedback/{entry_id}"
    html = _render_template(
        "feedback_submitted.html",
        {
            "type": entry_type,
            "type_label": type_label,
            "author_username": author_username,
            "title": title,
            "description": description,
            "admin_url": admin_url,
            "base_url": settings.APP_BASE_URL,
        },
    )
    subject_prefix = "[Feature Request]" if entry_type == "feature" else "[Bug Report]"
    message = MessageSchema(
        subject=f"{subject_prefix} {title}",
        recipients=[settings.CONTACT_EMAIL],
        body=html,
        subtype=MessageType.html,
    )
    try:
        fm = FastMail(_get_mail_config())
        await fm.send_message(message)
    except Exception:
        logger.exception("Failed to send feedback notification for entry #%d", entry_id)
