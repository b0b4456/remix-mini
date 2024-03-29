import { Form, ActionFunction, LoaderFunction } from "remix";
import { authenticated, deleteUserSession } from "~/utils/session.server";

export const action: ActionFunction = function ({ request }) {
  if (request.method === "DELETE") {
    return deleteUserSession(request, "/");
  }
  return null;
};

export const loader: LoaderFunction = async ({ request }) => {
  await authenticated(request);
  return null;
};

export default function Login() {
  return (
    <Form method="delete">
      <button type="submit">logout</button>
    </Form>
  );
}
