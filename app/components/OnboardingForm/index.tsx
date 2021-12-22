import { Text, TextInput, Button, createStyles } from "@mantine/core"
import { useForm } from "@mantine/hooks";
import { EnvelopeClosedIcon, HomeIcon, LockClosedIcon, PersonIcon } from "@modulz/radix-icons";
import { ApiError, User } from "@supabase/supabase-js";
import { useState } from "react";
import { Form, useNavigate } from "remix"
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

export type OnboardingFormProps = {
  user: User;
}

export type OnboardingFormValues = {
  fullName: string;
  familyName: string;
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({
  user,
}) => {
  const { classes } = useStyles();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { onSubmit, validate, getInputProps, errors } = useForm<OnboardingFormValues>({
    initialValues: {
      fullName: '',
      familyName: '',
    },
    validationRules: {
      fullName: (value) => !!value,
      familyName: (value) => !!value,
    },
    errorMessages: {
      fullName: 'Full name is required',
      familyName: 'Family name is required',
    }
  })

  const handleFormSubmit = async ({ fullName, familyName }: OnboardingFormValues) => {
    setError("");
    setLoading(true);

    if (!validate()) {
      setError(Object.values(errors).join(', '));
      return;
    }
    try {
      const { error: e } = await supabase.auth.update({
        data: {
          fullName
        }
      })
      if (e) throw e;

      const { data: profile, error: p } = await supabase
        .from('profiles')
        .update({
          name: fullName
        })
        .single();

      const { data: family, error: f } = await supabase
        .from('families')
        .insert([{
          name: familyName
        }])
        .single();
      if (f) throw f;

      const { error: m } = await supabase
        .from('members')
        .insert([{
          user_id: user.id,
          family_id: family.id
        }])
        .single();
      if (m) throw m;

      navigate('/');
    } catch (error: unknown) {
      setError((error as ApiError).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.logo}>
        <div className={classes.icon}>
          <LockClosedIcon height={24} width={24} />
        </div>
        <Text transform="uppercase" size="lg" weight={700}>Welcome,<br />{user.email}</Text>
      </div>

      <Form className={classes.form} onSubmit={onSubmit(handleFormSubmit)}>
        <Text style={{ paddingBottom: '1rem' }} align="center">
          To get started, finish your profile and create a family.
        </Text>
        <TextInput
          icon={<PersonIcon />}
          placeholder="John Doe"
          type="text"
          name="fullName"
          size="lg"
          style={{
            marginBottom: '1rem'
          }}
          {...getInputProps('fullName')}
        />
        <TextInput
          icon={<HomeIcon />}
          placeholder="Family Name"
          type="text"
          name="familyName"
          size="lg"
          style={{
            marginBottom: '1rem'
          }}
          {...getInputProps('familyName')}
        />
        <Button loading={loading} type="submit" color={'green'}>Complete Profile</Button>
        {error && <p>{error}</p>}
      </Form>
    </div>
  )
}

export { OnboardingForm };
