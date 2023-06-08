import { SyntheticEvent, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const SquareImage = styled.img`
  height: ${(props) => props.height};
  width: ${(props) => props.height};
  border-radius: 1rem;
  animate: ${fadeIn} 0.5s ease-in-out;
`;

type Props = {
  src: string;
  alt: string;
  fallbackSrc?: string;
  height: string;
};

const ImageWithFallback = ({ src, alt, height, fallbackSrc = '/images/no-img-placeholder.png' }: Props) => {
  const [imageSrc, setImageSrc] = useState<string>(src);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleImageLoad = (): void => {
    setIsLoading(false);
  };

  const handleFallbackImageLoad = (): void => {
    setIsLoading(false);
    setImageSrc(fallbackSrc);
  };

  return (
    <SquareImage src={imageSrc} alt={alt} onLoad={handleImageLoad} onError={handleFallbackImageLoad} height={height} />
  );
};

export default ImageWithFallback;
