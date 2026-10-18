import { defineConfig } from 'astro/config';

export default defineConfig({
    site: 'https://carlosramosm.dev',
    markdown: { syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] } },
    vite: { optimizeDeps: { include: ['mermaid'] } },
    base: '/', // Importante: '/' porque es un repositorio de usuario (carlosramosm.github.io)
});
