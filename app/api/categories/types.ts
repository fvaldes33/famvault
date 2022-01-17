export type Category = {
  id: number|string;
  family_id: number;
  name: string;
  description?: string;
  match_rules?: string[];
}
