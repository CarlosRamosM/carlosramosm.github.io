import mermaid from "mermaid";

// Astro deja los bloques ```mermaid como <pre><code class="language-mermaid"> (ver astro.config.mjs).
const blocks = [...document.querySelectorAll<HTMLElement>("pre:has(> code.language-mermaid)")].map((pre, i) => {
  const el = document.createElement("div");
  el.className = "mermaid";
  el.dataset.src = pre.textContent ?? "";
  el.id = `mermaid-${i}`;
  pre.replaceWith(el);
  return el;
});

async function draw() {
  const dark = document.documentElement.dataset.theme !== "light";
  mermaid.initialize({ startOnLoad: false, theme: dark ? "dark" : "default" });
  for (const el of blocks) {
    const { svg } = await mermaid.render(`${el.id}-svg`, el.dataset.src!);
    el.innerHTML = svg;
  }
}

draw();
document.addEventListener("themechange", draw);
