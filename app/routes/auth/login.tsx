import { ActionFunction, Form } from "remix";
import { createUserSession } from "~/utils/session.server";

export const action: ActionFunction = function ({ request }) {
  const id = `b0b${Date.now()}`;
  console.log("logging in!", id);
  return createUserSession(request, { id }, `/user`);
};

export default function Login() {
  return (
    <Form method="post">
      <button type="submit">login</button>
    </Form>
  );
}
