import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const QuestionForm = () => {

    const [question, update] = useState({
        description: "",  
    })

    const navigate = useNavigate()

    const localBlackBeltUser = localStorage.getItem("black_belt_user")
    const blackBeltUserObject = JSON.parse(localBlackBeltUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault() //This prevents the button from completely refetching the page.

        const questionToSendToAPI = {
            userId: blackBeltUserObject.id,
            description: question.description,
        }

        return fetch(`http://localhost:8088/questions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(questionToSendToAPI)
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
                    <label htmlFor="description"><b>Question:</b></label>
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
                                update(copy)
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