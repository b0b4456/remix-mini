import { useEffect } from "react";
import { LoaderFunction, useNavigate } from "remix";
import { redirect } from "remix";
import { useLogin } from "~/utils/LoginContext";
import { getUserIdFromSession } from "~/utils/session.server";

export const loader: LoaderFunction = async function ({ request }) {
  const userId = await getUserIdFromSession(request);
  if (userId) {
    // Comment out the following for correct behavior
    return redirect(`/user/${userId}`);
  }
  return null;
};

// can work around issue with client-side redirect 
export default function UserIndex() {
  const userId = useLogin();
  const navigate = useNavigate();
  useEffect(() => navigate(`/user/${userId}`), [userId]);
  return null;
}
