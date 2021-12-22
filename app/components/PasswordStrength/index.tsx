import React, { useState } from 'react';
import { CheckIcon, Cross1Icon } from '@modulz/radix-icons';
import { PasswordInput, Progress, Text, Popover } from '@mantine/core';
import { calculatePasswordStrength, passwordRules } from '~/utils/helpers';

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Text
      color={meets ? 'teal' : 'red'}
      style={{ display: 'flex', alignItems: 'center', marginTop: 7 }}
      size="sm"
    >
      {meets ? <CheckIcon /> : <Cross1Icon />} <span style={{ marginLeft: 10 }}>{label}</span>
    </Text>
  );
}

export type PasswordStrengthProps = {
  value: string;
  target: React.ReactNode;
  style?: React.CSSProperties | undefined;
  onStrengthChange?: (strength: number) => void;
}

export function PasswordStrength({ value, target, style, onStrengthChange }: PasswordStrengthProps) {
  const [popoverOpened, setPopoverOpened] = useState(false);

  const strength = calculatePasswordStrength(value);
  const checks = passwordRules.map((rule, index) => (
    <PasswordRequirement key={index} label={rule.label} meets={rule.re.test(value)} />
  ));
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

  return (
    <Popover
      opened={popoverOpened}
      position="bottom"
      placement="start"
      withArrow
      style={style}
      styles={{ popover: { width: '100%' } }}
      noFocusTrap
      transition="pop-top-left"
      onFocusCapture={() => setPopoverOpened(true)}
      onBlurCapture={() => {
        if (onStrengthChange) {
          onStrengthChange(strength);
        }
        setPopoverOpened(false)
      }}
      target={target}
    >
      <Progress color={color} value={strength} size={5} style={{ marginBottom: 10 }} />
      <PasswordRequirement label="Includes at least 6 characters" meets={value.length > 5} />
      {checks}
    </Popover>
  );
}
