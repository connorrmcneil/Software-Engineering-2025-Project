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
import {Header} from '@/components/Header'
import {Footer} from '@/components/Footer'

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
      },
      {
        path: '/faq',
        element: <FAQ />
      },
      {
        path: '/privacypolicy',
        element: <PrivacyPolicy />
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
  }
])

export function Router() {
  return <RouterProvider router={router} />
}


function Layout() {
  return (
    <>
    <Header />
    <Outlet />
    <Footer />
    </>
  )
}