import { Profile } from "~/types";

export type Invite = Pick<Profile, 'name' | 'email'> & { familyId: number };
export type MemberUpdateParams = {
  userId: string;
  admin: boolean;
}
