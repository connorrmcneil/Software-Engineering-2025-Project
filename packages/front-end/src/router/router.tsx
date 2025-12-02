/**
 * The routes to other pages
 *
 * Author(s):
 * Wenda Tan
 * (Originally John's Code)
 */
import {AppShell, Button, Group} from '@mantine/core'
import {HouseIcon} from '@phosphor-icons/react'
import {createBrowserRouter, Link, Outlet, RouterProvider} from 'react-router'

import {Dictionary} from '@/components/Dictionary'
import {AdminPage, ErrorPage, FAQ, HomePage, PrivacyPolicy, SigninPage, WordMatchGame, IslandGamePage} from '@/pages'
import {adminLoader} from './admin.loader'
import {signinLoader} from './signin.loader'
import {wordsLoader} from './words.loader'

const router = createBrowserRouter([
  {
    element: <Layout />,
    loader: wordsLoader,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/matching-game',
        loader: wordsLoader,
        element: <WordMatchGame />
      },
      {
        path: '/eskasoni-island-game',
        element: <IslandGamePage />
      }
    ]
  },
  {
    path: '/admin',
    loader: adminLoader,
    element: <AdminPage />
  },
  {
    path: '/admin/signin',
    loader: signinLoader,
    element: <SigninPage />
  },
  {
    path: '*',
    element: <ErrorPage />
  },
  {
    path: '/faq',
    element: <FAQ />
  },
  {
    path: '/privacypolicy',
    element: <PrivacyPolicy />
  }
])

export function Router() {
  return <RouterProvider router={router} />
}

type NavLink = {
  label: string
  href: string
  icon?: React.ReactNode
}

const navLinks: NavLink[] = [
  {label: 'Home', href: '/', icon: <HouseIcon size={20} weight="fill" />},
  {label: 'Word Match', href: '/matching-game'},
  {label: 'Goat Island Eskasoni', href: '/eskasoni-island-game'},
  {label: 'Admin', href: '/admin'}
]

function Layout() {
  const links = navLinks.map((link, index) => (
    <Button key={index} component={Link} to={link.href} leftSection={link.icon} variant="subtle" fw="bold">
      {link.label}
    </Button>
  ))

  return (
    <AppShell header={{height: 80}} padding="md">
      <AppShell.Header p="md">
        <Group h="100%" justify="space-between">
          <Group>{links}</Group>
          <Dictionary />
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
