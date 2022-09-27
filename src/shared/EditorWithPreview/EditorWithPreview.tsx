import React, { useState } from 'react';
import cn from 'classnames';

import Editor from '../../components/Editor/Editor';
import Button from '../Button/Button';
import Article from '../../components/Article/Article';
import useMatchMedia from '../../hooks/useMatchMedia';

import {EditorWithPreviewStyled, PreviewButton, Preview} from './EditorWithPreview.styles';
import { useAutoScroll } from './EditorWithPreview.hook/useAutoScroll';

interface IEditorWithPreviewProps {
    onSubmit: (markdown: string, tags: string[]) => void;
    defaultMarkdown?: string;
    buttonValue: string;
    isLoading: boolean;
}

const EditorWithPreview: React.FC<IEditorWithPreviewProps> = ({
  onSubmit,
  defaultMarkdown = '',
  buttonValue,
  isLoading
}) => {
  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const [tags, setTags] = useState<string[]>([]);
  const phone = useMatchMedia();
  const previewRef = useAutoScroll(!defaultMarkdown, [markdown]);
  const [widePreview, setWidePreview] = useState(false);


  return (
    <EditorWithPreviewStyled>
      <Editor markdown={markdown} setMarkdown={setMarkdown} tags={tags} setTags={setTags}>
        <Button
          isLoading={isLoading}
          onClick={() => onSubmit(markdown, tags)}
          subtitle="Статья"
          text={buttonValue}
        />
        {phone && <Button subtitle="Статья" text="Превью" onClick={() => setWidePreview(true)}/>}
      </Editor>
      <Preview className={cn({active: widePreview})}>
        {phone && <PreviewButton onClick={() => setWidePreview(false)}>&times;</PreviewButton>}
        <div ref={previewRef} className="content">
          {phone && !widePreview ? null : <Article markdown={markdown}/>}
        </div>
      </Preview>
    </EditorWithPreviewStyled>
  );
};

export default EditorWithPreview;