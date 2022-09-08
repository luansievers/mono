import clsx from "clsx";

// import placeHolderImage from "./images/Avatar.svg";
import PlaceHolderAvatarSVG from "./Avatar.svg";

// const placeHolderImageUrl = placeHolderImage;

interface AvatarProps {
  size?: 44 | 48;
  src?: string;
  alt?: string;
  className?: string;
}

export function Avatar({ size = 44, src, alt, className }: AvatarProps) {
  return src ? (
    <span className="flex items-center">
      <span className="mr-3 block truncate">Something</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        style={{ height: `${size}px`, width: `${size}px` }}
        className={clsx(
          "inline-block",
          "rounded-full",
          "bg-dark-70",
          className
        )}
        src={src}
        alt={alt}
      />
    </span>
  ) : (
    <PlaceHolderAvatarSVG style={{ height: `${size}px`, width: `${size}px` }} />
  );
}
