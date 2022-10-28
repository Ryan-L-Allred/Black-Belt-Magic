import { Outlet, Route, Routes } from "react-router-dom"
import { QuestionList } from "../lists/QuestionList"
import { AnswerList } from "../lists/AnswerList"
import { AnswerForm } from "../answers/AnswerForm"
import { AnswerEdit} from "../answers/AnswerEdit"
import { MartialArtsList } from "../lists/MartialArtsList"


/*
This component renders the website in a way that
*/

export const InstructorViews = () => {
    return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Welcome to Black Belt Magic!</h1>
					<h2>Demystifying martial arts since 2022.</h2>

					<Outlet />
				</>

			}>
				
				<Route path="questions" element={ <QuestionList /> } />
				<Route path="answers" element={ <AnswerList />} />
				<Route path="answer/create" element= {<AnswerForm />} />
				<Route path="answers/:answerId/edit" element={<AnswerEdit />}/>
				<Route path="martialArts" element={ <MartialArtsList />} />
			</Route>
		</Routes>
	)
}