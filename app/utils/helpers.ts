import md5 from 'js-md5';
import { AccountType } from '~/api/accounts';
import { Category } from '~/api/categories';
import { TransactionImportMapKeys } from '~/types';

export const passwordRules = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

export const AccountTypeMap = {
  [AccountType.CHECKING]: 'Checking',
  [AccountType.SAVINGS]: 'Savings',
  [AccountType.CREDITCARD]: 'Credit Card',
  [AccountType.AUTOLOAN]: 'Auto Loan',
  [AccountType.MORTGAGELOAN]: 'Mortgage Loan',
  [AccountType.STUDENTLOAN]: 'Student Loan',
  [AccountType.OTHER]: 'Other',
};

export const accountTypes = [
  { value: 'checking', label: 'Checking', group: 'Credit' },
  { value: 'savings', label: 'Savings', group: 'Credit' },
  { value: 'creditcard', label: 'Credit Card', group: 'Debit' },
  { value: 'autoloan', label: 'Auto Loan', group: 'Debit' },
  { value: 'mortgageloan', label: 'Mortgage Loan', group: 'Debit' },
  { value: 'studentloan', label: 'Student Loan', group: 'Debit' },
  { value: 'other', label: 'Other', group: 'Debit' },
];

export const transactionFieldMap: { required: boolean, label: string, value: keyof TransactionImportMapKeys }[] = [
  { required: false, label: 'Account', value: 'account' },
  { required: false, label: 'Category', value: 'category' },
  { required: true, label: 'Description', value: 'description' },
  { required: true, label: 'Amount', value: 'amount' },
  { required: true, label: 'Date', value: 'date' },
];

export const uncategorizedCategory: Category = {
  name: 'Uncategorized',
  id: 'uncategorized',
  family_id: 0
};

export function calculatePasswordStrength(password: string): number {
  let multiplier = password.length > 5 ? 0 : 1;

  passwordRules.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (passwordRules.length + 1)) * multiplier, 10);
}

export default function gravatarUrl(identifier: string, options: { [key: string]: any } = {}): string {
  if (!identifier) {
    throw new Error('Please specify an identifier, such as an email address');
  }

  if (identifier.includes('@')) {
    identifier = identifier.toLowerCase().trim();
  }

  const baseUrl = new URL('https://gravatar.com/avatar/');
  baseUrl.pathname += md5(identifier);
  baseUrl.search = (new URLSearchParams(options)).toString();

  return baseUrl.toString();
}

export function csvToArray(str: string, delimiter: string = ",")  {
  const headers = str.slice(0, str.indexOf("\n")).replace(/\r/, '').split(delimiter);
  const rows = str.slice(str.indexOf("\n") + 1).split("\n");
  const data = rows.map((row) => {
    const values = row.split(delimiter);
    const el = headers.reduce((object: { [key: string]: string }, header: string, index: number) => {
      if (values[index]) {
        object[header] = values[index];
      }
      return object;
    }, {});
    return el;
  });

  return {
    headers,
    data: data.filter(d => Object.keys(d).length)
  }
}

export function spliceIntoChunks<T>(arr: T[], chunkSize: number) {
  const res = [];
  while (arr.length > 0) {
    const chunk = arr.splice(0, chunkSize);
    res.push(chunk);
  }
  return res;
}

export function formatCurrency(amount: number): string {
  return (new Intl.NumberFormat('en-US', { style: "currency", currency: "USD" })).format(amount);
}


// export function convertAmountCells(data: { [key: string]: string }[]) {
//   return data.map((row) => {
//     if (Object.keys(row).map(k => k.toLowerCase()).includes('amount')) {
//       return {
//         ...row,

//       }
//     }
//     return {
//       ...row,
//     }
//   })
// }
