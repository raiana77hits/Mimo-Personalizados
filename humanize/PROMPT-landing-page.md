# Humanize Marketing Digital — Revisão de design + Prompt da landing page

## 1. Revisão (olhar de designer)

**O que já funciona:** paleta coerente (céu → navy → noite), céu estrelado com surgimento progressivo, título com a última palavra em serifa itálica, cases com números grandes, formulário que abre o WhatsApp.

**O que eleva o nível (e o ticket médio):**

| Ponto | Problema atual | Ajuste |
|---|---|---|
| Favicon / logo | Não há `<link rel="icon">`; logo depende de `logo.png` com fallback em texto | Favicon SVG (monograma "H" com estrela) + PNG 32/180/512, `apple-touch-icon`, `og:image` 1200×630 |
| Hero | Céu bonito, mas sem profundidade de cor e sem "momento" | Nebulosa roxa animada lentamente (gradiente em drift 40s), brilho de horizonte, estrelas em 3 camadas de parallax, 1 estrela cadente a cada ~12s |
| Posicionamento | Texto fala com quem "já vende", mas não filtra cliente grande | Subtítulo e seção "Para quem" falando de operação, faturamento e metas; filtro de faturamento com mínimo sugerido (a partir de R$ 50 mil/mês) |
| Prova | Números soltos | Faixa "resultado em destaque" + depoimento curto em vídeo/aspas de cada cliente |
| Oferta | Serviços em lista | 3 formatos de parceria (Estrutura, Crescimento, Escala) sem preço, com "a partir de" opcional — ancora valor e eleva ticket |
| Microinterações | Poucas fora do hero | Revelar seções ao rolar (fade + 12px), cursor-glow suave nos cards, sublinhado animado nos links, botão com brilho que percorre |
| Confiança | Falta bloco de perguntas | FAQ (prazo de resultado, contrato mínimo, investimento em mídia, gravação presencial) |
| SEO/técnico | Sem schema, sem og:image | JSON-LD `ProfessionalService`, meta canonical, imagens WebP, `font-display: swap` |

## 2. Prompt (copiar e colar)

```
Atue como diretor de arte e desenvolvedor front-end sênior. Crie uma landing page
em um único arquivo index.html (HTML + CSS + JS puros, sem frameworks) para a
HUMANIZE MARKETING DIGITAL, agência de São Paulo fundada por Ray e Jaque.

OBJETIVO
Atrair empresas maiores, com operação consolidada (faturamento a partir de
~R$ 50 mil/mês), e aumentar o ticket médio. A página deve transmitir seriedade,
identidade forte, proximidade humana e desejo. Toda seção conduz ao CTA
"Agendar diagnóstico".

IDENTIDADE
- Paleta: #36A6DE (céu), #2A84C3 (azul), #1B4E9B (profundo), #03106A (navy),
  #020A3F (noite), #1C1466 (índigo/roxo), #EEF5FB (névoa), branco.
- Tipografia: Bebas Neue (títulos), Manrope 800 (subtítulos/botões),
  DM Sans (texto), Instrument Serif itálico (palavra de destaque).
- Regra de assinatura: em todo título, a ÚLTIMA palavra usa Instrument Serif
  itálico com gradiente céu→azul. Usar com parcimônia, nunca mais de uma por título.
- Logotipo: usar logo.svg (versão branca no escuro, navy no claro).
  Favicon: favicon.svg (monograma "H" com uma pequena estrela de 4 pontas),
  + favicon-32.png, apple-touch-icon.png (180), icon-512.png, og-image.jpg (1200x630).

HERO — "CÉU HUMANIZE"
- Fundo: gradiente vertical noite → índigo/roxo → navy, com nebulosa roxa e azul
  em radial-gradients que se deslocam lentamente (animação de 40s, quase imperceptível)
  e um brilho azul no horizonte inferior.
- Canvas de estrelas em 3 camadas de profundidade: as estrelas APARECEM aos poucos
  ao entrar no site (fade escalonado de 0 a ~2,5s), depois cintilam suavemente.
  Algumas estrelas maiores com halo azul. Uma estrela cadente discreta a cada 10-16s.
  Parallax leve com o mouse (desktop) e com o scroll.
- Título: "Presença que vira *faturamento.*" (última palavra em serifa itálica).
- Texto aparece em sequência depois das estrelas (título, subtítulo, CTAs, provas).
- CTAs: botão principal "Agendar diagnóstico" com brilho que percorre o botão
  a cada 6s; link secundário "Ver resultados".
- Faixa de prova: 3x faturamento (Gota de Ouro), 550 mil views (Tomo Xapo),
  +1.800 produtos online (Casa de Embalagens).

SEÇÕES (nesta ordem)
1. Logos de clientes em marquee infinito (pausa no hover), logos em branco.
2. Problema: "Você já vende. Mas o digital ainda não trabalha para você."
   3 dores (conteúdo que não vende, anúncio sem estratégia, canais soltos).
3. Resultados: cases Gota de Ouro, Adega do Bruninho (+150,7% faturamento,
   +75,3% pedidos), Tomo Xapo, Casa de Embalagens. Números com contagem animada,
   tags de serviço, link "Ver case completo". Uma frase de depoimento por case.
4. O que fazemos: 3 frentes integradas (Conteúdo e marca / Tráfego e vendas /
   Estrutura digital). Frase: "arrumamos a estrutura *antes* de acelerar a mídia."
5. Formatos de parceria: Estrutura, Crescimento, Escala — o que inclui cada um,
   para quem é, sem preço fixo ("proposta sob diagnóstico"). O plano Escala
   destacado com borda em gradiente.
6. Método em 6 etapas numa linha do tempo que se preenche ao rolar.
7. Quem somos: foto de Ray e Jaque em moldura com pequenas estrelas, papéis de
   cada uma, citação "Por trás de cada estratégia existem pessoas."
8. Para quem é / para quem não é (filtro honesto que valoriza o cliente certo).
9. FAQ em acordeão (prazo, contrato, verba de mídia, gravação presencial).
10. CTA final no mesmo céu do hero: formulário (nome, empresa, segmento,
    faturamento, objetivo) que monta a mensagem e abre o WhatsApp 5511914894352.
11. Rodapé: Instagram @humanizemarketingdigital, WhatsApp, e-mail, São Paulo.
Botão flutuante de WhatsApp.

EFEITOS (sutis, nunca pesados)
- Revelar ao rolar (IntersectionObserver): opacidade + 12px, 600ms.
- Cards com brilho que segue o cursor; links com sublinhado animado.
- Números com contagem; linha do método com preenchimento progressivo.
- Respeitar prefers-reduced-motion (tudo estático, estrelas visíveis).
- Pausar canvas fora da tela. Meta de Lighthouse ≥ 90.

TÉCNICO
- Mobile-first, sem scroll horizontal, gutters de 16-20px, safe-area.
- Seções claras com modo escuro automático.
- SEO: title, description, og:*, og:image, canonical, JSON-LD ProfessionalService.
- Acessibilidade: contraste AA, foco visível, labels no formulário, alt nas imagens.
- Textos em português do Brasil, tom próximo mas profissional, frases curtas.
```
