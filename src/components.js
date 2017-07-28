import React, { Componenet } from 'react';

function Nav(props) {
        let repo = props.repo;
        let user = props.user;
        let clones = props.clones;
        return (
            <div>
            <h2>Nav</h2>
            <ul>
                {props.clones.map(c => <li> {c.First.Filename} </li>)}
            </ul>
            </div>
        );
}

function Display(props) {
        let repo = props.repo;
        let user = props.user;
        let clones = props.clones;
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

function Head(props) {
    let onselect = function () {
        var selection = document.GetElementById("prselect");
        props.onSelect(selection.options[selection.selectedIndex].value);
    }

    return (
        <div>
        <h2> Head </h2>}
        <select id="prselect" onChange={onselect}>
            {props.prs.map(function(pr) {
                return <option value={pr.id}> {pr.id} </option>
            })}
        </select>
        </div>
    )
}
 export {Nav};
 export {Display};
 export {Head};
