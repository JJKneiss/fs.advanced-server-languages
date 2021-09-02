import React, { Component } from "react";
import Routes from './components/Routes.js'
import { BrowserRouter as Router } from "react-router-dom";
class App extends Component {
  getResponse = async () => {
    const response = await fetch(`http://localhost:3001/`);
    console.log(response);
    const body = response.json();
    console.log(body);
  }
  render() {
    return (
      <div className="App" >
        <Router>
          <Routes />
        </Router>
      </div>
    );
  }
}

export default App;
