const encoder = new TextEncoder();

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}

function base64UrlToBytes(value: string) {
  const pad = (4 - (value.length % 4)) % 4;
  const padded = value.replaceAll("-", "+").replaceAll("_", "/") + "=".repeat(pad);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function hmac(secret: string, value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return bytesToBase64Url(new Uint8Array(signature));
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}

export async function seal(secret: string, id: string) {
  const body = bytesToBase64Url(
    encoder.encode(JSON.stringify({ id, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 })),
  );
  return `${body}.${await hmac(secret, body)}`;
}

export async function openToken(secret: string, token: string) {
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;
  const expected = await hmac(secret, body);
  if (!safeEqual(signature, expected)) return null;
  try {
    const payload = JSON.parse(new TextDecoder().decode(base64UrlToBytes(body))) as {
      id?: string;
      exp?: number;
    };
    if (!payload.id || !payload.exp || payload.exp < Date.now()) return null;
    return payload.id;
  } catch {
    return null;
  }
}
