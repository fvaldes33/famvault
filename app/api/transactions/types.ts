import { Sort } from "~/types"
import { Account } from "../accounts"
import { Category } from "../categories"

export type Transaction = {
  account_id?: string | number;
  amount: number;
  category_id?: string | number | null;
  date: string;
  description: string;
  id?: number;
  uid?: string;
  account?: Account;
  category?: Category;
}

export type TransactionsRequestParams = {
  accountId?: string;
  categoryId?: string;
  limit?: number;
  sort?: Sort<Transaction>;
  term?: string;
}
