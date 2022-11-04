import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
             <li className="navbar__item active">
                <Link className="navbar__link" to="/">Homepage</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/questions">Q&A</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/martialarts">List of Martial Arts</Link>
            </li>
            {/* <li className="navbar__item active">
                <Link className="navbar__link" to="/missionstatement">Our Mission</Link>
            </li> */}
            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("black_belt_user")
                    navigate("/", {replace: true})
                }}>Logout</Link>
            </li>
        </ul>
    )
}