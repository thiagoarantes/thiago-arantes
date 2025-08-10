export interface DesktopIconProps {
  id: string;
  icon: string;
  label: string;
  top: number;
  right: number;
  onDoubleClick: () => void;
  onMouseDown: (e: React.MouseEvent) => void;
  isDragging?: boolean;
}
