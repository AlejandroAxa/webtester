// ==========================================================
// CONFIGURACIÓN: número de WhatsApp (52 + 10 dígitos, sin signos)
// ==========================================================
const WHATSAPP_NUMERO = "522213021208";

const MENSAJES = {
  es: {
    llamada: "Hola Alejandro, me gustaría agendar una llamada de 20 minutos para revisar la seguridad de mi sitio web.",
    incidente: "Hola Alejandro, creo que mi sitio web sufrió un ataque y necesito ayuda.",
    rapida: "Hola Alejandro, me interesa la Revisión rápida ($3,500 MXN).",
    completo: "Hola Alejandro, me interesa el Pentest completo ($7,000 MXN).",
    ciudad: (c) => ` (Empresa en ${c})`,
  },
  en: {
    llamada: "Hi Alejandro, I'd like to book a 20-minute call about my website's security.",
    incidente: "Hi Alejandro, I think my website has been attacked and I need help.",
    rapida: "Hi Alejandro, I'm interested in the Quick Review.",
    completo: "Hi Alejandro, I'm interested in the Full Pentest.",
    ciudad: () => "",
  },
};

const idioma = document.documentElement.lang.startsWith("en") ? "en" : "es";
const textos = MENSAJES[idioma];

document.querySelectorAll("a[data-wa]").forEach((link) => {
  const tipo = link.dataset.wa;
  const extra = link.dataset.ciudad ? textos.ciudad(link.dataset.ciudad) : "";
  const texto = (textos[tipo] || textos.llamada) + extra;
  link.href = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

