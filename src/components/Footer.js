import React from "react"



export default function Footer(props) {

   return (
  
   <div className="footer">
   <p className="score">{props.score}</p>
   {props.finishState && <button className="check-btn" onClick={props.start}>{props.button}</button>}
   {props.startState && <button className="check-btn" onClick={props.checking}>{props.button}</button>}
   {props.check && <button className="check-btn" onClick={props.finish}>{props.button}</button>}
   </div>
   
 )

}
