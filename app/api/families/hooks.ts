import { ApiError, PostgrestError, User } from "@supabase/supabase-js";
import { useMutation, useQuery } from "react-query";
import { Family } from '~/types';
import { createFamily, getFamily, inviteFamily, removeMember, makeAdmin } from "./request";
import { Invite, MemberUpdateParams } from "./types";

export function useFamily() {
  return useQuery<Family | null, PostgrestError, Family>(
    ['get-family'],
    () => getFamily()
  )
}

export function useMakeFamily() {
  return useMutation(async (family: Family) => await createFamily({ ...family }));
}

export function useInviteFamily() {
  return useMutation<User, ApiError, Invite>(async (invite: Invite) => await inviteFamily(invite));
}

export function useMakeAdmin() {
  return useMutation<void, ApiError, MemberUpdateParams>(async ({ userId, admin }) => await makeAdmin(userId, admin));
}

export function useRemoveMember() {
  return useMutation<void, ApiError, string>(async (userId: string) => await removeMember(userId));
}
