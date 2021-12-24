import { User } from "@supabase/supabase-js";
import { ActionFunction, json } from "remix";
import { supabase } from "~/utils/supabase";

export let action: ActionFunction = async ({ request }) => {
  const { name, email, familyId }: { name: string, email: string, familyId: number } = await request.json();

  let user: User | null = null;

  const { data: existingUser, error } = await supabase
    .from('profiles')
    .select()
    .eq('email', email)
    .maybeSingle();

  if (!existingUser) {
    const { data: invitedUser, error } = await supabase.auth.api.inviteUserByEmail(
      email,
      {
        redirectTo: process.env.PROJECT_URL
      }
    );
    if (!error) {
      user = invitedUser;
    }
  } else {
    // how to send email to this existing user
    await supabase.auth.api.sendMagicLinkEmail(email, {
      redirectTo: process.env.PROJECT_URL
    });
    user = existingUser;
  }

  if (user) {
    // update profile
    await supabase
      .from('profiles')
      .update({ name })
      .match({ id: user.id })

    // add them to the family
    const { error: familyError } = await supabase
      .from('members')
      .upsert({
        user_id: user.id,
        family_id: familyId
      });

    return json({
      user,
      error: familyError
    })
  }

  return json({
    user,
    error
  })
}
