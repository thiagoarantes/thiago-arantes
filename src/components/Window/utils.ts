export const GEOMETRY_KEY_PREFIX = "macos9-window-geometry-";

export function loadSavedGeometry(id: string) {
  try {
    const raw = localStorage.getItem(`${GEOMETRY_KEY_PREFIX}${id}`);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);

    if (
      typeof parsed.x === "number" &&
      typeof parsed.y === "number" &&
      typeof parsed.width === "number" &&
      typeof parsed.height === "number"
    ) {
      return parsed as { x: number; y: number; width: number; height: number };
    }
  } catch {
    /* ignore corrupt data */
  }

  return null;
}
