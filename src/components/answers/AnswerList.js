import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

//Here is where the list of questions and answers will be rendered.

//Create the initial state object, in this case the questions object.
export const AnswerList = () => {
    const [answers, setAnswers] = useState([])
    const navigate = useNavigate()

    const localBlackBeltUser = localStorage.getItem("black_belt_user")
    const blackBeltUserObject = JSON.parse(localBlackBeltUser)

    const getAllAnswers = () => {
        fetch(`http://localhost:8088/answers?_expand=question&_sort=questionId`)
            .then(response => response.json())
            .then((answerArray) => {
                setAnswers(answerArray)
            })
    }
    useEffect(
        () => {
            getAllAnswers()
        },
        []
    )



    return <>


        <h2>Answer list</h2>
        {/* {
            blackBeltUserObject.instructor
                ? <>
                    <button onClick={() => navigate("/answer/create")}>Answer a curious future student!</button>
                </>
                : ""
        } */}
        <article className="answers">
            {
                answers.map(
                    (answer) => {
                        return <>
                            <header>
                                <section>Question: {answer.question.description}</section>
                                <section>Answer: {answer.description}</section>
                                {
                                    blackBeltUserObject.instructor
                                        ? <>
                                            <Link to={`/answers/${answer.id}/edit`}>Edit answer</Link>
                                        </>
                                        : ""
                                }
                            </header>


                            <footer className="answer__footer">
                                <button onClick={() => {
                                    fetch(`http://localhost:8088/answers/${answer.id}`, {
                                        method: "DELETE"
                                    })
                                        .then(() => {
                                            getAllAnswers()
                                        })
                                }} className="answer__delete">Delete Answer</button>
                            </footer>
                        </>
                    }
                )
            }
        </article>
    </>
}



