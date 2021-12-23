import { AppShell, MantineProvider, ColorSchemeProvider, NormalizeCSS, GlobalStyles, ColorScheme } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { NavHeader } from "~/components/NavHeader";
import { Navbar } from "~/components/Navbar";
import { LayoutType } from '~/types';
import { useLocation } from 'remix';
import { useContext } from 'react';
import { Context } from './context';
import { useHotkeys, useLocalStorageValue } from '@mantine/hooks';

export function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const { state: { layout } } = useContext(Context);
  const [colorScheme, setColorScheme] = useLocalStorageValue<'light'|'dark'>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  const isOnboarding = pathname === '/onboarding';

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{
        colorScheme,
        fontFamily: 'Source Code Pro, monospace',
        headings: {
          fontFamily: 'Source Code Pro, monospace',
          sizes: {
            h1: { fontSize: '5.653rem', lineHeight: 1.3 },
            h2: { fontSize: '3.998rem', lineHeight: 1.35 },
            h3: { fontSize: '2.827rem', lineHeight: 1.4 },
            h4: { fontSize: '1.999rem', lineHeight: 1.45 },
            h5: { fontSize: '1.414rem', lineHeight: 1.5 },
            h6: { fontSize: '0.707rem', lineHeight: 1.5 },
          }
        },
      }}>
        <NotificationsProvider>
          <NormalizeCSS />
          <GlobalStyles />
          {layout === LayoutType.Authenticated && !isOnboarding ? (
            <AppShell
              navbar={<Navbar />}
              styles={(theme) => ({
                root: {
                  paddingLeft: 0,
                  [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
                    paddingLeft: 80,
                  },
                },
                main: {
                  backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : 'white',
                  minHeight: '100vh',
                  padding: 0,
                  width: '100%',
                  marginBottom: 80,
                  [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
                    marginBottom: 0
                  },
                },
              })}
            >
              <NavHeader />
              {children}

            </AppShell>
          ) : (
            <main>
              {children}
            </main>
          )}
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
