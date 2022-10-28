import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const MartialArtsList = () => {
    const [martialArts, setMartialArts] = useState([])
    
    useEffect(
        () => {
            fetch(`http://localhost:8088/martialArts?_expand=country&_expand=style&_sort=name`)
                .then(response => response.json())
                .then((martialArtArray) => {
                    setMartialArts(martialArtArray)
                })
        },
        []
    )

    return <>
        
        <h2>Martial Arts from around the globe!</h2>
        <article className="martialArts">
            {
                martialArts.map(
                    (martialArt) => {
                        return <section key={martialArt.id} className="martialArts">
                            <ul>
                                <li>Name: {martialArt.name}</li>
                                <li>Country of Origin: {martialArt.country.name}</li>
                                <li>Focus: {martialArt.style.name}</li>
                                <li>Description: {martialArt.description}</li>
                            </ul>
                        </section>
                    }
                )
            }

        </article>
    </>
}