import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { loadFont } from '@remotion/fonts';
import { formaEm } from './formas';

// Gelasio é metricamente compatível com Georgia, a fonte do site.
// Os arquivos ficam em public/ porque o navegador de render não alcança o
// Google Fonts pela rede deste ambiente.
const serifada = 'Gelasio';
loadFont({ family: serifada, url: staticFile('video/fontes/gelasio-500-normal.woff2'), weight: '500' });
loadFont({ family: serifada, url: staticFile('video/fontes/gelasio-400-normal.woff2'), weight: '400' });
loadFont({ family: serifada, url: staticFile('video/fontes/gelasio-500-italic.woff2'), weight: '500', style: 'italic' });
const semSerifa = '-apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

// paleta do site (as mesmas fichas do :root)
const C = {
  sup1: '#fef4f7',
  sup2: '#fce6ee',
  sup3: '#f9d5e2',
  txt: '#392b31',
  rosaTexto: '#b12c59',
  rosaVivo: '#e94f86',
  plum: '#3e2833',
};

const FOTOS = [
  'kit-presente-caneca-abraco.webp',
  'caneca-melhor-avo.webp',
  'chinelo-rosa-flor-rosa.webp',
  'azulejo-dia-das-maes.webp',
];

// quando cada foto entra (em segundos)
const TROCAS = [0, 3.2, 3.9, 4.6];

const PALAVRAS = ['Momentos', 'especiais', 'merecem', 'detalhes'];

export const Anuncio: React.FC<{ orientacao: 'h' | 'v' }> = ({ orientacao }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const s = frame / fps;
  const vertical = orientacao === 'v';

  const margem = vertical ? 80 : 142;
  const ladoPalco = vertical ? Math.round(width * 0.78) : Math.round(height * 0.72);
  const corpoTitulo = vertical ? 96 : 100;

  // a forma percorre caixa -> círculo -> coração -> caixa ao longo dos 6s
  const d = formaEm(interpolate(s, [0.2, 5.6], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.bezier(0.4, 0, 0.3, 1),
  }), ladoPalco);

  const palco = (
    <div style={{ position: 'relative', width: ladoPalco, height: ladoPalco }}>
      {/* sombra: fica parada enquanto a peça flutua — é o que dá peso */}
      <div
        style={{
          position: 'absolute', inset: 0, clipPath: `path('${d}')`,
          background: 'rgba(62,40,51,.30)', filter: 'blur(16px)',
          translate: '6px 18px',
          scale: interpolate(s, [0, 3, 6], [1, 0.94, 1], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp', output: 'perceptual-scale',
          }),
          opacity: interpolate(s, [0.1, 0.9], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}
      />
      {/* forma rosa deslocada atrás, igual ao site */}
      <div
        style={{
          position: 'absolute', inset: 0, clipPath: `path('${d}')`,
          background: `linear-gradient(135deg, #f27aa3, ${C.rosaVivo} 55%, #c9426f)`,
          opacity: 0.24, translate: '26px -28px', rotate: '-7deg',
        }}
      />
      {/* as fotos, uma por vez */}
      <div
        style={{
          position: 'absolute', inset: 0, clipPath: `path('${d}')`,
          translate: `0px ${interpolate(s, [0, 3, 6], [0, -18, 0], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
          })}px`,
        }}
      >
        {FOTOS.map((f, i) => (
          <Img
            key={f}
            src={staticFile(f)}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center',
              opacity: interpolate(
                s,
                i === 0
                  ? [0, 0.5, TROCAS[1] - 0.25, TROCAS[1] + 0.2]
                  : [TROCAS[i] - 0.25, TROCAS[i] + 0.2,
                     (TROCAS[i + 1] ?? 99) - 0.25, (TROCAS[i + 1] ?? 99) + 0.2],
                i === 0 ? [0, 1, 1, 0] : [0, 1, 1, 0],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
              ),
              scale: interpolate(s, [TROCAS[i], (TROCAS[i + 1] ?? 6) + 0.6], [1.06, 1], {
                extrapolateLeft: 'clamp', extrapolateRight: 'clamp', output: 'perceptual-scale',
              }),
            }}
          />
        ))}
      </div>
    </div>
  );

  const texto = (
    <div style={{ maxWidth: vertical ? width - margem * 2 : width * 0.42, textAlign: vertical ? 'center' : 'left' }}>
      <Img
        src={staticFile('logo-mimo.webp')}
        style={{
          // o arquivo do logo tem fundo branco quadrado; recortar em círculo
          // é como ele aparece no site
          width: vertical ? 136 : 128, height: vertical ? 136 : 128,
          borderRadius: '50%', objectFit: 'cover', display: 'block',
          boxShadow: '0 10px 26px rgba(62,40,51,.16)',
          marginInline: vertical ? 'auto' : undefined, marginBottom: 26,
          opacity: interpolate(s, [0.1, 0.7], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          scale: interpolate(s, [0.1, 0.9], [0.86, 1], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1), output: 'perceptual-scale',
          }),
        }}
      />

      <div
        style={{
          fontFamily: semSerifa, fontSize: vertical ? 32 : 30, fontWeight: 700,
          letterSpacing: '.11em', textTransform: 'uppercase', color: C.rosaTexto,
          marginBottom: 22,
          opacity: interpolate(s, [0.35, 1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          translate: `0px ${interpolate(s, [0.35, 1], [16, 0], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}px`,
        }}
      >
        Feito especialmente para você
      </div>

      <div style={{ fontFamily: serifada, fontSize: corpoTitulo, lineHeight: 1.04,
                    letterSpacing: '-.035em', color: C.txt, fontWeight: 500 }}>
        {PALAVRAS.map((p, i) => (
          <span
            key={p}
            style={{
              display: 'inline-block', marginRight: '.26em',
              opacity: interpolate(s, [1.05 + i * 0.13, 1.7 + i * 0.13], [0, 1], {
                extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
              }),
              translate: `0px ${interpolate(s, [1.05 + i * 0.13, 1.8 + i * 0.13], [34, 0], {
                extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              })}px`,
            }}
          >
            {p}
          </span>
        ))}
        <span
          style={{
            display: 'inline-block', fontStyle: 'italic', color: C.rosaTexto,
            opacity: interpolate(s, [1.75, 2.45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            scale: interpolate(s, [1.75, 2.6], [0.9, 1], {
              extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1), output: 'perceptual-scale',
            }),
          }}
        >
          inesquecíveis.
        </span>
      </div>

      {/* chamada final */}
      <div
        style={{
          marginTop: 40, display: 'flex', flexDirection: 'column', gap: 14,
          alignItems: vertical ? 'center' : 'flex-start',
          opacity: interpolate(s, [4.5, 5.1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          translate: `0px ${interpolate(s, [4.5, 5.2], [26, 0], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}px`,
        }}
      >
        <div style={{
          fontFamily: semSerifa, fontSize: vertical ? 44 : 42, fontWeight: 800, color: '#fff',
          background: `linear-gradient(135deg, #be3961, #a72763)`,
          padding: '20px 38px', borderRadius: 999,
        }}>
          @mimo_criativo_personalizados
        </div>
        <div style={{ fontFamily: semSerifa, fontSize: vertical ? 38 : 36, fontWeight: 700, color: C.txt }}>
          WhatsApp (11) 98609-6371
        </div>
      </div>
    </div>
  );

  return (
    <AbsoluteFill style={{ background: `linear-gradient(160deg, ${C.sup1} 0%, ${C.sup2} 55%, ${C.sup3} 100%)` }}>
      {/* manchas de fundo, com deriva lenta */}
      <AbsoluteFill style={{ overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', width: width * 0.62, height: width * 0.62, borderRadius: '50%',
          right: -width * 0.1, top: -height * 0.08, filter: 'blur(90px)',
          background: 'radial-gradient(circle, rgba(242,122,163,.55), transparent 68%)',
          translate: `0px ${interpolate(s, [0, 6], [0, -40])}px`,
        }} />
        <div style={{
          position: 'absolute', width: width * 0.45, height: width * 0.45, borderRadius: '50%',
          left: -width * 0.12, bottom: -height * 0.06, filter: 'blur(80px)',
          background: 'radial-gradient(circle, rgba(255,255,255,.9), transparent 66%)',
          translate: `0px ${interpolate(s, [0, 6], [0, 26])}px`,
        }} />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: vertical ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: vertical ? 'center' : 'space-between',
          gap: vertical ? 54 : 60,
          padding: `${vertical ? 100 : 178}px ${margem}px`,
        }}
      >
        {vertical ? (<>{palco}{texto}</>) : (<>{texto}{palco}</>)}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
