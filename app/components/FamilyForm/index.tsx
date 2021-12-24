import { Text, TextInput, Button, createStyles, PasswordInput, Box, Popover, Slider, Checkbox, Code } from "@mantine/core"
import { useForm } from "@mantine/hooks";
import { useNotifications } from "@mantine/notifications";
import { GlobeIcon, LockClosedIcon, PersonIcon } from "@modulz/radix-icons";
import { useState } from "react";
import { Form, useNavigate } from "remix"
import { useInviteFamily } from "~/api/families";
import { useMakeSecret } from "~/api/secrets";
import { Family, Member, Secret } from "~/types";
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

export type FamilyFormProps = {
  family: Family;
  member?: Member;
}

export type FamilyFormValues = {
  name: string;
  email: string;
  familyId: number;
};

export function FamilyForm({ family, member }: FamilyFormProps) {
  const navigate = useNavigate();
  const makeInvite = useInviteFamily();
  const { classes } = useStyles();
  const notifications = useNotifications();

  const { onSubmit, getInputProps, validate, setFieldValue, values, errors } = useForm<FamilyFormValues>({
    initialValues: member ? {
      name: member.profiles.name,
      email: member.profiles.email,
      familyId: family.id
    } : {
      familyId: family.id,
      name: '',
      email: ''
    },
    validationRules: {
      name: (value) => !!value,
      email: (value) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value),
    },
    errorMessages: {
      name: 'Name is required',
      email: 'Email is required',
    }
  })

  const handleSubmit = async ({ familyId, name, email }: FamilyFormValues) => {
    if (!validate()) {
      return;
    }

    makeInvite.mutate({
      familyId,
      name,
      email
    }, {
      onSuccess: (data) => {
        notifications.showNotification({
          color: 'green',
          autoClose: 2000,
          title: `Success`,
          message: `${name} was invited to your family`,
          onClose: () => {
            setTimeout(() => {
              navigate('/family')
            }, 500);
          }
        })
      },
      onError: (error) => {
        console.log(error);
      }
    })
  }

  return (
    <Box className={classes.wrapper} sx={(theme) => ({
      color: theme.colorScheme === 'dark' ? theme.colors.white : theme.colors.dark[9],
      fontSize: theme.fontSizes.xs,
    })}>
      <Form className={classes.form} onSubmit={onSubmit(handleSubmit)}>
        <TextInput
          icon={<PersonIcon />}
          label={<Text transform="uppercase" inherit>Name</Text>}
          placeholder="Name"
          type="text"
          name="name"
          size="md"
          style={{
            marginBottom: '1rem'
          }}
          {...getInputProps('name')}
        />
        <TextInput
          icon={<PersonIcon />}
          label={<Text transform="uppercase" inherit>Email</Text>}
          placeholder="Email address"
          type="email"
          name="email"
          size="md"
          style={{
            marginBottom: '1.5rem'
          }}
          {...getInputProps('email')}
        />

        <Button loading={makeInvite.isLoading} type="submit" color={'green'}>Send Invite</Button>
        {makeInvite.isError && <p>{makeInvite.error.message}</p>}
      </Form>
    </Box>
  )
}
