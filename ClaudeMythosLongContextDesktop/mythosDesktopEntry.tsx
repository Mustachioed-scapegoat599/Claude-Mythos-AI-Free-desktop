import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ClaudeMythosWorkspace from './ClaudeMythosWorkspace'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Claude Mythos AI Desktop could not find the #root element.')
}

createRoot(rootElement).render(
  <StrictMode>
    <ClaudeMythosWorkspace />
  </StrictMode>,
)
