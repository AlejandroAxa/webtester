// ==========================================================
// CONFIGURACIÓN: cambie aquí su número de WhatsApp.
// Formato: 52 + número a 10 dígitos, sin espacios ni signos.
// Ejemplo: 5212223334455 → "5212223334455"
// ==========================================================
const WHATSAPP_NUMERO = "52XXXXXXXXXX";

const MENSAJES = {
  llamada: "Hola Alejandro, me gustaría agendar una llamada de 20 minutos para revisar la seguridad de mi sitio web.",
  incidente: "Hola Alejandro, creo que mi sitio web sufrió un ataque y necesito ayuda.",
  rapida: "Hola Alejandro, me interesa la Revisión rápida ($3,500 MXN).",
  completo: "Hola Alejandro, me interesa el Pentest completo ($7,000 MXN).",
};

document.querySelectorAll("a[data-wa]").forEach((link) => {
  const tipo = link.dataset.wa;
  const ciudad = link.dataset.ciudad ? ` (Empresa en ${link.dataset.ciudad})` : "";
  const texto = (MENSAJES[tipo] || MENSAJES.llamada) + ciudad;
  link.href = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
