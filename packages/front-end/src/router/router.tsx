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

import {HeaderSimple} from '@/components/Header'
import {Dictionary} from '@/components/Dictionary'
import {AdminPage, ErrorPage, Game1, Game2, HomePage, SigninPage, WordMatchGame} from '@/pages'
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
        path: '/game1',
        element: <Game1 />
      },
      {
        path: '/game2',
        element: <Game2 />
      },
      {
        path: '/matching-game',
        loader: wordsLoader,
        element: <WordMatchGame />
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
    ]
  }

])

export function Router() {
  return <RouterProvider router={router} />
}

function Layout() {
  return (
    <>
    <HeaderSimple />
    <Outlet />
    </>
  )
}



