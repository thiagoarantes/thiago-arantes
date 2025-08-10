export interface AppWindow {
  id: string;
  title: string;
  icon?: string;
  content: React.ReactNode;
  position: { x: number; y: number };
  zIndex: number;
}

export interface AppContextType {
  openWindow: (
    id: string,
    title: string,
    content: React.ReactNode,
    icon?: string
  ) => void;
  showMessage: (message: string) => void;
}
