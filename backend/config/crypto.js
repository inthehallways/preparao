import crypto from "crypto";

// Key must be 32 bytes (base64 -> buffer)
const keyBase64 = process.env.FIELD_ENCRYPTION_KEY;
if (!keyBase64) {
  throw new Error("FIELD_ENCRYPTION_KEY is missing in .env");
}
const KEY = Buffer.from(keyBase64, "base64"); 

export const encryptField = (plainText) => {
  const iv = crypto.randomBytes(12); 
  const cipher = crypto.createCipheriv("aes-256-gcm", KEY, iv);

  const encrypted = Buffer.concat([
    cipher.update(String(plainText), "utf8"),
    cipher.final()
  ]);

  const tag = cipher.getAuthTag();

  return `${iv.toString("base64")}:${tag.toString("base64")}:${encrypted.toString("base64")}`;
};

export const decryptField = (payload) => {
  if (!payload) return payload;

  const [ivB64, tagB64, dataB64] = payload.split(":");
  if (!ivB64 || !tagB64 || !dataB64) return payload; 

  const iv = Buffer.from(ivB64, "base64");
  const tag = Buffer.from(tagB64, "base64");
  const data = Buffer.from(dataB64, "base64");

  const decipher = crypto.createDecipheriv("aes-256-gcm", KEY, iv);
  decipher.setAuthTag(tag);

  const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
  return decrypted.toString("utf8");
};


