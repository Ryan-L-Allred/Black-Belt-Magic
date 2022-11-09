import { Outlet, Route, Routes } from "react-router-dom"
import { QuestionList } from "../questions/QuestionList"
import { AnswerForm } from "../answers/AnswerForm"
import { AnswerEdit } from "../answers/AnswerEdit"
import { MartialArtContainer } from "../Martial Arts/MartialArtContainer"

import { MartialArtsInterestList } from "../interests/MartialArtsInterestList"
import "./views.css"

/*
This component renders the website in a way that
*/

export const InstructorViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1 className="title">Welcome to Black Belt Magic!</h1>
					<h2 className="subTitle">Demystifying martial arts since 2022.</h2>

					<Outlet />
				</>

			}>

				<Route path="questions" element={<QuestionList />} />
				<Route path="answer/create" element={<AnswerForm />} />
				<Route path="answers/:answerId/edit" element={<AnswerEdit />} />
				<Route path="martialArts" element={<MartialArtContainer />} />
				<Route path="interests" element={<MartialArtsInterestList />} />
			</Route>
		</Routes>
	)
}