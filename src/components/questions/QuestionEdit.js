import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const QuestionEdit = () => {

    const [question, assignQuestion] = useState({
        description: "",
    })

    const { questionId } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8088/questions/${questionId}`)
            .then(response => response.json())
            .then((data) => {
                assignQuestion(data)
            })
    }, [questionId])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/questions/${question.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(question)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/questions")
            })
    }

    return (
        <form className="questionForm">
            <h2 className="questionForm__title">An eager instructor awaits your curiosity!</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Question:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder= "example: who am I?"
                        value={question.description}
                        onChange={
                            (evt) => {
                                const copy = { ...question }
                                copy.description = evt.target.value
                                assignQuestion(copy)
                            }
                        }/>
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Question
                </button>
        </form>
    )
}