import dados from './formas.json';

/**
 * Os três traçados foram gerados com 28 segmentos cúbicos cada, na MESMA ordem
 * angular. Por isso dá para interpolar número a número, sem biblioteca de morph.
 * Coordenadas vêm num espaço 0–200 e são escaladas para o tamanho em tela.
 */
const numeros = (d: string) => (d.match(/-?\d+\.?\d*/g) ?? []).map(Number);
const esqueleto = (d: string) => d.split(/-?\d+\.?\d*/);

export const FORMAS = {
  caixa: dados.squircle as string,
  circulo: dados.circulo as string,
  coracao: dados.coracao as string,
};

export const misturar = (a: string, b: string, t: number, escala: number) => {
  const na = numeros(a);
  const nb = numeros(b);
  const sk = esqueleto(a);
  let saida = '';
  for (let i = 0; i < sk.length; i++) {
    saida += sk[i];
    if (i < na.length) {
      saida += (((na[i] + (nb[i] - na[i]) * t) * escala) / 200).toFixed(2);
    }
  }
  return saida;
};

/** percorre caixa -> círculo -> coração -> caixa conforme p vai de 0 a 1 */
export const formaEm = (p: number, escala: number) => {
  const q = Math.max(0, Math.min(1, p));
  if (q < 1 / 3) return misturar(FORMAS.caixa, FORMAS.circulo, q * 3, escala);
  if (q < 2 / 3) return misturar(FORMAS.circulo, FORMAS.coracao, (q - 1 / 3) * 3, escala);
  return misturar(FORMAS.coracao, FORMAS.caixa, (q - 2 / 3) * 3, escala);
};
