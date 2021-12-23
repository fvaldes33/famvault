import { supabase } from "~/utils/supabase";
import { Secret, UnSavedRow } from '~/types';

export const getSecrets = async (): Promise<Secret[]> => {
  const { data, error } = await supabase
    .from<Secret>('secrets')
    .select('*')
    .order('title');

  if (error) throw error;

  return data ?? [];
}

export const searchSecrets = async (search: string): Promise<Secret[]> => {
  const { data, error } = await supabase
    .from<Secret>('secrets')
    .select('*')
    .textSearch('title', `${search.replace(' ', ' | ')}`)
    .order('title');

  if (error) throw error;

  return data ?? [];
}

export const getSecret = async (uid: string): Promise<Secret | null> => {
  const { data, error } = await supabase
    .from<Secret>('secrets')
    .select('*')
    .eq('uid', uid)
    .single();

  if (error) throw error;

  if (data) {
    const hash = await fetch('/hash', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: data.pass
      })
    })

    const { password } = await hash.json();

    return {
      ...data,
      pass: password
    }
  }

  return data;
}

export const deleteSecret = async (id: number): Promise<Secret | null> => {
  const { error } = await supabase
    .from<Secret>('secrets')
    .delete()
    .match({ id });

  if (error) throw error;

  return null;
}

export const createSecret = async (secret: UnSavedRow<Secret>): Promise<Secret | null> => {
  // calculate password strength
  // hash password for storage
  // gather assets from website / name

  const hash = await fetch('/hash', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: secret.pass
    })
  })

  const { password } = await hash.json();

  const { data, error } = await supabase
    .from<Secret>('secrets')
    .upsert({
      ...secret,
      pass: password // hashed
    })
    .single();

  if (error) throw error;

  return data;
}
