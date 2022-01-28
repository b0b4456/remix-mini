import { Form } from "remix";
import { useLogin } from "~/utils/LoginContext";

export default function Index() {
  const userId = useLogin();

  return (
    <div>
      <h1>Welcome to Remix</h1>
      {userId ? (
        <Form method="delete" action="/auth/logout">
          <button type="submit">logout</button>
        </Form>
      ) : (
        <Form method="post" action="auth/login">
          <button type="submit">login</button>
        </Form>
      )}
    </div>
  );
}
