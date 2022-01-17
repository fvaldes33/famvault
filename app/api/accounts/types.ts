export enum AccountType {
  CHECKING = 'checking',
  SAVINGS = 'savings',
  CREDITCARD = 'creditcard',
  AUTOLOAN = 'autoloan',
  MORTGAGELOAN = 'mortgageloan',
  STUDENTLOAN = 'studentloan',
  OTHER = 'other',
}

export type Account = {
  id: number;
  family_id: number;
  name: string;
  type: AccountType;
  uid?: string;
}

export type AccountRequestParams = Partial<Account>;
