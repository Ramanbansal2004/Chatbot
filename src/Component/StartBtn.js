import React from 'react'

export default function StartBtn(props) {

    const initialAction = () => {
        props.actions.initialAction();
    }

    return (
        <div>
            <button className="btn btn-primary mx-1" onClick={() => initialAction()}>Let's Get Started</button>
        </div >
    )
}