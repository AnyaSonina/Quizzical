import React from "react"


export default function Start(props) {
    return (
        <main className="start-screen">

          <h1>Quizzical</h1>
          <p>Press the button bellow and start the quiz. Choose 1 answer out of 5 suggested.</p>
          <button onClick={props.toggle} className="start-btn">Start quiz</button>
         
        </main>
    )
}