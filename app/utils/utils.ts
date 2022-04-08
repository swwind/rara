export function parsePage(page: string | null) {
  return typeof page === "string" && /^\d$/.test(page) ? parseInt(page, 10) : 1;
}
