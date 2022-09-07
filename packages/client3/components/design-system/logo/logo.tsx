import FreeArtistsFullLogo from "/public/free_artist_logo_full.png";

import freeArtistsLogoWhiteBgPng from "./fa-logo-white-bg.png";
import freeArtistsLogoPng from "./fa-logo.png";
import FreeArtistsLogoSvg from "./fa-logo.svg";

import Image from "next/image";

export const freeArtistsLogoPngUrl = "/images/fa-logo.png";
export const freeArtistsLogoWhiteBgPngUrl = "/public/fa-logo-white-bg.png";
export const freeArtistsFullLogoPngFull = FreeArtistsFullLogo.src;
// "http://localhost:3001/free_artist_logo_full.png";

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
  const freeArtistsFull = "http://localhost:3001/free_artist_logo_full.png";

  if (props.storyBookMode) {
    return (
      <img
        alt={"Free Artist Logo" || props.alt}
        width={props.width || 200}
        height={props.height || 200}
        src={"http://localhost:3001/free_artist_logo_full.png"}
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
