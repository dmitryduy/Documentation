import React from 'react';

import { ImageStyled } from './Image.styles';

interface IImageProps {
  src: string;
  alt: string;
}

const Image: React.FC<IImageProps> = ({src, alt}) => {
  return <ImageStyled src={src} alt={alt}/>;
};

export default Image;