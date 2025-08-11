export interface WindowProps {
  id: string;
  title: string;
  icon?: string;
  children: React.ReactNode;
  onClose: () => void;
  onFocus: () => void;
  isActive: boolean;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  zIndex?: number;
  disableResize?: boolean;
}
