import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Nav extends Component {
    render() {
        this.repo = this.props.repo;
        this.user = this.props.user;
        this.clones = this.props.clones;
        return (
            <div>
            <h2>Nav</h2>
            <ul>
                {this.props.clones.map(c => <li> {c.label} </li>)}
            </ul>
            </div>
        );
    }
}

class Display extends Component {
    render() {
        let repo = this.props.repo;
        let user = this.props.user;
        let clones = this.props.clones;
        return (
            <div>
                <h2>Display</h2>
                <div>
                    <p>{repo}</p>
                    <p>{user}</p>
                    <p>{clones}</p>
                </div>
            </div>
        );
    }
}

function Head(props) {
    let onselect = function () {
        var selection = document.GetElementById("prselect");
        props.onSelect(selection.options[selection.selectedIndex].value);
    }

    return (
        <div>
        <h2> Head </h2>
        <select id="prselect" onChange={onselect}>
            {props.prs.map(function(pr) {
                return <option value={pr.id}> {pr.id} </option>
            })}
        </select>
        </div>
    )
}

class App extends Component {
    constructor() {
        super();
        this.state = {repo: null, user:null, prs: [], activePR:{id: null, clones: []}};
        let url = window.location.href;
        // determine if url is http(s)://something/something/something
        if (!url.match('https?://[^/]+/[^/]+/[^/]+$')) {
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
        this.state= {
            repo: repo,
            user: user,
            prs: this.getPRs(repo, user),
            activePR: this.state.prs && this.state.prs.length > 0 ?
                        this.state.prs[0] : {id: null, clones: []},
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
        let fetchurl = "/api/" + user + "/" + repo;
        fetch(fetchurl)
            .then(function(response) {
                if (!response.ok) {
                    console.log("response not ok fetching " + fetchurl);
                    return;
                }
                var contentType = response.headers.get("content-type");
                if(contentType && contentType.indexOf("application/json") !== -1) {
                    val = response.json();
                }
                console.log("response not json fetching " + fetchurl);
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
