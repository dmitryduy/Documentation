import React, { useCallback, useMemo, useState } from 'react';
import cn from 'classnames';

import Editor from '../../components/Editor/Editor';
import Button from '../Button/Button';
import Article from '../../components/Article/Article';
import useMatchMedia from '../../hooks/useMatchMedia';
import { useDebounce } from '../../hooks/useDebounce';

import {EditorWithPreviewStyled} from './EditorWithPreview.styles';
import { useAutoScroll } from './EditorWithPreview.hook/useAutoScroll';
import Preview from './Preview/Preview';

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
  const debouncedMarkdown = useDebounce(markdown, 400);
  const [tags, setTags] = useState<string[]>([]);
  const phone = useMatchMedia();
  const [widePreview, setWidePreview] = useState(false);

  const hidePreview = useCallback(() => setWidePreview(false), []);

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
      <Preview
        widePreview={widePreview}
        markdown={debouncedMarkdown}
        defaultMarkdown={debouncedMarkdown}
        hidePreview={hidePreview}
      />
    </EditorWithPreviewStyled>
  );
};

export default EditorWithPreview;