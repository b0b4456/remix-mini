import { useLogin } from "./LoginContext";

const Layout: React.FC = function ({ children }) {
  const userId = useLogin();

  return (
    <div>
      <main>{children}</main>
      <footer>
        <p style={{ color: userId ? "green" : "red" }}>
          {userId ? `hello ${userId}` : `who are you?`}
        </p>
      </footer>
    </div>
  );
};

export default Layout;