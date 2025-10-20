import {authLoader} from './auth.loader'
import {wordsLoader} from './words.loader'

export const adminLoader = async () => {
  const auth = await authLoader()
  const words = await wordsLoader()
  return {...auth, ...words}
}
