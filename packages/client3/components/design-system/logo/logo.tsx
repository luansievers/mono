import freeArtistsLogoWhiteBgPng from "./FAD-logo-white-bg.png";
import freeArtistsLogoPng from "./FAD-logo.png";
import FreeArtistsLogoSvg from "./FAD-logo.svg";

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
