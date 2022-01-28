import type { ActionFunction, LoaderFunction } from "remix";
import { redirectBack } from "~/utils/respond.server";
import { createUserSession } from "~/utils/session.server";

export const action: ActionFunction = function ({ request }) {
  const id = `user${Date.now()}`;
  console.log("logging in!", id);
  return createUserSession(request, { id }, "/");
};

export const loader: LoaderFunction = async ({ request }) => {
  return redirectBack(request, { fallback: "/" });
};
