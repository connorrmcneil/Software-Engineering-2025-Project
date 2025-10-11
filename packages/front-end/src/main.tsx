import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import './index.css'
import { Router } from './router/router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={{}}>
      <Router  />
    </MantineProvider>
  </StrictMode>,
)
