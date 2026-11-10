const ACCOUNT_CONFIG = [
  {
    role: "admin",
    name: "Administrator",
    prefix: "ADMIN",
  },
  {
    role: "client",
    name: "Test User",
    prefix: "TEST",
  },
];

const DEMO_ACCOUNT_EMAILS = new Set([
  "admin@example.com",
  "user@example.com",
]);

export function isDemoAccountEmail(email) {
  return DEMO_ACCOUNT_EMAILS.has(String(email ?? "").trim().toLowerCase());
}

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isStrongPassword = (password) =>
  typeof password === "string" &&
  password.length >= 12 &&
  /[a-z]/.test(password) &&
  /[A-Z]/.test(password) &&
  /\d/.test(password) &&
  /[^A-Za-z0-9]/.test(password);

export function getConfiguredPortalAccounts() {
  const accounts = [];

  for (const { role, name, prefix } of ACCOUNT_CONFIG) {
    const username = process.env[`${prefix}_LOGIN_ID`]?.trim() || "";
    const email = process.env[`${prefix}_EMAIL`]?.trim() || "";
    const password = process.env[`${prefix}_PASSWORD`] || "";
    const values = [username, email, password];

    if (values.every((value) => !value)) continue;
    if (values.some((value) => !value)) {
      throw new Error(
        `${prefix}_LOGIN_ID, ${prefix}_EMAIL, and ${prefix}_PASSWORD must be configured together.`
      );
    }
    if (!isValidEmail(email)) {
      throw new Error(`${prefix}_EMAIL must be a valid email address.`);
    }
    if (process.env.NODE_ENV === "production" && isDemoAccountEmail(email)) {
      throw new Error(`${prefix}_EMAIL cannot use a demo account address in production.`);
    }
    if (!/^[a-zA-Z0-9._-]{1,80}$/.test(username)) {
      throw new Error(
        `${prefix}_LOGIN_ID may contain letters, numbers, periods, underscores, and hyphens only.`
      );
    }
    if (
      process.env.NODE_ENV === "production" &&
      !isStrongPassword(password)
    ) {
      throw new Error(
        `${prefix}_PASSWORD must be at least 12 characters and include uppercase, lowercase, a number, and a symbol in production.`
      );
    }

    accounts.push({ username, email, password, role, name });
  }

  const usernames = accounts.map(({ username }) => username.toLowerCase());
  const emails = accounts.map(({ email }) => email.toLowerCase());
  if (new Set(usernames).size !== usernames.length || new Set(emails).size !== emails.length) {
    throw new Error("Configured portal accounts must use distinct usernames and emails.");
  }

  return accounts;
}

export function assertProductionAuthEnvironment() {
  const accounts = getConfiguredPortalAccounts();
  if (process.env.NODE_ENV !== "production") return;

  const secret = process.env.JWT_SECRET || "";
  if (secret.length < 32) {
    throw new Error("JWT_SECRET must be configured with at least 32 characters in production.");
  }

  if (!accounts.some(({ role }) => role === "admin")) {
    throw new Error(
      "Configure ADMIN_LOGIN_ID, ADMIN_EMAIL, and ADMIN_PASSWORD before starting the production backend."
    );
  }
}
