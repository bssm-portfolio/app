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
  time: number;
}

export interface ToastProperty extends Toast {
  content: string;
  type: ToastType;
  id: string;
  position: PositionType;
}
