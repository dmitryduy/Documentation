import React, { useCallback, useState } from 'react';

import Editor from '../../components/Editor/Editor';
import Button from '../Button/Button';
import useMatchMedia from '../../hooks/useMatchMedia';
import { useDebounce } from '../../hooks/useDebounce';
import Progress from '../Progress/Progress';

import {EditorWithPreviewStyled} from './EditorWithPreview.styles';
import Preview from './Preview/Preview';
import { PREVIEW_UPDATE_DELAY } from './EditorWithPreview.constants';

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
  const debouncedMarkdown = useDebounce(markdown, PREVIEW_UPDATE_DELAY);
  const [tags, setTags] = useState<string[]>([]);
  const phone = useMatchMedia();
  const [isShowPreviewOnPhone, setIsShowPreviewOnPhone] = useState(false);

  const hidePreviewOnPhone = useCallback(() => setIsShowPreviewOnPhone(false), []);

  return (
    <EditorWithPreviewStyled>
      <Editor markdown={markdown} setMarkdown={setMarkdown} tags={tags} setTags={setTags}>
        <Button
          isLoading={isLoading}
          onClick={() => onSubmit(markdown, tags)}
          subtitle="Статья"
          text={buttonValue}
        />
        {phone && <Button subtitle="Статья" text="Превью" onClick={() => setIsShowPreviewOnPhone(true)}/>}
      </Editor>
      <Preview
        isShowPreviewOnPhone={isShowPreviewOnPhone}
        markdown={debouncedMarkdown}
        defaultMarkdown={debouncedMarkdown}
        hidePreviewOnPhone={hidePreviewOnPhone}
      />
    </EditorWithPreviewStyled>
  );
};

export default EditorWithPreview;