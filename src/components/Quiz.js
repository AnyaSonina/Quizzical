import React from "react"


export default function Quiz(props) {

let renderAnswers = props.answers.map(answer => {
  const styles = {
    backgroundColor: props.check && answer.isCorrect ? "#94D7A2" : !answer.isCorrect && props.check && answer.isHeld  ? "#ff00008d" 
    : answer.isHeld ? "#D6DBF5" : "transparent",
    opacity: props.check && !answer.isCorrect ? "0.5" : "1",
    border:   props.check && answer.isCorrect ? "none" : !props.isCorrect && props.check && answer.isHeld  ? "none" :answer.isHeld  ? "none" : "1px solid #293264"
  
  }
  const answersHTML = <button key={answer.key} style = {styles} id ={answer.id} onClick = {()=>props.holdAnswer(props.quizId, answer.id)}  className ={answer.isHeld ? "quiz-answer__isHeld" : "quiz-answer" }>{answer.value}</button>
  return answersHTML 
})

   return (
    <>  
   <div className="questions-container">
   <h3 className="quiz-h3">{props.question}</h3>
   </div>
   <div className="btns-container">{renderAnswers}</div>
   </>
   
 )

}