import { Text, TextInput, Button, createStyles, PasswordInput, Box, Popover, Slider, Checkbox, Code } from "@mantine/core"
import { useForm } from "@mantine/hooks";
import { GlobeIcon, LockClosedIcon, PersonIcon } from "@modulz/radix-icons";
import { useState } from "react";
import { Form, useNavigate } from "remix"
import { useMakeSecret } from "~/api/secrets";
import { Family, Secret } from "~/types";
import { Generator } from "../Generator";
import { PasswordStrength } from "../PasswordStrength";

const useStyles = createStyles(theme => ({
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
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
    width: '100%',
  }
}));

export type EntryFormProps = {
  family: Family;
  secret?: Secret;
}

export type EntryFormValues = Secret;

export function EntryForm({ family, secret }: EntryFormProps) {
  const navigate = useNavigate();
  const makeEntry = useMakeSecret();
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);

  // move to generator component
  const [char, setChar] = useState(8);
  const [useSymbols, setUseSymbols] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);

  const { onSubmit, getInputProps, validate, setFieldValue, values, errors } = useForm<Secret>({
    initialValues: secret ? { ...secret } : {
      title: '',
      username: '',
      pass: '',
      website: '',
      strength: 0
    },
    validationRules: {
      title: (value) => !!value,
      username: (value) => !!value,
      pass: (value) => !!value,
    },
    errorMessages: {
      title: 'Title is required',
      username: 'Username is required',
      pass: 'Password is required',
    }
  })

  const handleSubmit = async ({ title, username, pass, website, strength }: Secret) => {
    if (!validate()) {
      return;
    }

    const res = await makeEntry.mutateAsync({
      title,
      username,
      pass,
      website,
      strength,
      family_id: family!.id,
      id: secret?.id
    })

    if (res) {
      navigate('/passwords')
    }
  }

  return (
    <div className={classes.wrapper}>
      <Form className={classes.form} onSubmit={onSubmit(handleSubmit)}>
        <TextInput
          icon={<PersonIcon />}
          label={<Text size="xs" transform="uppercase" color="dark">Title</Text>}
          placeholder="Title"
          type="text"
          name="title"
          size="md"
          style={{
            marginBottom: '1rem'
          }}
          {...getInputProps('title')}
        />
        <TextInput
          icon={<PersonIcon />}
          label={<Text size="xs" transform="uppercase" color="dark">Username</Text>}
          placeholder="Username or email"
          type="text"
          name="username"
          size="md"
          style={{
            marginBottom: '1rem'
          }}
          {...getInputProps('username')}
        />
        <Box style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', marginBottom: '1rem', width: '100%' }}>
          <PasswordStrength
            style={{ width: '100%' }}
            value={values.pass}
            onStrengthChange={(strength) => setFieldValue('strength', strength)}
            target={
              <PasswordInput
                icon={<LockClosedIcon />}
                label={<Text size="xs" transform="uppercase" color="dark">Password</Text>}
                placeholder="********"
                autoComplete="new-password"
                autoCapitalize="off"
                name="pass"
                size="md"
                style={{
                  width: '100%',
                }}
                {...getInputProps('pass')}
              />
            }
          />
          <Generator
            onChange={(value: string) => setFieldValue('pass', value)}
          />
        </Box>
        <TextInput
          icon={<GlobeIcon />}
          label={<Text size="xs" transform="uppercase" color="dark">Website</Text>}
          placeholder="https://"
          type="text"
          name="website"
          size="md"
          style={{
            marginBottom: '1rem'
          }}
          {...getInputProps('website')}
        />
        <Button loading={makeEntry.isLoading} type="submit" color={'green'}>Save Password</Button>
        {/* {makeEntry.isError && <p>{makeEntry.error}</p>} */}
      </Form>
    </div>
  )
}
