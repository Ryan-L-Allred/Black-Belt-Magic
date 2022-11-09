import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const InterestForm = () => {
    const [interest, setInterest] = useState({
        martialartId: 1
    })
    const [martialartSelect, setMartialartSelect] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/martialarts`)
                .then(response => response.json())
                .then((martialartArray) => {
                    setMartialartSelect(martialartArray)
                })
        },
        []
    )

    const navigate = useNavigate

    const localBlackBeltUser = localStorage.getItem("black_belt_user")
    const blackBeltUserObject = JSON.parse(localBlackBeltUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const interestToSendToAPI = {
            userId: blackBeltUserObject.id,
            martialartId: interest.martialartId
        }

        return fetch(`http://localhost:8088/interests`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(interestToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/martialArts")
            })
        }
        
        return (
            <form>
                <fieldset>

                </fieldset>
            </form>
        )
    
}