import { Form } from "remix";
import { useLogin } from "~/utils/LoginContext";

export default function Index() {
  const userId = useLogin();
  const inOrOut = userId ? "logout" : "login";

  return (
    <div>
      <h1>Welcome to Remix</h1>
      <Form method={userId ? "delete" : "post"} action={`/auth/${inOrOut}`}>
        <button type="submit">{inOrOut}</button>
      </Form>
    </div>
  );
}
