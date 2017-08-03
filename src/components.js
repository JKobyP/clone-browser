import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import './codetheme.css'

var emptyClone = {  First: {Filename: "", Byte: 0, End: 0},
                    Second: {Filename: "", Byte: 0, End: 0}
                };
var emptyFile = { path: "", content: "" };

function Head(props) {
  let onselect = function () {
    var selection = document.GetElementById("prselect");
    props.onSelect(selection.options[selection.selectedIndex].value);
  }

  return (
      <div>
      <p>Repository: {props.user}/{props.repo}</p>
        Pull Request (by ID):
        <select id="prselect" onChange={onselect}>
          {props.prs.map(function(pr) {
            return <option key={pr.id} value={pr.id}> {pr.id} </option>
                                  })}
        </select>
      </div>
      )
}

function Nav(props) {
  let clones = props.clones;
  let activeClone = props.activeClone
  return (
      <div>
      <h2>Clones</h2>
      <ul>
      {props.clones.map((c,index) =>
          <div key={index} className={activeClone && c == activeClone ? "active" : ""}>
            <Clone
                 clone={c}
                 onCloneSelect={props.onCloneSelect} />
          </div>
                 )}
      </ul>
      </div>
      );
}

function Clone(props) {
    let onselect= function() {
        props.onCloneSelect(props.clone)
    }
    let c = props.clone
    return (
          <li onClick={onselect}> ({c.First.Filename}:{c.First.Byte},
             <br />
             {c.Second.Filename}:{c.Second.Byte})
           </li>
        )
}

function CodeView(props) {
  let rawcontent = props.file.content
  let content = rawcontent == "" ? "" : window.atob(props.file.content);
  let code= <pre><code>{content}</code></pre>;
  let element = <span></span>
  let start = 0;
  let end = 0;
  if (rawcontent != "") {
    start = content.lastIndexOf("\n", props.start/2) + 1; // dividing by two as a rough conversion from bytes to UTF-16
    end = content.indexOf("\n", props.end/2);
    code =   (<div className="CodeView">
                <SyntaxHighlighter language={"c"}>
                    {content.substring(0,start)}
                </SyntaxHighlighter>
                <mark>
                <SyntaxHighlighter language={"c"} customStyle={{backgroundColor: "yellow"}}>
                    {content.substring(start,end)}
                </SyntaxHighlighter>
                </mark>
                <SyntaxHighlighter language={"c"}>
                    {content.substring(end)}
                </SyntaxHighlighter>
              </div>);
  }
  return (
        <div>
          Path: {props.file.path}
          <br />
            {element}
            {code}
        </div>
      )
}


function Display(props) {
  let clone = props.selectedClone ? props.selectedClone : emptyClone;
  let pr = props.pr ? props.pr : {files: [], path: ""};
  let first = pr.files.find(file =>
                    file.path == clone.First.Filename);
  first = first ? first : emptyFile;
  let second = pr.files.find(file =>
                    file.path == clone.Second.Filename);
  second = second ? second : emptyFile;
  return (
      <div>
        <div className="col1">
          <CodeView
                file={first}
                start={clone.First.Byte}
                end={clone.First.End}
            />
          
        </div>
        <div className="col2">
          <CodeView
                file={second}
                start={clone.Second.Byte}
                end={clone.Second.End}
            />
          
        </div>
      </div>
      );
}

export {Nav};
export {Display};
export {Head};
