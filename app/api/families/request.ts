import { ApiError, User } from "@supabase/supabase-js";
import { Family, UnSavedRow } from "~/types";
import { supabase } from "~/utils/supabase";
import { Invite } from "./types";

export const getFamily = async (): Promise<Family | null> => {
  const { data, error } = await supabase
    .from<Family>('families')
    .select('*, members (user_id, admin, profiles(name, email))')
    .limit(1)
    .single();

  if (error) throw error;

  return data;
}

export const createFamily = async (family: UnSavedRow<Family>): Promise<Family | null> => {
  const { data, error } = await supabase
    .from<Family>('families')
    .upsert({
      ...family
    })
    .limit(1)
    .single();

  if (error) throw error;

  return data;
}

export const makeAdmin = async (userId: string, admin: boolean): Promise<void> => {
  const { error } = await supabase
    .from<any>('members')
    .update({ admin })
    .match({ user_id: userId });

  if (error) throw error;
}

export const removeMember = async (userId: string): Promise<void> => {
  const { error } = await supabase
    .from<any>('members')
    .delete()
    .match({ user_id: userId });

  if (error) throw error;
}

export const inviteFamily = async ({ familyId, name, email }: Invite): Promise<User> => {
  const res = await fetch('/family/send-invite', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ familyId, name, email })
  });
  const { user, error } = await res.json();

  if (error) throw error as ApiError;

  return user;
}
