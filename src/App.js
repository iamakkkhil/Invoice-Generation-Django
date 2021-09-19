import './App.css';
import AddItem from './components/getItems' 
import AllCust from './components/AllCustomers'
import { createBrowserHistory } from 'history';

import {
  ChakraProvider,
} from '@chakra-ui/react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// import { browserHistory } from 'react-router-dom'


function App({props}) {

  // console.log(window.location.pathname);
  const hist = createBrowserHistory()

  return (
      <div className="App">
        <Router history={hist}>
          <div>
            <Switch>

              <Route exact path="/">
                <ChakraProvider >
                  <AllCust />
                </ChakraProvider > 
              </Route>

              <Route exact path="/add/">
                <ChakraProvider>
                  <AddItem method="GET"/>
                </ChakraProvider>
              </Route>

              <Route path="/edit" >
                <ChakraProvider>
                  <AddItem method="PUT" />
                </ChakraProvider>
              </Route>
              
            </Switch>
          </div>
        </Router>
      </div>
  );
}

export default App;
