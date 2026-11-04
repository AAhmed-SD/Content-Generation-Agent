/**
 * One continuous camera. Keyframes are (time, x, y, zoom, rotation) in world pixels.
 * Each channel is a monotone cubic through its keys, so motion is smooth, never overshoots
 * a key, and keeps moving through holds instead of stopping dead.
 */

export type CamKey = { t: number; x: number; y: number; z: number; r?: number };
export type CamState = { x: number; y: number; z: number; r: number };

const monotone = (ts: number[], vs: number[]) => {
  const n = ts.length;
  const d: number[] = [];
  for (let i = 0; i < n - 1; i++) d.push((vs[i + 1] - vs[i]) / (ts[i + 1] - ts[i]));
  const m: number[] = new Array(n).fill(0);
  m[0] = d[0];
  m[n - 1] = d[n - 2];
  for (let i = 1; i < n - 1; i++) {
    if (d[i - 1] * d[i] <= 0) m[i] = 0;
    else {
      const w1 = 2 * (ts[i + 1] - ts[i]) + (ts[i] - ts[i - 1]);
      const w2 = (ts[i + 1] - ts[i]) + 2 * (ts[i] - ts[i - 1]);
      m[i] = (w1 + w2) / (w1 / d[i - 1] + w2 / d[i]);
    }
  }
  return (t: number) => {
    if (t <= ts[0]) return vs[0] + m[0] * (t - ts[0]);
    if (t >= ts[n - 1]) return vs[n - 1] + m[n - 1] * (t - ts[n - 1]);
    let i = 0;
    while (t > ts[i + 1]) i++;
    const h = ts[i + 1] - ts[i];
    const s = (t - ts[i]) / h;
    const s2 = s * s;
    const s3 = s2 * s;
    return (
      (2 * s3 - 3 * s2 + 1) * vs[i] + (s3 - 2 * s2 + s) * h * m[i] + (-2 * s3 + 3 * s2) * vs[i + 1] + (s3 - s2) * h * m[i + 1]
    );
  };
};

export const makeCamera = (keys: CamKey[]) => {
  const ts = keys.map((k) => k.t);
  const fx = monotone(ts, keys.map((k) => k.x));
  const fy = monotone(ts, keys.map((k) => k.y));
  const fz = monotone(ts, keys.map((k) => Math.log(k.z)));
  const fr = monotone(ts, keys.map((k) => k.r ?? 0));
  return (t: number): CamState => ({ x: fx(t), y: fy(t), z: Math.exp(fz(t)), r: fr(t) });
};

/** Layered sines: a small, organic handheld float that never repeats within a video. */
export const handheld = (t: number, amount = 1): CamState => {
  const s = (f: number, p: number) => Math.sin(t * f + p);
  return {
    x: amount * (5 * s(0.9, 0.3) + 2.5 * s(2.3, 1.7) + 1.2 * s(5.1, 4.1)),
    y: amount * (4 * s(0.7, 2.1) + 2.2 * s(1.9, 0.4) + 1.1 * s(4.7, 2.9)),
    z: 0,
    r: amount * (0.12 * s(0.5, 1.1) + 0.05 * s(1.7, 3.3)),
  };
};
