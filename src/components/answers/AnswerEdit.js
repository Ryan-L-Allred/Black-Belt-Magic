import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const AnswerEdit = () => {

    const [answer, assignAnswer] = useState({
        description: "",
        questionId: 0
    })

    const [questionSelect, setQuestionSelect] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/questions`)
                .then(response => response.json())
                .then((questionArray) => {
                    setQuestionSelect(questionArray)
                })
        },
        []
    )
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
                navigate("/questions")
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
                        <div>
                    <select
                        className="question-box"
                        id="question-select"
                        onChange={
                            (evt) => {
                                const copy = { ...answer }
                                copy.questionId = evt.target.value
                                assignAnswer(copy)
                            }}
                        >
                        <option value="0">Select Question</option>
                        {questionSelect.map((questionObject) => {
                            return (
                                <option key={questionObject.id} value={questionObject.id}>
                                    {questionObject.description}
                                </option>
                            )
                        })}
                    </select>
                </div>
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