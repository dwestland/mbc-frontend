import { AuthProvider } from '@/context/AuthContext'
import '@/styles/normalize.scss'
import '@/styles/base.scss'
import '@/styles/globals.scss'
import '@/styles/navbar.scss'

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
