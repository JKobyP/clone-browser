import React, { Component } from 'react';

function Nav(props) {
  let clones = props.clones;
  return (
      <div>
      <h2>Clones</h2>
      <ul>
      {props.clones.map(c => {
        return (
           <li> ({c.First.Filename}:{c.First.Byte},
             <br />
             {c.Second.Filename}:{c.Second.Byte})
           </li>
           )}
          )}
      </ul>
      </div>
      );
}

function Display(props) {
  let pr = props.pr ? props.pr : {files: [], path: ""};
  console.log(pr);
  return (
      <div>
        <h2>Display</h2>
        <div className="col1">
          <p>{pr.files.map(file => {
            return (<span>
                    Path: {file.path}
                    <br />
                    <pre><code>
                        {window.atob(file.content)}
                    </code></pre></span>
            )})}
          </p>
        </div>
        <div className="col2">
        </div>
      </div>
      );
}

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
export {Nav};
export {Display};
export {Head};
