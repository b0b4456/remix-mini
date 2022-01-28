import type { LoaderFunction } from "remix";
import { redirect } from "remix";
import { getUserIdFromSession } from "~/utils/session.server";

// IS THIS WHY???
export const loader: LoaderFunction = async function ({ request }) {
  const userId = await getUserIdFromSession(request);
  if (userId) {
    return redirect(`/user/${userId}`);
  }
  return null;
};

export default function UserIndex() {
  return null;
}
