import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./martialArt.css"

export const MartialArtsList = ({ searchTermState }) => {
    const [martialArts, setMartialArts] = useState([])
    const [styles, setStyles] = useState([])
    const [selectedStyle, setSelectedStyle] = useState(0)
    const [filteredMartialArts, setFilteredMartialArts] = useState([])

    useEffect(
        () => {
            const searchedMartialArts = martialArts.filter(martialArt => {
                return martialArt.name.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFilteredMartialArts(searchedMartialArts)
        },
        [ searchTermState ]
    )
    
    const getAllMartialarts = () => {
        fetch(`http://localhost:8088/martialArts?_expand=country&_expand=style&_sort=name`)
            .then(response => response.json())
            .then((martialArtArray) => {
                setMartialArts(martialArtArray)
            })
    }

    const navigate = useNavigate()

    

    useEffect(
        () => {
            getAllMartialarts()

            fetch(`http://localhost:8088/styles`)
                .then(response => response.json())
                .then((styleArray) => {
                    setStyles(styleArray)
                })
        },
        []
    )

    useEffect(() => {
        if (selectedStyle === 0) {
            setFilteredMartialArts(martialArts)
        } else {
            const martialArtStyles = martialArts.filter((martialArt) => martialArt.styleId === selectedStyle)
            setFilteredMartialArts(martialArtStyles)
        }
    }, [selectedStyle, martialArts])



    const localBlackBeltUser = localStorage.getItem("black_belt_user")
    const blackBeltUserObject = JSON.parse(localBlackBeltUser)

    return <>
        <h2>Martial Arts from around the globe!</h2>
        <article className="martialArts">
            <div className="filter">
                <select
                    className="filter-select"
                    id="style-select"
                    onChange={(event) => {
                        setSelectedStyle(parseInt(event.target.value))
                    }}
                >
                    <option key="0" value="0">Focus</option>
                    {
                        styles.map((style) => {
                            return (
                                <option key={style.id} value={style.id}>{style.name}</option>
                            )
                        })
                    }
                </select>
            </div>

            {
                filteredMartialArts.map(
                    (martialArt) => {
                        return <section key={martialArt.id} className="martialArtsList">
                            <ul>
                                <img
                                    src={martialArt.imageUrl}
                                    alt={martialArt.name}
                                    className="martialArt-img"
                                    width="450px" height="288px"
                                />
                                <li><b>Name: {martialArt.name}</b></li>
                                <li><b>Country of Origin: {martialArt.country.name}</b></li>
                                <li><b>Focus: {martialArt.style.name}</b></li>
                                <li className="descriptions"><b>Description: {martialArt.description}</b></li>
                            </ul>
                            <div>
                                <button onClick={() => {
                                    fetch(`http://localhost:8088/interests`, {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({
                                            userId: blackBeltUserObject.id,
                                            martialartId: martialArt.id
                                        })
                                    })
                                        .then(response => response.json())
                                        .then(() => {
                                            getAllMartialarts()
                                            navigate("/martialArts")
                                        })
                                }}>
                                    Add to Interests
                                </button>
                            </div>
                        </section>
                    }
                )
            }
        </article>
    </>
}






