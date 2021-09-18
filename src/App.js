import './App.css';
import AddItem from './components/getItems' 
import AllCust from './components/AllCustomers'


import {
  ChakraProvider,
} from '@chakra-ui/react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App({props}) {

  // console.log(window.location.pathname);

  return (
      <div className="App">
        <Router>
          <div>
            <Switch>

              <Route exact path="/">
                <ChakraProvider >
                  <AllCust />
                </ChakraProvider > 
              </Route>

              <Route exact path="/add">
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
