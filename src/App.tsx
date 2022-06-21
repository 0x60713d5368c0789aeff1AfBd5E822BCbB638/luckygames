import { HashRouter as Router, Route } from 'react-router-dom'
import pages from './pages'
import Modal from './components/ui/Modal'
import { WalletProvider } from './lib/wallet'

const initialRoutes = pages.map((route, i) => {
  const { component, ...otherProps } = route
  let Component = component
  return (
    <Route key={i} {...otherProps}>
      <Component />
      <Modal />
    </Route>
  )
})

function App() {
  return (
    <WalletProvider name="fdao" chainId={56}>
      <Router>{initialRoutes}</Router>
    </WalletProvider>
  )
}

export default App
