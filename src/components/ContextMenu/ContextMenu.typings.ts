import { InfoBlockType } from '@/global.typings';

export type Actions = 'heading-1' | 'heading-2' | 'heading-3' | 'strong' | 'italic' | 'marker' | 'link' | 'code' |
  'unordered-list' | 'ordered-list' | 'image' | 'video' | 'table' | 'delete' | 'quiz' | InfoBlockType;

export type IContextMenuAction = {
  [key in Actions]: {
    template: string;
    insert: (str: string) => string;
    startSelection: number;
    endSelection: number;
    MULTI_SELECT?: boolean;
  };
};