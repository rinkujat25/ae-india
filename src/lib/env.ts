import "server-only";

type HyperinventoryEnvironment = {
  apiUrl: string;
  sellerId: string;
  salesChannel: string;
  clientId: string;
  clientSecret: string;
  searchToken?: string;
  /** The provider form the enquiry modal posts to. */
  demoFormId?: string;
  origin?: string;
  referer?: string;
};

function optionalEnvironment(name: string) {
  return process.env[name]?.trim() || undefined;
}

function requireEnvironment(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required server environment variable: ${name}`);
  }

  return value;
}

export function getHyperinventoryEnvironment(): HyperinventoryEnvironment {
  return {
    apiUrl: requireEnvironment("HYPERINVENTORY_API_URL").replace(/\/$/, ""),
    sellerId: requireEnvironment("HYPERINVENTORY_SELLER_ID"),
    salesChannel: requireEnvironment("HYPERINVENTORY_SALESCHANNEL"),
    clientId: requireEnvironment("HYPERINVENTORY_CLIENT_ID"),
    clientSecret: requireEnvironment("HYPERINVENTORY_CLIENT_SECRET"),
    searchToken: optionalEnvironment("HYPERINVENTORY_SEARCH_TOKEN"),
    demoFormId: optionalEnvironment("DEMO_FORM_ID"),
    origin: optionalEnvironment("HYPERINVENTORY_ORIGIN"),
    referer: optionalEnvironment("HYPERINVENTORY_REFERER"),
  };
}

/**
 * How long the verify step makes the buyer wait before Resend works again.
 *
 * The provider enforces its own one-minute throttle and answers code 1028 when
 * it is breached; this is the countdown shown so that answer is rarely reached.
 * Keep it at or above the provider's window — a shorter value just surfaces the
 * throttle error instead of preventing it.
 */
export function getOtpResendSeconds(): number {
  const configured = Number(process.env.OTP_RESEND_SECONDS?.trim());

  return Number.isFinite(configured) && configured > 0 ? Math.floor(configured) : 60;
}
