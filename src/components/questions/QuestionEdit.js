import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const QuestionEdit = () => {

    const [question, assignQuestion] = useState({
        description: "",
    })

    const { questionID } = useParams()//questionID defined in the route path. This object's name must match the object created in the route path.

    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8088/questions/${questionID}`)
            .then(response => response.json())
            .then((data) => {
                assignQuestion(data)
            })
    }, [questionID])//Any time questionId changes, this fetch call will run. This changes by updating the question.

    const handleSaveButtonClick = (event) => {
        event.preventDefault()//This prevents the button from completely refetching the page.

        return fetch(`http://localhost:8088/questions/${question.id}`, {
            method: "PUT", //The PUT method requests that the target resource create or update its state with the state defined by the representation enclosed in the request
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
                            (evt) => {//This captures the change event
                                const copy = { ...question } //Create copy of existing state, i.e. the question array
                                copy.description = evt.target.value //This modifies the new copy. And is whats currently in the input field. We get this through the changeEvent.
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