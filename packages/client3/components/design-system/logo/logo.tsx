import Image from "next/image";

import FreeArtistsFullLogo from "/public/FAD-logo-full.png";

import FreeArtistsLogoSvg from "./FAD-logo.svg";

export const freeArtistsLogoPngUrl = "/images/fa-logo.png";
export const freeArtistsLogoWhiteBgPngUrl = "/public/fa-logo-white-bg.png";
export const freeArtistsFullLogoPngFull = FreeArtistsFullLogo.src;

interface FreeArtistsLogoProps {
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
  return <FreeArtistsLogoSvg {...props} />;
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
