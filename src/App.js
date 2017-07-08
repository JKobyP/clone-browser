import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Nav extends Component {
    fetch('/api/')
}

class App extends Component {
  constructor() {
    let url = window.location.href
      // determine if url is http(s)://something/something/something
      if !url.match('/https?:\/\/[^\/]+\/[^\/]+\/[^\/]+$/') {
        return
      }
    if url.lastIndexOf("/") == url.length -1 {
          url = substring(0,-1)
    }
    let sep = url.lastIndexOf("/")
    this.repo = url.substring(sep)
    this.user = url.substring(url.substring(0,sep).lastIndexOf("/"), sep)
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <nav class="clone-nav">
            <Nav />
        </nav>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
