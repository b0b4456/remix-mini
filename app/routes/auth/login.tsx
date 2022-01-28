import type { ActionFunction, LoaderFunction } from "remix";
import { redirectBack } from "~/utils/respond.server";
import { createUserSession } from "~/utils/session.server";

export const action: ActionFunction = function ({ request }) {
  const id = `b0b${Date.now()}`;
  console.log("logging in!", id);
  return createUserSession(request, { id }, `/user/${id}`);
};

export const loader: LoaderFunction = async ({ request }) => {
  return redirectBack(request, { fallback: "/" });
};
