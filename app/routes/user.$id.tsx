import { Link, LoaderFunction } from "remix";
import { forbidden } from "~/utils/respond.server";
import { authenticated } from "~/utils/session.server";

export const loader: LoaderFunction = async function ({ request, params }) {
  const user = await authenticated(request);
  if(user.id !== params.id) {
    throw forbidden();
  }
  return null;
};

export default function() {
  return <div>
    <h1>you are logged in!</h1>
    <Link to="/">go home</Link>
  </div>
};