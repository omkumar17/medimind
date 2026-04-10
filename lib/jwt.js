import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "medimind_secret_key";
export const TEMP_REGISTER_COOKIE_NAME = "medimind_temp_token";
export const AUTH_COOKIE_NAME = "medimind_auth_token";

export function signJwt(payload, options = {}) {
  return jwt.sign(payload, JWT_SECRET, {
    algorithm: "HS256",
    ...options,
  });
}

export function verifyJwt(token) {
  return jwt.verify(token, JWT_SECRET);
}
