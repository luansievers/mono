import Image from "next/image";

import FreeArtistsFullLogo from "/public/FAD-logo-full.png";

import FreeArtistsFullLogoSvg from "./FAD-logo-full.svg";
import freeArtistsLogoWhiteBgPng from "./FAD-logo-white-bg.png";
import freeArtistsLogoPng from "./FAD-logo.png";
import FreeArtistsLogoSvg from "./FAD-logo.svg";

export const freeArtistsLogoPngUrl = "/images/fa-logo.png";
export const freeArtistsLogoWhiteBgPngUrl = "/public/fa-logo-white-bg.png";
export const freeArtistsFullLogoPngFull = FreeArtistsFullLogo.src;

export interface FreeArtistsLogoProps {
  width?: number;
  height?: number;
  className?: string;
  type?: FreeArtistsLogoType;
  alt?: string;
  src?: string;
}

enum FreeArtistsLogoType {
  pngWhiteBg,
  png,
  pngFull,
}

export function FreeArtistsLogo(props: FreeArtistsLogoProps) {
  return <FreeArtistsFullLogoSvg {...props} />;
}

export function FreeArtistsLogoFullSvg(props: FreeArtistsLogoProps) {
  return <FreeArtistsFullLogoSvg {...props} />;
}

export function FreeArtistsLogoFull(props: FreeArtistsLogoProps) {
  const src = props.src;

  return (
    <Image
      alt={"Free Artist Logo" || props.alt}
      width={props.width || 200}
      height={props.height || 200}
      src={src ? src : "/FAD-logo-full.png"}
    />
  );
}
