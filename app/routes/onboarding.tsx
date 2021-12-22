import { Button, Center, Box } from "@mantine/core";
import { MetaFunction, LoaderFunction, ActionFunction, useLocation, useActionData, json, Link, redirect, useLoaderData } from "remix";
import { useEffect, useCallback, useState } from "react";
import { supabase } from "~/utils/supabase";
import { LoginForm } from "~/components/LoginForm";
import { FullScreenCenter } from "~/components/FullScreenCenter";
import { OnboardingForm } from "~/components/OnboardingForm";
import { getSession, getLoggedInUser } from "~/utils/sessions";
import { User } from "@supabase/supabase-js";

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export const loader: LoaderFunction = async ({ request }) => {

  const user = await getLoggedInUser(request);
  if (!user) {
    return redirect('/login');
  }

  return json({
    user
  });
}

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!"
  };
};

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const form = await request.formData();
  const fullName = form.get('fullName') as string;
  const familyName = form.get('familyName') as string;

  if (!fullName) {
    return json({
      error: "Please provide a full name"
    }, { status: 422 })
  }

  if (!familyName) {
    return json({
      error: "Please provide a family name"
    }, { status: 422 })
  }

  //
  const { user, error } = await supabase.auth.api.updateUser(session.get('accessToken'), {
    data: { fullName }
  })

  if (error) {
    return json({
      error: error.message
    }, { status: 422 })
  }

  const { data: family, error: familyError } = await supabase
    .from('families')
    .insert([
      { name: familyName }
    ]);

  if (familyError) {
    return json({
      error: familyError.message
    }, { status: 422 })
  }

  return json({
    user,
    family,
    message: 'Success'
  });
}

// https://remix.run/guides/routing#index-routes
export default function OnboardingRoute() {
  const { user } = useLoaderData<{ user: User }>();

  return (
    <FullScreenCenter>
      <Center>
        <OnboardingForm
          user={user}
        />
      </Center>
    </FullScreenCenter>
  )
}
