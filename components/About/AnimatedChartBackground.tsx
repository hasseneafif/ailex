// "use client";
// import React, { useEffect, useState } from "react";

// export interface AnimatedChartBackgroundProps {
//   style?: React.CSSProperties;
//   lineColor?: string;
//   width?: number;
//   height?: number;
// }

// const MARGIN = 40, POINTS = 12;
// const Y_LABELS = [0, 100, 200, 300, 400], X_LABELS = ["Apr", "May", "Jun", "Aug"];
// const LABEL_COLOR = "#636363";

// const genPoints = (width: number, height: number) => [
//   { x: MARGIN, y: height - MARGIN - Math.random() * 80 },
//   ...Array.from({ length: POINTS - 2 }, (_, i) => ({
//     x: MARGIN + ((i + 1) * (width - 2 * MARGIN)) / (POINTS - 1),
//     y: MARGIN + Math.random() * (height - 2 * MARGIN),
//   })),
//   { x: width - MARGIN, y: MARGIN + Math.random() * 80 }
// ];

// const lerp = (a, b, t) => a + (b - a) * t;
// const interpPoints = (A, B, t) => A.map((p, i) => ({ x: lerp(p.x, B[i].x, t), y: lerp(p.y, B[i].y, t) }));

// function pointsToPath(pts) {
//   if (pts.length < 2) return "";
//   let d = `M ${pts[0].x},${pts[0].y}`;
//   for (let i = 0; i < pts.length - 1; i++) {
//     const p0 = pts[i === 0 ? i : i - 1], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2 < pts.length ? i + 2 : i + 1];
//     d += ` C ${p1.x + (p2.x - p0.x) / 6},${p1.y + (p2.y - p0.y) / 6} ${p2.x - (p3.x - p1.x) / 6},${p2.y - (p3.y - p1.y) / 6} ${p2.x},${p2.y}`;
//   }
//   return d;
// }

// export default function AnimatedChartBackground({
//   style = {},
//   lineColor = "#a259ff",
//   width = 1200,
//   height = 400,
// }: AnimatedChartBackgroundProps) {
//   const [pts, setPts] = useState(() => genPoints(width, height));
//   const [target, setTarget] = useState(() => genPoints(width, height));

//   useEffect(() => {
//     let frame, start, dur = 1000;
//     const animate = now => {
//       if (!start) start = now;
//       const t = Math.min((now - start) / dur, 1);
//       setPts(p => interpPoints(p, target, t));
//       if (t < 1) frame = requestAnimationFrame(animate);
//       else setTimeout(() => setTarget(genPoints(width, height)), 1000);
//     };
//     frame = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(frame);
//   }, [target, width, height]);

//   return (
//     <svg
//       width={width}
//       height={height}
//       viewBox={`0 0 ${width} ${height}`}
//       style={{
//         position: "absolute",
//         left: "50%",
//         top: "50%",
//         transform: "translate(-50%, -50%)",
//         zIndex: 0,
//         pointerEvents: "none",
//         borderRadius: 24,
//         ...style,
//       }}
//     >
//       <g className="hidden lg:block">
//         {Y_LABELS.map((l, i) => (
//           <text key={l} x={MARGIN - 10} y={height - MARGIN - (i * (height - 2 * MARGIN)) / (Y_LABELS.length - 1)}
//             fill={LABEL_COLOR} fontSize="16" textAnchor="end" alignmentBaseline="middle">{l}</text>
//         ))}
//         {X_LABELS.map((l, i) => (
//           <text key={l} x={MARGIN + (i * (width - 2 * MARGIN)) / (X_LABELS.length - 1)}
//             y={height - MARGIN + 28} fill={LABEL_COLOR} fontSize="16" textAnchor="middle">{l}</text>
//         ))}
//       </g>
//       <path d={pointsToPath(pts)} fill="none" stroke={lineColor} strokeWidth={4} style={{ filter: `drop-shadow(0 0 8px ${lineColor}88)` }} />
//     </svg>
//   );
// }