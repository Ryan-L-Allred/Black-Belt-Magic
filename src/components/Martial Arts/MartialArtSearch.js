export const MartialArtSearch = ({ setterFunction }) => {
    return (
        <input 
            onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
            type="text" placeholder="Search for specific art" />
    )
}