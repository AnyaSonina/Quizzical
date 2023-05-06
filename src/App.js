import React from "react"
import Start from "./components/Start"
import Quiz from "./components/Quiz"
import Footer from "./components/Footer"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"


export default function App() {

  const[toggle, setToggle] = React.useState(true) 

  function swithcScreens(){
   setToggle(toggle => !toggle)
  }

 //**Quiz screen */

 const [quizData, setQuizData] = React.useState([])  
 const [score, setScore] = React.useState()
 const [over, setOver] = React.useState(false)
 const [startGame, setStartGame] = React.useState(true)
 const [button, setButton] = React.useState("Check answers")
  const [check, setCheck] = React.useState(false)
  const [allCorrect, setAllCorrect] = React.useState(false)

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple&encode=url3986")
    .then(res => res.json())
    .then(data => {
      let newData = data.results.map(result => {
        let firstArray = []
        let joinedArray = []
        let changedArr = []
        firstArray.push(result.correct_answer)
        joinedArray = shuffledArr(firstArray.concat(result.incorrect_answers))
        changedArr = joinedArray.map(item => {
            return {
              value: decodeURIComponent(item),
              key:nanoid(),
              id:nanoid(),
              isHeld: false,
              isCorrect: item === result.correct_answer ? true : false
            }
          })
        return {
          key:nanoid(),
          question: decodeURIComponent(result.question),
          correct_answer: result.correct_answer,
          incorrect_answers: result.incorrect_answers,
          id: nanoid(),
          joinedArray: changedArr, 
         
        }
      })
     
      setQuizData(newData)
    })
  }, [over]) 
              
  
  function shuffledArr(arr){
    for(let i =arr.length-1 ; i>0 ;i--){
        let j = Math.floor( Math.random() * (i + 1) ); //random index
        [arr[i],arr[j]]=[arr[j],arr[i]]; // swap
    }
    return arr
  }

  function holdAnswer(objId, asnwerId) { 
    setQuizData((quiz) => {
      return quiz.map((obj) => {
       if(obj.id === objId) {
       return {
        ...obj,
        joinedArray: obj.joinedArray.map((answer) => {
          return answer.id === asnwerId ?
          {...answer, isHeld: !answer.isHeld} :
          {...answer, isHeld: false}
        })
       }
      } else  {
        return obj
      }
       
      })
  })
  }
   

  function start() {   
    setScore("")
    setOver(false)
    setStartGame(true)
   setButton("Check answers")
  }
  
  function gameOver() {
   
    setCheck(false)
    setStartGame(false)
    setScore("")
    setButton("New questions")
    setOver(true) 
  
  }

  function checking() {
    let result = 0 
    let array_length = quizData.length
    quizData.map(quiz => {
     quiz.joinedArray.map(answer => {
      if(answer.isHeld && answer.isCorrect){
        result++
      }       
     })
    })

    if(result === 5) {
      setAllCorrect(true)
    }else{
      setAllCorrect(false)
    }        
    setScore(`You scored ${result}/${array_length} answers correct`)
    setStartGame(false)
    setOver(false)
    setCheck(true)
    setButton("Play Again")
  }


  let quizItems = quizData.map((item) => {
    return (
      
      <div className="quiz_item">
        <Quiz
        key={item.id} 
        question={item.question}     
        answers ={item.joinedArray}
        holdAnswer={holdAnswer}
        quizId = {item.id}
        check = {check}  
      
      />   
     
   
    </div>)

  })

  if(over) {
    
   quizItems=<div className="empty"></div>
  
  }  
  

  return (
    <div >
      {toggle && <Start toggle = {swithcScreens}/>}
      {!toggle &&      
      <main className="quiz-main">
      {quizItems}
      
      <Footer
      finish = {gameOver}
      button={button}
      score={score}
      start={start}
      startState = {startGame}
      finishState = {over}
      checking = {checking}
      check = {check}
      />
      {check && allCorrect ? <Confetti/> : ""}
      <div className="blob-3"></div>
      <div className="blob-4"></div>
      </main>}   
    </div>
  )
}