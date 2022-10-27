import { Outlet, Route, Routes } from "react-router-dom"
import { InstructorViews } from "./InstructorViews"
import { StudentViews } from "./StudentViews"

export const ApplicationViews = () => {
    const localBlackBeltUser = localStorage.getItem("black_belt_user")
	const blackBeltUserObject = JSON.parse(localBlackBeltUser)

	if (blackBeltUserObject.instructor) {
		return <InstructorViews />
	}
	else {
		return <StudentViews />
	}
		
}