import { useState } from "react"
import { MartialArtsList } from "../Martial Arts/MartialArtsList"
import { MartialArtSearch } from "../Martial Arts/MartialArtSearch"

export const MartialArtContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <MartialArtSearch setterFunction={setSearchTerms}/>
        <MartialArtsList searchTermState={searchTerms} />
    </>
}