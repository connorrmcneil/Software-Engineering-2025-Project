/**
 * The routes to other pages
 * 
 * Author(s):
 * Wenda Tan
 * (Originally John's Code)
 */
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { AdminPage, Dictionary, ErrorPage, Game1, Game2, HomePage, SigninPage, WordMatchGame } from '@/pages'
import { authLoader } from './auth.loader'
import { signinLoader } from './signin.loader'

const router = createBrowserRouter([
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
    element: <WordMatchGame />
  },
  {
    path: '/dictionary',
    element: <Dictionary />
  },
  {
    path: '/admin',
    loader: authLoader,
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
