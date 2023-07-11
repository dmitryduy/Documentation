import React  from 'react';
import cn from 'classnames';
import Article from '@components/Article/Article';
import useMatchMedia from '@hooks/useMatchMedia';

import { useAutoScroll } from '../EditorWithPreview.hook/useAutoScroll';

import { PreviewStyled, HidePreviewButton } from './Preview.styles';

interface IPreviewProps {
  markdown: string;
  isShowPreviewOnPhone: boolean;
  defaultMarkdown: string;
  hidePreviewOnPhone: () => void;
}

const Preview: React.FC<IPreviewProps> = ({markdown, isShowPreviewOnPhone, defaultMarkdown, hidePreviewOnPhone}) => {
  const previewRef = useAutoScroll(!defaultMarkdown, [markdown]);
  const phone = useMatchMedia();

  return (
    <PreviewStyled className={cn({active: isShowPreviewOnPhone})}>
      {phone && <HidePreviewButton onClick={hidePreviewOnPhone}>&times;</HidePreviewButton>}
      <div ref={previewRef} className="content">
        {phone && !isShowPreviewOnPhone ? null : <Article markdown={markdown}/>}
      </div>
    </PreviewStyled>
  );
};

export default React.memo(Preview);