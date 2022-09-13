import React from 'react';

import {VideoStyled} from './Video.styles';

interface IVideoProps {
    src: string;
}

const Video: React.FC<IVideoProps> = ({src}) => {
  return (
    <VideoStyled src={`https://www.youtube.com/embed/${src}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen/>
  );
};

export default Video;