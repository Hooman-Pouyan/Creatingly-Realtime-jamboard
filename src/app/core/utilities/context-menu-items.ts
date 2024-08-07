export type TContextMenuItem = {
  label: string;
  icon: string;
  route?: string;
  children?: TContextMenuItem[];
  action: () => void;
};

export const contextMenuItems: TContextMenuItem[] = [
  {
    label: 'Pin It',
    icon: 'copy',
    action: () => {
      console.log('pinned');
    },
    children: [],
  },
  {
    label: 'Add to Favorites',
    icon: 'star',
    action: () => {
      console.log('favorite');
    },
  },
  {
    label: 'Share',
    icon: 'share',
    action: () => {
      console.log('share');
    },
  },
  {
    label: 'Copy',
    icon: 'paste',
    action: () => {
      console.log('Paste');
    },
  },
  {
    label: 'Delete',
    icon: 'delete',
    action: () => {
      console.log('Delete');
    },
  },
  {
    label: 'Add Comment',
    icon: 'paste',
    action: () => {
      console.log('comment');
    },
  },
];
