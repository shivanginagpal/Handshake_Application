import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Main from './components/Main';

import './App.css';

//App Component
class App extends Component {
  render() {
    return (
      //Use Browser Router to route to different pages
      <BrowserRouter>
        <div>
          {/* App Component Has a Child Component called Main*/}
          <Main/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
