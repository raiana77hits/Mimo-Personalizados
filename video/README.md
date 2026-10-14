# Peças de vídeo — Mimo Criativo

Projeto [Remotion](https://remotion.dev) que gera os anúncios de 6s nas duas
proporções. **Não faz parte do site**: está fora do deploy pelo `.vercelignore`
da raiz.

## Rodar

```sh
cd video
npm ci
npx remotion studio          # pré-visualização interativa
```

## Renderizar

```sh
npx remotion render Anuncio-16x9 saida/mimo-anuncio-16x9.mp4
npx remotion render Anuncio-9x16 saida/mimo-anuncio-9x16.mp4
```

Em ambiente sem o Chrome do Remotion, aponte para um `chrome-headless-shell`:

```sh
npx remotion render Anuncio-16x9 saida/a.mp4 \
  --browser-executable=/caminho/para/headless_shell
```

O Chrome completo **não serve**: o Remotion usa o modo headless antigo, que foi
removido do binário principal.

## Como está montado

- `src/Anuncio.tsx` — a peça inteira; `orientacao: 'h' | 'v'` muda o layout
- `src/formas.ts` — interpola caixa → círculo → coração, as **mesmas** formas do
  herói do site. Os três traçados têm 28 segmentos na mesma ordem angular, o que
  permite interpolar número a número sem biblioteca de morph
- `src/Root.tsx` — as duas composições (1920×1080 e 1080×1920, 60fps, 6s)
- `fontes/` — Gelasio, metricamente compatível com Georgia (a fonte do site).
  Fica local porque o navegador de render pode não alcançar o Google Fonts

## Sem imagem duplicada

`remotion.config.ts` aponta `publicDir` para a **raiz do repositório**. O anúncio
usa exatamente as mesmas fotos que o site:

```ts
staticFile('caneca-melhor-avo.webp')         // raiz
staticFile('video/fontes/gelasio-...woff2')  // esta pasta
```

Se trocar uma foto de produto na raiz, o anúncio acompanha. **Não copie imagens
para cá** — a cópia envelhece sozinha.

## Textos

Tudo que aparece na peça vem do site: rótulo, título, arroba e telefone. Não há
preço nem promessa. Ao editar, mantenha assim — é anúncio pago.
