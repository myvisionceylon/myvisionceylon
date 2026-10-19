// Map of Sri Lanka as an SVG outline, plus the maths that turns
// latitude/longitude into a position on that outline.
//
// The outline comes from Natural Earth (public domain), via world-atlas,
// projected with the same numbers used below.
import outline from './lanka-outline.svgpath?raw';

export const LANKA_PATH = outline.trim();

// Projection settings (simple equirectangular, good enough for a small island).
const LON0 = 79.5; // left edge, degrees east
const LAT1 = 9.95; // top edge, degrees north
const SCALE = 120; // SVG units per degree
const COS = 0.99; // shrink longitude a little for ~8°N

// The SVG viewBox has some padding around the island for the grid labels.
export const VIEWBOX = { x: -20, y: -15, w: 330, h: 520 };

/** lat/lng → SVG coordinates inside the viewBox. */
export function project(lat: number, lng: number) {
  return {
    x: (lng - LON0) * SCALE * COS,
    y: (LAT1 - lat) * SCALE,
  };
}

/** lat/lng → percentage position over the map box, for HTML pins. */
export function toPercent(lat: number, lng: number) {
  const { x, y } = project(lat, lng);
  return {
    left: ((x - VIEWBOX.x) / VIEWBOX.w) * 100,
    top: ((y - VIEWBOX.y) / VIEWBOX.h) * 100,
  };
}

/** Grid lines for the radar look. */
export const GRID = {
  lats: [6, 7, 8, 9].map((d) => ({ label: `${d}°N`, y: project(d, LON0).y })),
  lngs: [80, 81, 82].map((d) => ({ label: `${d}°E`, x: project(LAT1, d).x })),
};
