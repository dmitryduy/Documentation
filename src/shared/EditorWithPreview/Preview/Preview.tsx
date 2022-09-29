import React, { useState } from 'react';
import cn from 'classnames';

import Article from '../../../components/Article/Article';
import { useAutoScroll } from '../EditorWithPreview.hook/useAutoScroll';
import useMatchMedia from '../../../hooks/useMatchMedia';

import { PreviewStyled, PreviewButton } from './Preview.styles';

interface IPreviewProps {
  markdown: string;
  widePreview: boolean;
  defaultMarkdown: string;
  hidePreview: () => void;
}

const Preview: React.FC<IPreviewProps> = ({markdown, widePreview, defaultMarkdown, hidePreview}) => {
  const previewRef = useAutoScroll(!defaultMarkdown, [markdown]);
  const phone = useMatchMedia();

  return (
    <PreviewStyled className={cn({active: widePreview})}>
      {phone && <PreviewButton onClick={hidePreview}>&times;</PreviewButton>}
      <div ref={previewRef} className="content">
        {phone && !widePreview ? null : <Article markdown={markdown}/>}
      </div>
    </PreviewStyled>
  );
};

export default React.memo(Preview);