export function parsePage(page: string | null) {
  return typeof page === "string" && /^\d$/.test(page) ? parseInt(page, 10) : 1;
}

export function invariantString(value: unknown) {
  if (typeof value !== "string") {
    throw new Response("Invalid form data", { status: 400 });
  }

  return value;
}
