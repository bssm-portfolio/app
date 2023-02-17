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
  content: string;
  type?: ToastType;
  time?: number;
}

export interface ToastProperty extends Toast {
  type: ToastType;
  position: PositionType;
  id: string;
}
