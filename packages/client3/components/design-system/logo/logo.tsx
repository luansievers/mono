import Image from "next/image";

import FreeArtistsFullLogo from "/public/FAD-logo-full.png";

import freeArtistsLogoWhiteBgPng from "./FAD-logo-white-bg.png";
import freeArtistsLogoPng from "./FAD-logo.png";
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
  storyBookMode?: string;
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
  const freeArtistsFull = "http://localhost:3001/FAD-logo-full.png";

  if (props.storyBookMode) {
    return (
      <img
        alt={"Free Artist Logo" || props.alt}
        width={props.width || 200}
        height={props.height || 200}
        src={"http://localhost:3001/FAD-logo-full.png"}
      />
    );
  } else {
    return (
      <Image
        alt={"Free Artist Logo" || props.alt}
        width={props.width || 200}
        height={props.height || 200}
        src={src ? src : freeArtistsFull}
      />
    );
  }
}
