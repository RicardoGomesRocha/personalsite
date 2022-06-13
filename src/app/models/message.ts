export interface BottomMessageConfiguration {
  message: string;
  duration?: number;
}

export interface PopupMessageConfiguration {
  title?: string;
  message: string;
  actions?: { text: string; closeOnClick?: boolean; callback?: () => void }[];
  hideCloseButton?: boolean;
  onClose?: () => {};
}

export interface YesNoConfiguration {
  message: string;
  yes: () => {};
  no: () => {};
}
