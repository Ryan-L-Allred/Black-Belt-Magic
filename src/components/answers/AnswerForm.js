import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./answers.css"

export const AnswerForm = () => {

    const [answer, update] = useState({
        description: "",
        questionId: 1
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

    const navigate = useNavigate()

    const localBlackBeltUser = localStorage.getItem("black_belt_user")
    const blackBeltUserObject = JSON.parse(localBlackBeltUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const answerToSendToAPI = {
            userId: blackBeltUserObject.id,
            description: answer.description,
            questionId: answer.questionId
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
                navigate("/questions")
            })
    }

    return (
        <form className="answerForm">
            <h2 className="answerForm__title">A curious student requests your infinite wisdom!</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description" className="answer"><b>Answer</b></label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="example: Jackie Chan"
                        value={answer.description}
                        onChange={
                            (evt) => {
                                const copy = { ...answer }
                                copy.description = evt.target.value
                                update(copy)
                            }
                        } />
                    <label htmlFor="questionId" className="questionSelectBox"><b>Question</b></label>
                </div>
                <div>
                    <select
                        className="question-box"
                        id="question-select"
                        onChange={
                            (evt) => {
                                const copy = { ...answer }
                                copy.questionId = evt.target.value
                                update(copy)
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
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn-primary">
                Submit Answer
            </button>
        </form>
    )
}