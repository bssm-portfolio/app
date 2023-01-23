import { ReactNode } from "react";

export interface ModalState {
  title?: string;
  content: ReactNode;
  visible?: boolean;
}
