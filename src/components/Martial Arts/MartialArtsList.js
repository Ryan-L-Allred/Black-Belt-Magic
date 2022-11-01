import { useEffect, useState } from "react"


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
                            <img
                                src={martialArt.imageUrl} 
                                alt={martialArt.name}
                                className="martialArt-img"
                                width="315px" height="192px"
                                />
                                <li>Name: {martialArt.name}</li>
                                <li>Country of Origin: {martialArt.country.name}</li>
                                <li>Focus: {martialArt.style.name}</li>
                                <li>Description: {martialArt.description}</li>
                            </ul>
                            {/* <button>Add to interests</button> */}
                        </section>
                    }
                )
            }

        </article>
    </>
}
                            