import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './Home'
import RootLayout from './RootLayout'
import Login from './Login'
import Dashboard from './Dashboard'
import CreateAccount from './CreateAccoount'
import LanguageChooser from '../LanguageChooser'
import Medical from './Medical'
import Finance from './Finance'
import Transport from './TransPort'

function App() {

  const routes = createBrowserRouter([
    {
      path : '',
      element : <RootLayout/>,
      children : [
        {index : true,  element : <Home/>},
        {path : 'login', element : <Login/>},
        // {path : 'dashboard', element : <Dashboard/>},
        {path : ':id/dashboard', element : <Dashboard/>},
        {path : ':id/text-to-text', element : <Dashboard/>},
        {path : ':id/language', element : <LanguageChooser/>},
        {path : ':id/transport', element : <Transport/>},
        {path : ':id/medical', element : <Medical/>},
        {path : ':id/finance', element : <Finance/>},
        {path : 'createaccount', element : <CreateAccount/>},
      ]
    }
  ])
  
  return <RouterProvider router={routes}/>
}

export default App
