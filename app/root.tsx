import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "remix";
import type { MetaFunction, LoaderFunction } from "remix";
import Layout from './utils/Layout';
import LoginContext from "./utils/LoginContext";
import { getUserIdFromSession } from "./utils/session.server";

export const meta: MetaFunction = () => {
  return { title: "Minimal Remix App" };
};

export const loader: LoaderFunction = async function ({ request }) {
  const userId = await getUserIdFromSession(request);
  console.log("loader userId", userId);
  return userId || null;
};

export default function App() {
  const userId = useLoaderData<string | null>();

  return (
    <Document>
      <LoginContext.Provider value={userId}>
        <Layout>
          <Outlet />
        </Layout>
      </LoginContext.Provider>
    </Document>
  );
}

const Document: React.FC = function ({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
};
