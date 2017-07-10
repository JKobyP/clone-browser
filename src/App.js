import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Nav extends Component {
    render() {
        this.repo = this.props.repo
        this.user = this.props.user
        var val
        //fetch("/api/").then( resp => resp.json()).then(json => val = json)
        this.clones = val
        return (
        <h2>Nav</h2>
        )
    }
}

class Display extends Component {


    render() {
        let repo = this.props.repo
        let user = this.props.user
        let clones = this.props.clones
        return (<div>
        <h2>Display</h2>
            <div>
            <p>{repo}</p>
            <p>{user}</p>
            <p>{clones}</p>
            </div>
            </div>
        )
    }
}

class App extends Component {
  constructor() {
      super()
    let url = window.location.href
      // determine if url is http(s)://something/something/something
      if (!url.match('https?://[^/]+/[^/]+/[^/]+$')) {
          console.log("badly formed url:")
          console.log(url)
        return
      }
    if (url.lastIndexOf("/") === url.length -1) {
          url = url.substring(0,-1)
    }
    let sep = url.lastIndexOf("/")
    this.repo = url.substring(sep + 1)
    this.user = url.substring(url.substring(0,sep).lastIndexOf("/")+1, sep)
    this.prs = this.getPRs(this.repo, this.user)
    this.activePR = {clones: null}
    if (this.prs) {
        this.activePR = this.prs[0]
    }
  }

    getPRs(repo,user) {
        var val
        let fetchurl = "/api/" + user + "/" + repo
        fetch(fetchurl)
            .then(function(response) {
                if (!response.ok) {
                    console.log("response not ok fetching " + fetchurl)
                    return
                }
                var contentType = response.headers.get("content-type");
                if(contentType && contentType.indexOf("application/json") !== -1) {
                    val = response.json()
                }
                console.log("response not json fetching " + fetchurl)
            })
        return val
    }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <nav className="clone-nav" >
            <Nav repo={this.repo} user={this.user} clones={this.activePR.clones} />
        </nav>
        <section className="clone-content" >
            <Display repo={this.repo} user={this.user} pr={this.activePR}/>
        </section>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
