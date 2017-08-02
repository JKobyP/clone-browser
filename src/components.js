import React, { Component } from 'react';
var Highlight = require('react-highlight')
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
  return (
      <div>
      <h2>Clones</h2>
      <ul>
      {props.clones.map(c =>
          <Clone clone={c} onCloneSelect={props.onCloneSelect} />)}
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
    let section = rawcontent.substring(props.start, props.end);
    section = window.atob(section);
    start = content.indexOf(section);
    end = start + section.length;
    code =   (<Highlight className="c" innerHTML={true} element={element}>
        {(<pre><code>{content.substring(0,start)}<mark>
                    {content.substring(start,end)}</mark>
                    {content.substring(end)}</code></pre>).render()}
                </Highlight>);
  }
  return (
        <div>
          <h2> CodeView </h2>
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
                    file.path == clone.First.Filename.substring(1)); // fix this server side
  first = first ? first : emptyFile;
  let second = pr.files.find(file =>
                    file.path == clone.Second.Filename.substring(1));
  second = second ? second : emptyFile;
  return (
      <div>
        <h2>Display</h2>
        <div className="col1">
          <p><CodeView 
                file={first}
                start={clone.First.Byte}
                end={clone.First.End}
            />
          </p>
        </div>
        <div className="col2">
          <p><CodeView
                file={second}
                start={clone.Second.Byte}
                end={clone.Second.End}
            />
          </p>
        </div>
      </div>
      );
}

export {Nav};
export {Display};
export {Head};
