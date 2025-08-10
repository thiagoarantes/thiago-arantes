export interface DesktopIconProps {
  id: string;
  icon: string;
  label: string;
  top: number;
  left: number;
  onDoubleClick: () => void;
  onMouseDown: (e: React.MouseEvent) => void;
  isDragging?: boolean;
}
