export type PositionType =
  | "TOP_LEFT"
  | "TOP_CENTER"
  | "TOP_RIGHT"
  | "BOTTOM_LEFT"
  | "BOTTOM_CENTER"
  | "BOTTOM_RIGHT";
export type ToastType = "success" | "danger" | "normal";

export interface Toast {
  position?: PositionType;
  type?: ToastType;
}

export interface ToastProperty extends Toast {
  content: string;
  type: ToastType;
  id: string;
  position: PositionType;
}

export type OpenToastType = (
  content: string,
  toastConfig?: Toast | undefined,
) => void;

export type CloseToastType = (id: string, timerId: NodeJS.Timeout) => void;
