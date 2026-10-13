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
├── [imagens da cesta — hero animation]
│   ├── caixa.webp      ← kraft box (foi rotacionada -26° para endireitar)
│   ├── palha.webp
│   ├── caneca.webp
│   ├── nutella.webp    ← fundo removido (era checkered, não transparência real)
│   ├── azulejo.webp
│   ├── shandon.webp
│   ├── ferrero.webp
│   └── petalas.webp
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

---

## Hero Section — Animação Scroll 3D

A primeira seção da página tem uma animação de montagem da cesta de presente
acionada pelo scroll do usuário.

### Como funciona

- `position: sticky` no `.hero-sticky` + altura extra no `.hero` (`100vh + 330vh`)
- JS calcula o progresso do scroll (`0` a `1`) e anima cada peça em CSS 3D
- Cada peça cai de cima com `translate3d`, `rotateX`, `rotateZ` e `scale`
- Easing de física: `easeOut = 1 - Math.pow(1-t, 4)` + bounce com `Math.sin`
- Legenda no rodapé do stage atualiza conforme o scroll (`LEGENDAS` array)

### Ordem de aparição

| # | Arquivo | Descrição |
|---|---|---|
| 1 | `caixa.webp` | Caixa kraft vazia |
| 2 | `palha.webp` | Palha decorativa |
| 3 | `caneca.webp` | Caneca personalizada |
| 4 | `nutella.webp` | Nutella |
| 5 | `azulejo.webp` | Azulejo/quadro personalizado |
| 6 | `shandon.webp` | Espumante Shandon mini |
| 7 | `ferrero.webp` | Ferrero Rocher |
| 8 | `petalas.webp` | Pétalas de rosa (caem em loop) |

### Dimensões do stage

- Stage lógico: **840 × 889 px**
- Responsivo via `container-type: size` no `.hero-visual`
- Unidades `cqw` / `cqh` para escalar proporcionalmente

### Acessibilidade

- `@media (prefers-reduced-motion)` desativa a animação e mostra a cesta completa montada

---

## CSS — Variáveis de Cor

```css
--rosa-vivo:   #e91e8c
--rosa-escuro: #c2185b
--branco:      #ffffff
--cinza-claro: #f5f5f5
--texto:       #333333
```

---

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

## Próximos Passos (backlog)

- [ ] Melhorar qualidade visual do desktop (composição da cesta)
- [ ] Upgrade futuro: substituir PNGs por vídeo + frames (estilo hamburguer restaurant ref)
- [ ] Testar em iOS Safari (sticky scroll behavior)
- [ ] Otimizar LCP — lazy load nas imagens abaixo do fold

---

## Contato / Responsáveis

- **Agência:** MOARA / Humanize Marketing Digital
- **Cliente:** Mimo Criativo Personalizados
- **Dev AI:** Claude (Anthropic) — sessão gerenciada pela MOARA
