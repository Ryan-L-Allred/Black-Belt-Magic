import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

//Here is where the list of questions and answers will be rendered.

//Create the initial state object, in this case the questions object.
export const QuestionList = () => {
    const [questions, setQuestions] = useState([])
    const navigate = useNavigate()


    useEffect(
        () => {
            fetch(`http://localhost:8088/questions`)
                .then(response => response.json())
                .then((questionArray) => {
                    setQuestions(questionArray)
                })
        },
        []
    )

    return <>

        <button onClick={() => navigate("/question/create")}>Ask an instructor!</button>

        <h2>Question list</h2>

        <article className="questions">
            {
                questions.map(
                    (question) => {
                        return <>
                        <header>
                            <Link to={`/questions/${question.id}/edit`}> Question {question.id}</Link>
                        </header>
                        <section>{question.description}</section>
                        
                        </>
                    }
                )
            }
        </article>
    </>
}