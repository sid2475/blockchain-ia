import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={HomePage} />
        </div>
      </Router>
    );
  }
}

export default App;
