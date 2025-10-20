/**
 * The routes to other pages
 *
 * Author(s):
 * Wenda Tan
 * (Originally John's Code)
 */
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'

import { AdminPage, Dictionary, ErrorPage, Game1, Game2, HomePage, SigninPage, WordMatchGame } from '@/pages'
import {HeaderSimple} from '@/components/HeaderTabs'
import { authLoader } from './auth.loader'
import { signinLoader } from './signin.loader'

// Layout that includes the header on all pages
function RootLayout() {
  return (
    <>
      <HeaderSimple />
      <Outlet /> {/* this is where the child route renders */}
    </>
  )
}


const router = createBrowserRouter([
  {
    element: <RootLayout />, // wrap all your routes inside this layout
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/game1', element: <Game1 /> },
      { path: '/game2', element: <Game2 /> },
      { path: '/matching-game', element: <WordMatchGame /> },
      { path: '/dictionary', element: <Dictionary /> },
      { path: '/admin', loader: authLoader, element: <AdminPage /> },
      { path: '/admin/signin', loader: signinLoader, element: <SigninPage /> },
      { path: '*', element: <ErrorPage /> }
    ]
  }
])


export function Router() {
  return <RouterProvider router={router} />
}
