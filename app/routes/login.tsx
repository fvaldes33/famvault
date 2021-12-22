import { Center } from "@mantine/core";
import { MetaFunction, LoaderFunction, json, redirect } from "remix";
import { LoginForm } from "~/components/LoginForm";
import { FullScreenCenter } from "~/components/FullScreenCenter";
import { getLoggedInUser } from "~/utils/sessions";

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export const loader: LoaderFunction = async ({ request }) => {
  const user = await getLoggedInUser(request);

  if (user) {
    return redirect('/');
  }

  return json({});
}

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!"
  };
};

// https://remix.run/guides/routing#index-routes
export default function Login() {

  return (
    <FullScreenCenter>
      <Center style={{ width: '100%' }}>
        <LoginForm />
      </Center>
    </FullScreenCenter>
  )
}
