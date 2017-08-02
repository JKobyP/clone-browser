import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Head, Nav, Display} from './components.js';

function newPR() {return {id: null, clones: [], files: []}}

class App extends Component {
  constructor() {
    super();
    this.state = {repo: null, user:null, prs: [], activePR:newPR(), activeClone: null,};
    let url = window.location.href;
    // determine if url is http(s)://something/something/something
    if (!url.match('https?://[^/]+/pr/[^/]+/[^/]+$')) {
      console.log("badly formed url:");
      console.log(url);
      return;
    }
    if (url.lastIndexOf("/") === url.length -1) {
      url = url.substring(0,-1);
    }
    let sep = url.lastIndexOf("/");
    let repo = url.substring(sep + 1);
    let user = url.substring(url.substring(0,sep).lastIndexOf("/")+1, sep);
    this.getPRs = this.getPRs.bind(this);
    this.getPRs(repo, user);
    let prs = []
    this.state= {
      repo: repo,
      user: user,
      prs: prs,
      activePR: prs && prs.length > 0 ? prs[0] : newPR(),
      activeClone: null,
    };
    this.changeActiveClone = this.changeActiveClone.bind(this);
  }

  changeActiveClone(clone) {
    this.setState(
      { repo: this.state.repo,
        user: this.state.user,
        prs: this.state.prs,
        activePR: this.state.activePR,
        activeClone: clone,
      }
        );
  }

  changeActivePR(pr) {
    this.setState(
        {   repo: this.state.repo,
          user: this.state.user,
          prs: this.state.prs,
          activePR: pr,
          activeClone: this.state.activeClone,
        }
        );
  }

  getPRs(repo,user) {
    let fetchurl = "/api/pr/" + user + "/" + repo;
    let promise = fetch(fetchurl)
      .then(function(response) {
        if (!response.ok) {
          console.log("response not ok fetching " + fetchurl);
          return;
        }
        var contentType = response.headers.get("Content-Type");
        if(contentType && contentType.indexOf("application/json") !== -1) {
          return response.json();
        } else {
          console.log("response not json fetching " + fetchurl);
        }
      });
    promise.then((function(json) {
      let val = json
        this.setState(
            {   repo: this.state.repo,
              user: this.state.user,
              prs: val,
              activePR: val.length > 0 ? val[0] : {id: 0, clones: null},
            })
    }).bind(this))
  }

  render() {
    console.log(this.state)
      return (
          <div className="App">
            <div className="App-header">
              <h2>Clone-browser</h2>
            </div>
            <div className="App-content">
              <header className="clone-head">
                <Head   onSelect={this.changeActivePR} 
                        prs={this.state.prs}
                        repo={this.state.repo}
                        user={this.state.user}/>
              </header>
              <nav className="clone-nav" >
                <Nav
                  clones={this.state.activePR.clones}
                  onCloneSelect={this.changeActiveClone}/>
              </nav>
              <section className="clone-content" >
                <Display
                  pr={this.state.activePR}
                  selectedClone={this.state.activeClone}/>
              </section>
              <div className="clearfix"></div>
            </div>
          </div>
          );
  }
}

export default App;
