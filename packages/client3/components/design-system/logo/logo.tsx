import freeArtistsLogoWhiteBgPng from "./fa-logo-white-bg.png";
import freeArtistsLogoPng from "./fa-logo.png";
import FreeArtistsLogoSvg from "./fa-logo.svg";

export const freeArtistsLogoPngUrl = freeArtistsLogoPng.src;
export const freeArtistsLogoWhiteBgPngUrl = freeArtistsLogoWhiteBgPng.src;

interface FreeArtistsLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export function FreeArtistsLogo(props: FreeArtistsLogoProps) {
  return <FreeArtistsLogoSvg {...props} />;
}
