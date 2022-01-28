import { createCookieSessionStorage, redirect, Session } from "remix";
import { unauthorized } from "./respond.server";

const { NODE_ENV } = process.env;
const SESSION_SECRET = 'testing';

const { getSession, commitSession } = createCookieSessionStorage({
  cookie: {
    name: "session",
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: NODE_ENV === "production",
    secrets: [SESSION_SECRET],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: true,
  },
});

function getSessionFromCookie(request: Request) {
  return getSession(request.headers.get("Cookie"));
}

export async function getSessionValue<T = unknown>(
  request: Request,
  key: string
) {
  const session = await getSessionFromCookie(request);
  return session.get(key) as T | undefined;
}

export async function setCookieHeader(
  request: Request,
  callback: (session: Session) => void
): Promise<ResponseInit> {
  const session = await getSessionFromCookie(request);
  callback(session);
  return {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  };
}

export async function createUserSession(
  request: Request,
  user: { id: string },
  redirectTo = "/"
) {
  return redirect(
    redirectTo,
    await setCookieHeader(request, (session) => session.set("userId", user.id))
  );
}

export async function deleteUserSession(request: Request, redirectTo = "/") {
  return redirect(
    redirectTo,
    await setCookieHeader(request, (session) => session.unset("userId"))
  );
}

export function getUserIdFromSession(request: Request) {
  return getSessionValue<string>(request, "userId");
}

export async function getUserFromSession(request: Request) {
  const id = await getUserIdFromSession(request);
  return id
    ? { id, foo: 'bar' }
    : null;
}

export async function authenticated(request: Request) {
  const user = await getUserFromSession(request);
  if (!user) {
    throw unauthorized("Authentication required");
  }
  return user;
}
