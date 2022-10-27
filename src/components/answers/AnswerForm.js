import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const AnswerForm = () => {

    const [answer, update] = useState({
        description: ""
    })

    const navigate = useNavigate()

    const localBlackBeltUser = localStorage.getItem("black_belt_user")
    const blackBeltUserObject = JSON.parse(localBlackBeltUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const answerToSendToAPI = {
            userId: blackBeltUserObject.id,
            description: answer.description
        }

        return fetch(`http://localhost:8088/answers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(answerToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/answers")
            })
    }

    return (
        <form className="answerForm">
            <h2 className="answerForm__title">An eager instructor awaits your curiosity!</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Answers:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder= "example: who am I?"
                        value={answer.description}
                        onChange={
                            (evt) => {
                                const copy = { ...answer }
                                copy.description = evt.target.value
                                update(copy)
                            }
                        }/>
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Answer
                </button>
        </form>
    )
}