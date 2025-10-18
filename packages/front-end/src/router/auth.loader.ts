import {redirect} from 'react-router'

import {api} from '@/api'

// check the status of the user's authentication by calling the /users/me endpoint
// if successful, return the user data, otherwise redirect to the signin page
export const authLoader = async () => {
  try {
    const {data} = await api.get('/users/me')
    return {user: data.user}
  } catch (error) {
    throw redirect('/admin/signin')
  }
}
