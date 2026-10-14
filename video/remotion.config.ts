/**
 * Config do Remotion para as peças de vídeo da Mimo.
 *
 * publicDir aponta para a RAIZ do repositório de propósito: assim o anúncio usa
 * exatamente as mesmas fotos que o site, sem cópia duplicada que sairia do ar
 * quando o cliente trocasse uma imagem.
 *   staticFile('caneca-melhor-avo.webp')          -> raiz do repositório
 *   staticFile('video/fontes/gelasio-...woff2')   -> fontes desta pasta
 */
import { Config } from "@remotion/cli/config";

Config.setPublicDir("..");
Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setDefaultPremountInSeconds(2);
