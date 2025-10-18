import '@mantine/core/styles.css'

import {MantineProvider} from '@mantine/core'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'

import '@mantine/core/styles.css'
import './index.css'

import {Router} from './router/router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={{}} defaultColorScheme="light">
      <Router />
    </MantineProvider>
  </StrictMode>
)
