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


// ==========================================================
// Frase grande que se revela palabra por palabra al hacer scroll
// ==========================================================
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealBlocks = document.querySelectorAll("[data-reveal]");

if (!reduceMotion && revealBlocks.length) {
  const wrapWords = (node) => {
    node.childNodes.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.append(part); return; }
          const span = document.createElement("span");
          span.className = "w";
          span.textContent = part;
          frag.append(span);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        wrapWords(child);
      }
    });
  };

  const blocks = [...revealBlocks].map((el) => {
    wrapWords(el);
    return { el, words: el.querySelectorAll(".w") };
  });
  document.documentElement.classList.add("js-reveal");

  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    blocks.forEach(({ el, words }) => {
      const r = el.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (vh * 0.9 - r.top) / (r.height + vh * 0.35)));
      const lit = Math.round(progress * words.length);
      words.forEach((w, i) => w.classList.toggle("on", i < lit));
    });
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
}
