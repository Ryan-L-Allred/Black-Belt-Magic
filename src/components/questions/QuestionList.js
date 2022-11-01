import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AnswerList } from "../answers/AnswerList"

//Here is where the list of questions will be rendered.

//Create the initial state object, in this case the questions object.

/*
useState is a react hook. This hook serves as a function that contains an array through destructuring. The array contains an empty array,
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
    Stored the fetch call inside of a function so that I could pass it through the useEffect,
    as well as the DELETE fetch call.
    */

    const getAllQuestions = () => {
        fetch(`http://localhost:8088/questions`)
            .then(response => response.json())
            .then((questionArray) => {
                setQuestions(questionArray)
            })
    }
    //useEffect watches for state change.
    //The array is the state that we want to observe.
    //The function is what we want to do when that observed state changes
    useEffect(
        () => {
            getAllQuestions()
        },
        [] //and empty dependency will watch for the initial render of the component and only run the callback on that initial run. It only runs once.

        /*
           If I were to put the questions array in the dependency array, anytime the value of questions changes, the function will run. 
           In this case it would make a fetch call every time questions changes.
       */
    )



    return <>
        {
            blackBeltUserObject.instructor //This makes it to where only a student user can create and edit a question object
                ?
                <button onClick={() => navigate("/answer/create")}>Answer a curious future student!</button>
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
                            </header>
                            <section>Question {question.id}</section>
                            <section>{question.description}</section>
                            { /*
                                Conditional statement that specifies which user is supposed to have a link that navigates
                                to the edit page for a question.
                                */
                                blackBeltUserObject.instructor
                                    ?
                                    ""
                                    : <>
                                        <Link to={`/questions/${question.id}/edit`}> Edit question</Link>
                                    </>
                            }
                            <footer className="question__footer">
                                {
                                    /*
                                      This fetch call retrieves the specific data that I want to remove from the database.
                                      Since permanent change is being changed, I need to get the rest of the information.
                                    */
                                }
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
        </article>
        <AnswerList />
    </>
}












