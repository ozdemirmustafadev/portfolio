const verifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type VerifyResponse = {
  success: boolean;
};

export async function verifyTurnstile(token: string, remoteIp?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret || !token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const response = await fetch(verifyUrl, { method: "POST", body });
    const result = (await response.json()) as VerifyResponse;
    return result.success === true;
  } catch (error) {
    console.error("Turnstile verification failed.", error);
    return false;
  }
}
