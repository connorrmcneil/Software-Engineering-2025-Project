import {createBrowserRouter, RouterProvider} from 'react-router'

import {AdminPage, Dictionary, ErrorPage, Game1, Game2, SigninPage} from '@/pages'
import {adminLoader} from './admin.loader'
import {signinLoader} from './signin.loader'

const router = createBrowserRouter([
  {
    index: true,
    element: <div>Home page!</div>
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
    path: '/dictionary',
    element: <Dictionary />
  },
  {
    path: '/errortest',
    element: <ErrorPage />
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
  }
])

export function Router() {
  return <RouterProvider router={router} />
}
