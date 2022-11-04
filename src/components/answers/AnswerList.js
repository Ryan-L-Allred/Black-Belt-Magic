import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import "./answers.css"

//Here is where the list of questions and answers will be rendered.

//Create the initial state object, in this case the questions object.
export const AnswerList = () => {
    const [answers, setAnswers] = useState([])

    

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


        <h2 className="answerTitle">Answer list</h2>
        
        <article className="answers">
            {
                answers.map(
                    (answer) => {
                        return <section key={answer.id} className="answerList">
                            <div>
                            <section><b>Question:</b> {answer?.question?.description}</section>
                            <section><b>Answer:</b> {answer.description}</section>
                            
                            {
                                blackBeltUserObject.instructor
                                    ? <div className="editAnswerLink">
                                        <Link to={`/answers/${answer.id}/edit`}>Edit answer</Link>
                                    </div>
                                    : ""
                            }
                            
                            <footer className="answer__footer">
                                {
                                    blackBeltUserObject.instructor
                                        ? <button onClick={() => {
                                            fetch(`http://localhost:8088/answers/${answer.id}`, {
                                                method: "DELETE"
                                            })
                                                .then(() => {
                                                    getAllAnswers()
                                                })
                                        }} className="answer__delete">Delete Answer</button>
                                        : ""
                                }

                            </footer>
                            </div>
                        </section>
                    }
                )
            }
        </article>
    </>
}






