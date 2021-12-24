import { Text, TextInput, Button, createStyles } from "@mantine/core"
import { useForm } from '@mantine/hooks';
import { EnvelopeClosedIcon, LockClosedIcon } from "@modulz/radix-icons";
import { ApiError } from "@supabase/supabase-js";
import { useState } from "react";
import { Form } from "remix"
import { supabase } from "~/utils/supabase";

const useStyles = createStyles(theme => ({
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    maxWidth: theme.breakpoints.xs
  },
  logo: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    margin: '2rem 0'
  },
  icon: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 64,
    width: 64,
    borderRadius: 999,
    border: `5px solid ${theme.colors.green[2]}`,
    color: theme.colors.dark[4],
    margin: '0 0.5rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0 2rem',
    width: '100%',
    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      padding: '0 4rem',
    },
  }
}));

export type LoginFormProps = {}

const LoginForm: React.FC<LoginFormProps> = () => {
  const { classes } = useStyles();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { onSubmit, getInputProps, validate, errors } = useForm({
    initialValues: {
      email: '',
    },
    validationRules: {
      email: (value) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value),
    },
    errorMessages: {
      email: 'Must be a valid email'
    }
  });

  const handleLoginForm = async ({ email }: { email: string }) => {
    setError("");
    setLoading(true);

    if (!validate()) {
      setError(errors.email as string);
      return;
    }
    try {
      const { error: signUpError } = await supabase.auth.signIn({
        email,
      }, {
        redirectTo: window.ENV.PROJECT_URL
      });
      if (signUpError) throw signUpError;
    } catch (error: unknown) {
      setError((error as ApiError).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.logo}>
        <Text transform="uppercase" size="lg" weight={700}>Fam</Text>
        <div className={classes.icon}>
          <LockClosedIcon height={24} width={24} />
        </div>
        <Text transform="uppercase" size="lg" weight={700}>Vault</Text>
      </div>

      <Form className={classes.form} onSubmit={onSubmit(handleLoginForm)}>
        <Text style={{ paddingBottom: '1rem' }} align="center">Why would a password keeper ask for a password?<br/>Login with a Magic Link.</Text>
        <TextInput
          icon={<EnvelopeClosedIcon />}
          placeholder="Enter your email address"
          type="email"
          name="email"
          size="lg"
          style={{
            marginBottom: '1rem'
          }}
          {...getInputProps('email')}
        />
        <Button loading={loading} type="submit" color={'green'}>Login with Magic Link</Button>
        {error && <p>{error}</p>}
      </Form>
    </div>
  )
}

export { LoginForm };
