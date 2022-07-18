import { useState, useEffect } from 'react';
import NextImage from 'next/image';

interface ImageProps {
  src: string;
  alt: string;
}

const DEFAULT_IMAGE = '/static/default-image.png';

function Image({ src, alt }: ImageProps) {
  const [url, setURL] = useState(DEFAULT_IMAGE);

  useEffect(() => {
    setURL(src || DEFAULT_IMAGE);
  }, [src]);

  return (
    <NextImage
      src={url}
      alt={alt}
      layout="fill"
      objectFit="cover"
      placeholder="blur"
      blurDataURL="/static/default-image.png"
      onError={() => setURL(DEFAULT_IMAGE)}
    />
  );
}

export default Image;
