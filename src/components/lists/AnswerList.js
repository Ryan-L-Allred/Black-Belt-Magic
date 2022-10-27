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
        fetch(`http://localhost:8088/answers`)
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
        {
            blackBeltUserObject.instructor
                ? <>
                    <button onClick={() => navigate("/answer/create")}>Answer a curious future student!</button>
                    
                </>
                : ""
        }    

        <h2>Answer list</h2>

        <article className="answers">
            {
                answers.map(
                    (answer) => {
                        return <>
                            <header>
                                {
                                    blackBeltUserObject.instructor
                                        ? <>
                                        <Link to={`/answers/${answer.id}/edit`}> Answer {answer.id}</Link>
                                        </>
                                        : ""
                                }
                                
                            </header>
                            <section>{answer.description}</section>
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

        