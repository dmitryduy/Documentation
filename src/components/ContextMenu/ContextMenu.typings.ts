export type Actions = 'heading-1' | 'heading-2' | 'heading-3' | 'strong' | 'italic' | 'marker' | 'link' | 'code' |
  'info' | 'alert' | 'tip' | 'unordered-list';


export type IContextMenuAction = {
  [key in Actions]: {
    template: string;
    insert: (str: string) => string;
    startSelection: number;
    endSelection: number;
    multiselect?: boolean;
  };
};