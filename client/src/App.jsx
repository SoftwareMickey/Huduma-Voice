import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './Home'
import RootLayout from './RootLayout'
import Login from './Login'
import Dashboard from './Dashboard'
import CreateAccount from './CreateAccoount'
import Medical from './Medical'
import Finance from './Finance'
import Transport from './TransPort'
import Agriculture from './Agriculture'
import ServicesPage from './Services'
import IndustriesPage from './Industries'
function App() {

  const routes = createBrowserRouter([
    {
      path : '',
      element : <RootLayout/>,
      children : [
        {index : true,  element : <Home/>},
        {path : 'login', element : <Login/>},
        {path : 'servicepage', element : <ServicesPage/>},
        {path : 'industriespage', element : <IndustriesPage/>},
        {path : 'login', element : <Login/>},
        // {path : 'dashboard', element : <Dashboard/>},

        
        {path : ':id/dashboard', element : <Dashboard/>},
        {path : ':id/text-to-text', element : <Dashboard/>},
        {path : ':id/transport', element : <Transport/>},
        {path : ':id/medical', element : <Medical/>},
        {path : ':id/agriculture', element : <Agriculture/>},
        {path : ':id/finance', element : <Finance/>},
        {path : 'createaccount', element : <CreateAccount/>},
        

      ]
    }
  ])
  
  return <RouterProvider router={routes}/>
}

export default App
