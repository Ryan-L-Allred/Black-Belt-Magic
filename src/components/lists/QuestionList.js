import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

//Here is where the list of questions and answers will be rendered.

//Create the initial state object, in this case the questions object.
export const QuestionList = () => {
    const [questions, setQuestions] = useState([])
    const navigate = useNavigate()

    const localBlackBeltUser = localStorage.getItem("black_belt_user")
    const blackBeltUserObject = JSON.parse(localBlackBeltUser)

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
        []
    )



    return <>

        {
            blackBeltUserObject.instructor
                ?
                ""
                : <>
                    <button onClick={() => navigate("/question/create")}>Ask an instructor!</button>
                </>
        }

        <h2>Question list</h2>

        <article className="questions">
            {
                questions.map(
                    (question) => {
                        return <>
                            <header>
                                {
                                    blackBeltUserObject.instructor
                                        ?
                                        ""
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
                        </>
                    }
                )
            }
        </article>
    </>
}
                            

