import { AuthProvider } from '@redwoodjs/auth'
import ReactDOM from 'react-dom'
import { RedwoodProvider, FatalErrorBoundary } from '@redwoodjs/web'
import FatalErrorPage from 'src/pages/FatalErrorPage'
import { CSSReset, ThemeProvider } from '@chakra-ui/core'

import Routes from 'src/Routes'

import './index.css'
const netlifyOAuth = { redirectUrl: 'http://localhost:8910', state: '12345678' }

ReactDOM.render(
  <FatalErrorBoundary page={FatalErrorPage}>
    <AuthProvider client={netlifyOAuth} type="netlifyOAuth">
      <RedwoodProvider>
        <ThemeProvider>
          <CSSReset />
          <Routes />
        </ThemeProvider>
      </RedwoodProvider>
    </AuthProvider>
  </FatalErrorBoundary>,
  document.getElementById('redwood-app')
)
