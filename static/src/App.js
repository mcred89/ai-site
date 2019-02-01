import React, { Component } from 'react';
import { CatVsDog } from './containers/CatVsDog';
import { About } from './containers/About';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
          <Router>
            <div>
              <NavBar />
              <Switch>
                <Route exact path='/' component={CatVsDog} />
                <Route exact path='/about' component={About} />
                <Route path='/catvsdog' component={CatVsDog} />
              </Switch>
            </div>
          </Router>
      </div>
    );
  }
}

class NavBar extends Component {
  render() {
    return (
      <div>
      <nav className="navbar navbar-expand-lg navbar-dark  bg-dark">
        <Link className="navbar-brand" to="/">TheMcIlroyAI</Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/catvsdog">CatVsDog</Link>
          </li>
        </ul>
      </nav>
    </div>
    )
  }
}

export default App;
