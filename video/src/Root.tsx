import React from 'react';
import { Composition } from 'remotion';
import { Anuncio } from './Anuncio';

const DUR = 6 * 60; // 6 segundos a 60fps

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Anuncio-16x9"
        component={Anuncio}
        durationInFrames={DUR}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{ orientacao: 'h' as const }}
      />
      <Composition
        id="Anuncio-9x16"
        component={Anuncio}
        durationInFrames={DUR}
        fps={60}
        width={1080}
        height={1920}
        defaultProps={{ orientacao: 'v' as const }}
      />
    </>
  );
};
