import { json, redirect } from "remix";

export function redirectBack(
  request: Request,
  { fallback, ...init }: ResponseInit & { fallback: string }
): Response {
  return redirect(request.headers.get("Referer") ?? fallback, init);
}

function statusJson(status: number, message?: string) {
  return json({ message: message || null, status }, { status });
}

export function badRequest(message?: string) {
  return statusJson(400, message);
}

export function unauthorized(message?: string) {
  return statusJson(401, message);
}

export function forbidden(message?: string) {
  return statusJson(403, message);
}

export function notFound(message?: string) {
  return statusJson(404, message);
}
