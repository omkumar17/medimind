export function getRoleFromEmail(email) {
  const normalized = (email || "").toLowerCase();

  if (normalized === "admin@medimind.com" || normalized.includes("admin")) {
    return "admin";
  }

  if (normalized === "doctor@medimind.com" || normalized.includes("doctor")) {
    return "doctor";
  }

  return "patient";
}

export function getRoleFromRegno(regno) {
  const prefix = (regno || "").substring(0, 3).toUpperCase();
  if (prefix === "ADM") return "admin";
  if (prefix === "DOC") return "doctor";
  return "patient";
}

export function registerUser(email, password) {
  return {
    email,
    password,
    role: "patient",
    registeredAt: new Date().toISOString(),
  };
}

export function loginUser(email, password) {
  return {
    email,
    token: `token-${Date.now()}`,
    role: getRoleFromEmail(email),
  };
}

export function verifyUserOtp(otp) {
  return otp === "123456";
}
