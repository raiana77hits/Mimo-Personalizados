# CLAUDE.md — Mimo Criativo Personalizados

Projeto atendido pela **MOARA** (Humanize Marketing Digital).  
Landing page da loja **Mimo Criativo Personalizados** — itens personalizados e presentes.

---

## Visão Geral

| Item | Valor |
|---|---|
| Repositório | `raiana77hits/Mimo-Personalizados` |
| Deploy | Vercel (auto-deploy via push na `main`) |
| Stack | HTML + CSS + JS puros (sem framework) |
| Domínio | `mimo-personalizados.vercel.app` |

---

## Estrutura de Arquivos

Todos os assets ficam na **raiz do repositório** — sem subpastas.

```
/
├── index.html          ← página principal (único arquivo HTML)
├── logo-mimo.webp
├── favicon.ico / favicon-32.png / favicon-512.png / apple-touch-icon.png
│
├── [imagens da cesta — NÃO USADAS desde a troca do herói]
│   └── (ÓRFÃS — eram da cesta antiga, já não referenciadas: caixa, palha,
│       caneca, nutella, azulejo, shandon, ferrero, petalas — 884 KB)
│
├── loja-mimo-criativo.webp   ← foto da loja, seção "Quem somos" (940x910)
│
└── [imagens dos produtos — carrossel/galeria]
    ├── kit-presente-caneca-abraco.webp
    ├── caneca-*.webp
    ├── camisa-*.webp
    ├── chinelo-*.webp
    ├── copo-*.webp
    ├── squeeze-*.webp
    ├── taca-*.webp
    ├── azulejo-*.webp
    ├── biscoito.webp
    └── botao-whatsapp.webp
```

> ⚠️ **NUNCA usar prefixo `cesta/` nos `src` das imagens.** Tudo na raiz.

### `video/` — peças de anúncio (fora do site)

Projeto Remotion que gera os anúncios de 6s em 16:9 e 9:16. Tem `package.json`
próprio, mas **não faz parte do site**: o `.vercelignore` da raiz exclui a pasta
do deploy, para que ela não seja servida e para que o `package.json` dela jamais
interfira na detecção de framework da Vercel. A raiz continua sem `package.json`,
e é isso que mantém o repositório sendo tratado como site estático.

O `publicDir` do Remotion aponta para a raiz, então o anúncio usa as **mesmas**
fotos do site, sem cópia. Detalhes em `video/README.md`.

---

## Hero Section — um momento orquestrado de 6s

A primeira seção abre com uma sequência única de 6 segundos, disparada no
carregamento. Ela substituiu a montagem da cesta por scroll (oito PNGs recortados
caindo), que parecia artificial e **não renderizava em telas de até 900px**: o
`.stage` se dimensionava por `cqh` e o `@media (max-width:900px)` punha
`height:auto` no `.hero-visual`, zerando a unidade de container.

### Como funciona

- O herói ocupa `100vh` (não mais `100vh + 330vh`); a página encolheu de ~10.600px
  para ~5.150px no desktop
- Tudo vive dentro de `.hero-camera` (perspectiva), que avança de `translateZ(-150px)`
  até a identidade em 6s — é o movimento de câmera. `.hero-fundo` recebe um avanço
  maior, e essa diferença é o que cria profundidade
- O `<h1>` é quebrado em palavras por JS (`.pal`), cada uma entrando com `rotateX`.
  **O texto lido por buscador e leitor de tela continua idêntico**
- Uma única forma SVG (`#mimo-forma`) é animada por SMIL e reaproveitada por
  referência em quatro lugares: sombra, fundo rosa, recorte da foto e contorno.
  Ela percorre caixa → círculo → coração → caixa
- A forma **descansa na caixa arredondada**, não no coração: terminar no coração
  cortava a frase da caneca, que é o que vende a peça

### A regra de realismo

`.palco-sombra` fica **fora** do `<g class="palco-grupo">` que flutua. Chão não
sobe junto com o objeto: quando a peça sobe, a sombra encolhe e clareia
(`heroiSombra`). É essa separação que faz o movimento ler como peso. Se mover a
sombra para dentro do grupo, a cena volta a parecer um adesivo deslizando.

### Geração das formas

Os três traçados têm **28 segmentos cúbicos cada, na mesma ordem angular** — é
isso que permite a interpolação suave. Foram gerados por script (amostragem por
ângulo a partir do centro + Catmull-Rom). Para criar outra forma, mantenha a
mesma contagem e ordem, senão o morph salta.

### Acessibilidade

`prefers-reduced-motion: reduce` desliga tudo: a classe `tocando` não é aplicada,
nenhuma animação é criada e a cena aparece pronta.

## CSS — Sistema de cor

Dez fichas, todas em `:root`. **Nada de cravar hex no corpo da folha** — foi assim
que a página chegou a 23 cores com catorze claros quase idênticos e um creme a 30°
de matiz brigando com rosas de 332–343°.

```css
/* superfícies — matiz único 338° */
--sup-1: #fef4f7   --sup-2: #fce6ee   --sup-3: #f9d5e2

/* texto — matiz 333°, saturação constante */
--txt-forte: #392b31   /* títulos  10,0:1 sobre sup-3 */
--texto:     #55404a   /* corpo     7,0:1 */
--texto-suave: #765966 /* apoio     4,6:1 */

/* rosa — preenchimento e texto são cores DIFERENTES */
--rosa: #f27aa3  --rosa-forte: #ec5f8c  --rosa-vivo: #e94f86  --rosa-escuro: #c9426f
--rosa-texto: #b12c59      /* a única que pode virar texto sobre fundo claro */

/* escuro */
--plum: #3e2833  --plum-txt: #e3dde0  --plum-suave: #c9bac2  --rosa-no-escuro: #eb8ead

--degrade: linear-gradient(135deg, #be3961 0%, #b33060 55%, #a72763 100%);
```

### As duas regras que não se quebram

1. **`--rosa-vivo` nunca é cor de texto.** Como texto sobre fundo claro ele dá
   2,6:1 e reprova. Para texto e links existe `--rosa-texto`.
2. **A rampa do `--degrade` tem folga de propósito.** Ela serve os botões, a faixa
   de contato e a linha "Fim de ano". A faixa de contato sobrepõe clarões brancos;
   eles estão em 10% e 7% porque acima disso o branco cai abaixo de 4,5:1. Se
   clarear a faixa, escureça a rampa junto.

A página está em **zero reprovações de contraste na WCAG 2.1 AA**. Ao mexer em cor,
vale conferir antes de publicar.

## JavaScript — Estrutura

O `index.html` contém todo o JS inline. Principais blocos:

- **Carousel** — galeria de produtos com setas e touch/swipe
- **Lightbox** — zoom nas imagens da galeria
- **Mobile menu** — hambúrguer para nav mobile
- **Hero animation** — scroll-driven sticky (objeto `T` com configs de cada peça)

---

## Deploy

Push na branch `main` → Vercel faz deploy automático.  
Não há build step — o Vercel serve os arquivos estáticos diretamente.

---

## Carregamento

O peso inicial é sensível a duas coisas, e as duas já morderam:

1. O carrossel chamava `loading='eager'` no slide atual e no próximo dos **seis**
   carrosséis de uma vez. Agora a pré-carga respeita `state.visible`.
2. Os slides 2+ guardam o endereço em `data-src` e só baixam via `state.garantir()`.
   Isso existe porque, com o herói curto, a seção de produtos entra na distância em
   que o navegador dispara `loading="lazy"` sozinho — e os 26 slides baixavam juntos.
   **Não troque `data-src` por `src` achando que o `lazy` resolve.**

## Próximos Passos (backlog)

- [x] ~~Composição da cesta no desktop~~ — herói refeito
- [x] ~~Otimizar LCP~~ — 2,86 MB → 1,24 MB no carregamento inicial
- [ ] Testar em iOS Safari (o herói não usa mais sticky, mas confirmar o SMIL)
- [x] ~~Espaço reservado de "Quem somos"~~ — foto real da loja no lugar
- [ ] Apagar as 8 imagens órfãs da cesta antiga (884 KB), se não forem voltar
- [ ] Caixa alta dos botões está no texto do HTML, não no CSS — baixar para
      caixa normal quando houver aval para mexer em texto
- [ ] Se algum dia a raiz ganhar um `package.json`, revisar o deploy: a Vercel
      passaria a tentar build em vez de servir os arquivos estáticos

---

## Contato / Responsáveis

- **Agência:** MOARA / Humanize Marketing Digital
- **Cliente:** Mimo Criativo Personalizados
- **Dev AI:** Claude (Anthropic) — sessão gerenciada pela MOARA
