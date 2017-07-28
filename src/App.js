import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Head, Nav, Display} from './components.js';



class App extends Component {
    constructor() {
        super();
        this.state = {repo: null, user:null, prs: [], activePR:{id: null, clones: []}};
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
        let prs = this.getPRs(repo, user)
        this.state= {
            repo: repo,
            user: user,
            prs: prs,
            activePR: prs && prs.length > 0 ?
                        prs[0] : {id: null, clones: []},
        };
    }

    changeActivePR(pr) {
        this.setState(
            {   repo: this.state.repo,
                user: this.state.user,
                prs: this.state.prs,
                activePR: pr,
            }
        );
    }

    getPRs(repo,user) {
        var val = [];
        let fetchurl = "/api/pr/" + user + "/" + repo;
        fetch(fetchurl)
            .then(function(response) {
                if (!response.ok) {
                    console.log("response not ok fetching " + fetchurl);
                    return;
                }
                var contentType = response.headers.get("Content-Type");
                if(contentType && contentType.indexOf("application/json") !== -1) {
                    val = response.json();
                } else {
                    console.log("response not json fetching " + fetchurl);
                }
            })
        return val;
    }

    render() {
        console.log(this.state)
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <header>
                    <Head onSelect={this.changeActivePR} prs={this.state.prs} />
                </header>
                <nav className="clone-nav" >
                    <Nav repo={this.state.repo} user={this.state.user} clones={this.state.activePR.clones} />
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
