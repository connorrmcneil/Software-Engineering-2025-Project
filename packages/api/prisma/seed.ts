import {createDefaultUser} from './create-default-user'
import {importWords} from './words/import-words'

async function main() {
  await createDefaultUser()
  await importWords()
}

main()
