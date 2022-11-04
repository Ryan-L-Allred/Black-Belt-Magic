import { useEffect, useState } from "react"
import "./martialArt.css"


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
                        return <section key={martialArt.id} className="martialArtsList">
                            <ul>
                            <img
                                src={martialArt.imageUrl} 
                                alt={martialArt.name}
                                className="martialArt-img"
                                width="300px" height="192px"
                                />
                                <b><li>Name: {martialArt.name}</li>
                                <li><b>Country of Origin:</b> {martialArt.country.name}</li>
                                <li><b>Focus:</b> {martialArt.style.name}</li>
                                <li className="descriptions"><b>Description:</b> {martialArt.description}</li></b>
                            </ul>
                        </section>
                    }
                )
            }

        </article>
    </>
}
                            