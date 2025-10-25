import React from 'react';

export interface IconProps {
  src: string;
  alt?: string;
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function Icon({ src, alt = '', size = 24, color, className, style }: IconProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{ width: size, height: size, color, ...style }}
      draggable={false}
    />
  );
}
