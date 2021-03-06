import {
  json,
  Links,
  LinksFunction,
  LiveReload,
  LoaderFunction,
  Meta,
  MetaFunction,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "remix";
import { QueryClientProvider } from 'react-query'
import globalStylesUrl from '~/styles/global.css';
import { getLoggedInUser, getSession, getUserSession } from "./utils/sessions";
import { AppContextProvider, UserContextProvider } from "./context";
import { RootLoader, LayoutType } from '~/types';
import { Layout } from '~/layout';
import { client } from "./utils/client";

// https://remix.run/api/app#links
export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: globalStylesUrl },
  ];
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "F A M V A U L T | Family Password Sharing Tool",
    description: "A minimalist approach to family password sharing done right."
  };
};

const publicPaths = ['/login', '/verify'];

export let loader: LoaderFunction = async ({ request }) => {
  const { pathname } = new URL(request.url);

  const user = await getLoggedInUser(request);
  if (!user && !publicPaths.includes(pathname)) {
    return redirect(`/login`);
  }

  const ENV = {
    PUBLIC_SUPABASE_URL: process.env.PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY: process.env.PUBLIC_SUPABASE_ANON_KEY,
    PROJECT_URL: process.env.PROJECT_URL,
  };

  return json({
    ENV,
    session: !!user
  });
}

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  const { ENV, session } = useLoaderData<RootLoader>();

  return (
    <Document>
      <QueryClientProvider client={client}>
        <AppContextProvider initialState={{
          ready: true,
          layout: session ? LayoutType.Authenticated : LayoutType.Anonymous
        }}>
          <UserContextProvider>
            <Layout>
              <Outlet />
            </Layout>
          </UserContextProvider>
        </AppContextProvider>
      </QueryClientProvider>
      <EnvironmentSetter env={ENV} />
    </Document>
  );
}

function Document({
  children,
  title
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={''} />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300;400;700&display=swap" rel="stylesheet" />
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
}

/**
 This component loads environment variables into window.ENV
 *
 * @param param0
 * @returns
 */
function EnvironmentSetter({ env }: { env: { [key: string]: string } }) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.ENV = ${JSON.stringify(env)}`,
      }}
    />
  );
}
