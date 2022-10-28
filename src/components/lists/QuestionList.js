import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AnswerList } from "../lists/AnswerList"

//Here is where the list of questions will be rendered.

//Create the initial state object, in this case the questions object.

/*
useState is a react hook. This hook serves as a function that contains an array through destructuring. The array contains and empty array,
in this case "questions". The questions array is the initial state value. setQuestions is a function that is used to change and update state. 
*/
export const QuestionList = () => {
    const [questions, setQuestions] = useState([])
    const navigate = useNavigate()

    /*
    The localBlackBeltUser function grabs the user info from the local storage, and then 
    the blackBeltUserObject function parses that user info into javascript in order to be used as an object.
    */
    const localBlackBeltUser = localStorage.getItem("black_belt_user")
    const blackBeltUserObject = JSON.parse(localBlackBeltUser)

    /*
    Stored the fetch call inside of a function so that I could pass it through the useEffect
    */

    const getAllQuestions = () => {
        fetch(`http://localhost:8088/questions`)
            .then(response => response.json())
            .then((questionArray) => {
                setQuestions(questionArray)
            })
    }


    useEffect(
        () => {
            getAllQuestions()
        },
        [] //and empty dependency wil lwatch for the initial render of the component and only run the callback on that initial run. 
        //It only runs once.
    )



    return <>
        {
            blackBeltUserObject.instructor //This makes it to where only a student user can create and edit a question object
                ?
                ""
                : <>
                    <button onClick={() => navigate("/question/create")}>Ask an instructor!</button>
                </>
        }

        <h2>Question list</h2>

        <article className="questions">
            {
                /*
                This iterates through the array of questions, and returns a copy of all of those objects which
                are rendered with JSX. Curly braces are needed when vanilla javascript is used in JSX.
                */
                questions.map(
                    (question) => {
                        return <section key={question.id}>
                            <header>
                                
                                {
                                    blackBeltUserObject.instructor
                                        ?
                                        <div>Question {question.id}</div>
                                        : <>
                                            <Link to={`/questions/${question.id}/edit`}> Question {question.id}</Link>
                                        </>
                                }
                            </header>
                            <section>{question.description}</section>
                            
                            <footer className="question__footer">
                                <button onClick={() => {
                                    fetch(`http://localhost:8088/questions/${question.id}`, {
                                        method: "DELETE"
                                    })
                                        .then(() => {
                                            getAllQuestions()
                                        })
                                }} className="question__delete">Delete Question</button>
                            </footer> 
                         </section>
                    }
                )
            } 
            <section><AnswerList /></section>
        </article>
    </>
}   
                           
                        




