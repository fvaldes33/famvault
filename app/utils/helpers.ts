import md5 from 'js-md5';

export const passwordRules = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

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
