import { Popover, Button, Box, Slider, Checkbox, Code, Text } from "@mantine/core";
import { useForm, useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";

const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const alphaLower = alpha.toLowerCase();
const numeric = "0123456789";
const symbols = "!@#$%^&*()_+-=[]{}|;':,./<>?`~";

export type GeneratorProps = {
  onChange: (value: string) => void;
}

export function Generator({ onChange }: GeneratorProps) {
  const [opened, setOpened] = useState(false);
  const [pass, setPass] = useState('');
  const matches = useMediaQuery('(min-width: 576px)');

  const { getInputProps, values } = useForm({
    initialValues: {
      char: 32,
      useSymbols: true,
      useNumbers: true,
    }
  })

  useEffect(() => {
    if (!opened) {
      return;
    }

    const { char: length, useSymbols, useNumbers } = values;
    const availableChars = (alpha + alphaLower) + (useSymbols ? symbols : "") + (useNumbers ? numeric : "");
    let pass = '';

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * availableChars.length + 1);

      pass += availableChars.charAt(char)
    }

    setPass(pass);
    onChange(pass);
  }, [opened, values])

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      target={
        <Button onClick={() => setOpened((o: boolean) => !o)} color="green" size="md">
          Generator
        </Button>
      }
      width={260}
      position={matches ? 'left' : 'bottom'}
      withArrow
    >
      <Box sx={(theme) => ({
        color: theme.colorScheme === 'dark' ? theme.colors.white : theme.colors.dark[9],
        fontSize: theme.fontSizes.xs,
      })}>
        <Box>
          <Text transform="uppercase" inherit>Length</Text>
          <Slider
            defaultValue={32}
            min={8}
            max={64}
            labelTransition="skew-down"
            labelTransitionDuration={150}
            labelTransitionTimingFunction="ease"
            {...getInputProps('char')}
          />
        </Box>
        <Box style={{ display: 'flex', gap: '8px', margin: '24px 0' }}>
          <div style={{ width: '50%' }}>
            <Checkbox
              label={<Text transform="uppercase" inherit>Numbers</Text>}
              {...getInputProps('useNumbers', { type: 'checkbox' })}
            />
          </div>
          <div style={{ width: '50%' }}>
            <Checkbox
              label={<Text transform="uppercase" inherit>Symbols</Text>}
              {...getInputProps('useSymbols', { type: 'checkbox' })}
            />
          </div>
        </Box>
        <Code block sx={(theme) => ({
          padding: '1rem'
        })}>
          {pass}
        </Code>
      </Box>
    </Popover>
  );
}
