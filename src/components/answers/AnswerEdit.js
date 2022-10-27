import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const AnswerEdit = () => {

    const [answer, assignAnswer] = useState({
        description: "",
    })

    const { answerId } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8088/answers/${answerId}`)
            .then(response => response.json())
            .then((data) => {
                assignAnswer(data)
            })
    }, [answerId])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/answers/${answer.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(answer)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/answers")
            })
    }

    return (
        <form className="answerForm">
            <h2 className="answerForm__title">An eager student has summoned your infinite wisdom!</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Answer:</label>
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
                                assignAnswer(copy)
                            }
                        }/>
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit answer
                </button>
        </form>
    )
}