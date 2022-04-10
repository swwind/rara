const secret = process.env.RARA_SECRET ?? "";

if (!secret) {
  throw new Error("RARA_SECRET environment variable is not set");
}

/**
 * 判断请求是否由管理员发出
 */
export function authenticate(request: Request) {
  const cookie = request.headers.get("Cookie");
  return cookie && cookie.includes(`secret=${secret}`);
}

export function isSecret(sec: string) {
  return secret === sec;
}
