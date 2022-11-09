import { useEffect, useState } from "react"
import "./interests.css"

//Set the state for the interests.
//Fetch the interests from the database and use expand query on the martialArts id.

export const MartialArtsInterestList = () => {
    const [interests, setInterests] = useState([])

    const getAllInterests = () => {
        fetch(`http://localhost:8088/interests?_expand=martialart`)
            .then(response => response.json())
            .then((interestArray) => {
                setInterests(interestArray)
            })
    }


    useEffect(
        () => {
            getAllInterests()
        },
        []
    )

    return <>

        <h2>List of Interests</h2>

        <article className="interests">
            {
                interests.map(
                    (interest) => {
                        return <section key={interest.id} className="interestList">
                            <div>
                                <img
                                    src={interest?.martialart?.imageUrl}
                                    alt={interest?.martialart?.name}
                                    className="martialArt-img"
                                    width="450px" height="288px"
                                />
                                <section className="name"><b>{interest?.martialart?.name}</b></section>

                                <footer className="interest__footer">
                                    <button onClick={() => {
                                        fetch(`http://localhost:8088/interests/${interest.id}`, {
                                            method: "DELETE"
                                        })
                                            .then(() => {
                                                getAllInterests()
                                            })
                                    }} className="interest__delete">Delete interest</button>
                                </footer>
                            </div>
                        </section>
                    }
                )
            }
        </article>
    </>
}



