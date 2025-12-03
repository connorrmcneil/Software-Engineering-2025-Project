/**
 * The routes to other pages
 *
 * Author(s):
 * Wenda Tan
 * (Originally John's Code)
 */

import {Box} from '@mantine/core'
import {createBrowserRouter, Outlet, RouterProvider} from 'react-router'

import {Footer} from '@/components/Footer'
import {Header} from '@/components/Header'
import {AdminPage, ErrorPage, FAQ, HomePage, IslandGamePage, PrivacyPolicy, SigninPage, WordMatchGame} from '@/pages'
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
      <Box h="100vh">
        <Header />
        <Outlet />
      </Box>
      <Footer />
    </>
  )
}
