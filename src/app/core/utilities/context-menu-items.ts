export type TContextMenuItem = {
  name: string;
  label: string;
  icon: string;
  route?: string;
  disabled: boolean;
  children?: TContextMenuItem[];
  action: () => void;
};

export const contextMenuItems: TContextMenuItem[] = [
  {
    name: 'pin',
    label: 'Pin It',
    icon: 'copy',
    disabled: false,
    action: () => {
      console.log('pinned');
    },
    children: [],
  },
  {
    name: 'favorite',
    label: 'Add to Favorites',
    icon: 'star',
    disabled: false,
    action: () => {
      console.log('favorite');
    },
  },
  {
    name: 'share',
    label: 'Share',
    icon: 'share',
    disabled: false,
    action: () => {
      console.log('share');
    },
  },
  {
    name: 'copy',
    label: 'Copy',
    icon: 'paste',
    disabled: false,
    action: () => {
      console.log('Paste');
    },
  },
  {
    name: 'delete',
    label: 'Delete',
    icon: 'delete',
    disabled: false,
    action: () => {
      console.log('Delete');
    },
  },
  {
    name: 'comment',
    label: 'Add Comment',
    icon: 'paste',
    disabled: false,
    action: () => {},
  },
];
