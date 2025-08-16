export interface AppWindow {
  id: string;
  title: string;
  icon?: string;
  content: React.ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  disableResize?: boolean;
}

export interface AppContextType {
  openWindow: (
    id: string,
    title: string,
    content: React.ReactNode,
    options?: {
      icon?: string;
      size?: { width: number; height: number };
      disableResize?: boolean;
    }
  ) => void;
  showMessage: (message: string) => void;
  setBackgroundColor: (color: string) => void;
  setBackgroundImage: (image: string) => void;
  backgroundColor: string;
  backgroundImage: string;
  activeWindow: AppWindow | null;
  allWindows: AppWindow[];
  focusWindow: (id: string) => void;
}
