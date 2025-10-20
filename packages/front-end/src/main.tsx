import '@mantine/core/styles.css'

import type {MantineThemeOverride} from '@mantine/core'

import {MantineProvider} from '@mantine/core'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'

import '@mantine/core/styles.css'
import './index.css'

import {Router} from './router/router.tsx'

const theme: MantineThemeOverride = {
  defaultRadius: 'md'
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="light">
      <Router />
    </MantineProvider>
  </StrictMode>
)
