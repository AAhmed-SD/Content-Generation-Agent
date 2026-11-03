export type Rgb = [number, number, number];
export type Box = { x: number; y: number; w: number; h: number };

export function luminance(r: number, g: number, b: number) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function clampByte(value: number) {
  return Math.max(0, Math.min(255, Math.round(value)));
}

export function maskCount(mask: Uint8Array) {
  let count = 0;
  for (const bit of mask) if (bit) count += 1;
  return count;
}

export function fillRect(mask: Uint8Array, width: number, height: number, x0: number, y0: number, x1: number, y1: number, add: boolean) {
  if (!add) mask.fill(0);
  const left = Math.max(0, Math.min(x0, x1));
  const right = Math.min(width - 1, Math.max(x0, x1));
  const top = Math.max(0, Math.min(y0, y1));
  const bottom = Math.min(height - 1, Math.max(y0, y1));
  for (let y = top; y <= bottom; y += 1) {
    for (let x = left; x <= right; x += 1) mask[y * width + x] = 1;
  }
}

export function fillPolygon(mask: Uint8Array, width: number, height: number, points: { x: number; y: number }[], add: boolean) {
  if (!add) mask.fill(0);
  if (points.length < 3) return;
  let top = height;
  let bottom = 0;
  for (const point of points) {
    top = Math.min(top, point.y);
    bottom = Math.max(bottom, point.y);
  }
  top = Math.max(0, Math.floor(top));
  bottom = Math.min(height - 1, Math.ceil(bottom));
  for (let y = top; y <= bottom; y += 1) {
    const hits: number[] = [];
    for (let i = 0; i < points.length; i += 1) {
      const a = points[i];
      const b = points[(i + 1) % points.length];
      if (a.y === b.y || y < Math.min(a.y, b.y) || y >= Math.max(a.y, b.y)) continue;
      const t = (y - a.y) / (b.y - a.y);
      hits.push(a.x + t * (b.x - a.x));
    }
    hits.sort((a, b) => a - b);
    for (let i = 0; i + 1 < hits.length; i += 2) {
      const left = Math.max(0, Math.ceil(hits[i]));
      const right = Math.min(width - 1, Math.floor(hits[i + 1]));
      for (let x = left; x <= right; x += 1) mask[y * width + x] = 1;
    }
  }
}

export function flood(image: ImageData, mask: Uint8Array, x: number, y: number, tolerance: number, add: boolean) {
  const { width, height, data } = image;
  if (!add) mask.fill(0);
  const start = (y * width + x) * 4;
  const sr = data[start];
  const sg = data[start + 1];
  const sb = data[start + 2];
  const limit = tolerance * tolerance * 3;
  const seen = new Uint8Array(width * height);
  const qx = new Int32Array(width * height);
  const qy = new Int32Array(width * height);
  let head = 0;
  let tail = 0;
  qx[tail] = x;
  qy[tail] = y;
  tail += 1;
  while (head < tail) {
    const cx = qx[head];
    const cy = qy[head];
    head += 1;
    const pixel = cy * width + cx;
    if (seen[pixel]) continue;
    seen[pixel] = 1;
    const offset = pixel * 4;
    const dr = data[offset] - sr;
    const dg = data[offset + 1] - sg;
    const db = data[offset + 2] - sb;
    if (dr * dr + dg * dg + db * db > limit) continue;
    mask[pixel] = 1;
    if (cx > 0 && !seen[pixel - 1]) {
      qx[tail] = cx - 1;
      qy[tail] = cy;
      tail += 1;
    }
    if (cx + 1 < width && !seen[pixel + 1]) {
      qx[tail] = cx + 1;
      qy[tail] = cy;
      tail += 1;
    }
    if (cy > 0 && !seen[pixel - width]) {
      qx[tail] = cx;
      qy[tail] = cy - 1;
      tail += 1;
    }
    if (cy + 1 < height && !seen[pixel + width]) {
      qx[tail] = cx;
      qy[tail] = cy + 1;
      tail += 1;
    }
  }
}

export function applyConfidence(mask: Uint8Array, width: number, height: number, values: Float32Array, maskWidth: number, maskHeight: number, add: boolean, subtract: boolean) {
  let max = 0;
  for (let i = 0; i < values.length; i += 32) if (values[i] > max) max = values[i];
  const cut = max > 1.5 ? 128 : 0.5;
  const next = new Uint8Array(width * height);
  let chosen = 0;
  for (let y = 0; y < height; y += 1) {
    const sy = Math.min(maskHeight - 1, Math.floor((y / height) * maskHeight));
    for (let x = 0; x < width; x += 1) {
      const sx = Math.min(maskWidth - 1, Math.floor((x / width) * maskWidth));
      if (values[sy * maskWidth + sx] >= cut) {
        next[y * width + x] = 1;
        chosen += 1;
      }
    }
  }
  if (!subtract && (chosen < 8 || chosen > width * height * 0.85)) return false;
  if (subtract) {
    for (let i = 0; i < mask.length; i += 1) if (next[i]) mask[i] = 0;
    return true;
  }
  if (!add) mask.fill(0);
  for (let i = 0; i < mask.length; i += 1) if (next[i]) mask[i] = 1;
  return true;
}

export function glyphMask(image: ImageData, box: Box, mask: Uint8Array, add: boolean) {
  if (!add) mask.fill(0);
  const { width, height, data } = image;
  const x0 = Math.max(0, box.x);
  const y0 = Math.max(0, box.y);
  const x1 = Math.min(width - 1, box.x + box.w);
  const y1 = Math.min(height - 1, box.y + box.h);
  const tone = edgeColour(image, x0, y0, x1 - x0, y1 - y0);
  const limit = 36 * 36 * 3;
  for (let y = y0; y <= y1; y += 1) {
    for (let x = x0; x <= x1; x += 1) {
      const offset = (y * width + x) * 4;
      const dr = data[offset] - tone[0];
      const dg = data[offset + 1] - tone[1];
      const db = data[offset + 2] - tone[2];
      if (dr * dr + dg * dg + db * db > limit) mask[y * width + x] = 1;
    }
  }
  dilate(mask, width, height, 2);
}

export function dilate(mask: Uint8Array, width: number, height: number, radius: number) {
  const source = new Uint8Array(mask);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (!source[y * width + x]) continue;
      for (let dy = -radius; dy <= radius; dy += 1) {
        const ny = y + dy;
        if (ny < 0 || ny >= height) continue;
        for (let dx = -radius; dx <= radius; dx += 1) {
          const nx = x + dx;
          if (nx < 0 || nx >= width) continue;
          mask[ny * width + nx] = 1;
        }
      }
    }
  }
}

export function inpaint(image: ImageData, mask: Uint8Array) {
  const { width, height, data } = image;
  const unknown = new Uint8Array(mask);
  dilate(unknown, width, height, 2);
  const qx = new Int32Array(width * height);
  const qy = new Int32Array(width * height);
  const queued = new Uint8Array(width * height);
  let head = 0;
  let tail = 0;
  const knownNeighbour = (x: number, y: number) =>
    (x > 0 && !unknown[y * width + x - 1]) ||
    (x + 1 < width && !unknown[y * width + x + 1]) ||
    (y > 0 && !unknown[(y - 1) * width + x]) ||
    (y + 1 < height && !unknown[(y + 1) * width + x]);
  const enqueue = (x: number, y: number) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const pixel = y * width + x;
    if (!unknown[pixel] || queued[pixel] || !knownNeighbour(x, y)) return;
    queued[pixel] = 1;
    qx[tail] = x;
    qy[tail] = y;
    tail += 1;
  };
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) enqueue(x, y);
  }
  while (head < tail) {
    const x = qx[head];
    const y = qy[head];
    head += 1;
    const pixel = y * width + x;
    if (!unknown[pixel]) continue;
    let r = 0;
    let g = 0;
    let b = 0;
    let n = 0;
    const take = (nx: number, ny: number) => {
      if (nx < 0 || ny < 0 || nx >= width || ny >= height || unknown[ny * width + nx]) return;
      const offset = (ny * width + nx) * 4;
      r += data[offset];
      g += data[offset + 1];
      b += data[offset + 2];
      n += 1;
    };
    take(x - 1, y);
    take(x + 1, y);
    take(x, y - 1);
    take(x, y + 1);
    if (!n) continue;
    const offset = pixel * 4;
    data[offset] = Math.round(r / n);
    data[offset + 1] = Math.round(g / n);
    data[offset + 2] = Math.round(b / n);
    unknown[pixel] = 0;
    enqueue(x - 1, y);
    enqueue(x + 1, y);
    enqueue(x, y - 1);
    enqueue(x, y + 1);
  }
}

export function recolor(image: ImageData, mask: Uint8Array, target: Rgb) {
  const { data } = image;
  let seed = 0;
  let seen = 0;
  for (let i = 0; i < mask.length; i += 1) {
    if (!mask[i]) continue;
    const offset = i * 4;
    seed += luminance(data[offset], data[offset + 1], data[offset + 2]);
    seen += 1;
  }
  const base = seen ? seed / seen : 1;
  for (let i = 0; i < mask.length; i += 1) {
    if (!mask[i]) continue;
    const offset = i * 4;
    const scale = luminance(data[offset], data[offset + 1], data[offset + 2]) / (base || 1);
    data[offset] = clampByte(target[0] * scale);
    data[offset + 1] = clampByte(target[1] * scale);
    data[offset + 2] = clampByte(target[2] * scale);
  }
}

export function edgeColour(image: ImageData, x: number, y: number, w: number, h: number): Rgb {
  const x1 = Math.min(image.width - 1, x + w);
  const y1 = Math.min(image.height - 1, y + h);
  let r = 0;
  let g = 0;
  let b = 0;
  let n = 0;
  const take = (px: number, py: number) => {
    const offset = (py * image.width + px) * 4;
    r += image.data[offset];
    g += image.data[offset + 1];
    b += image.data[offset + 2];
    n += 1;
  };
  for (let px = x; px <= x1; px += 1) {
    take(px, y);
    take(px, y1);
  }
  for (let py = y; py <= y1; py += 1) {
    take(x, py);
    take(x1, py);
  }
  if (!n) return [image.data[0], image.data[1], image.data[2]];
  return [Math.round(r / n), Math.round(g / n), Math.round(b / n)];
}
