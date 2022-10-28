import { Outlet, Route, Routes } from "react-router-dom"
import { QuestionList } from "../lists/QuestionList"
import { QuestionForm } from "../questions/QuestionForm"
import { QuestionEdit} from "../questions/QuestionEdit"
import { AnswerList } from "../lists/AnswerList"
import { MartialArtsList } from "../lists/MartialArtsList"

export const StudentViews = () => {
    return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Welcome to Black Belt Magic!</h1>
					<h2>Demystifying martial arts since 2022.</h2>

					<Outlet />
				</>

			}>
				<Route path="questions" element={ <QuestionList />} />
				<Route path="question/create" element= {<QuestionForm />} />
				<Route path="questions/:questionId/edit" element={<QuestionEdit />}/>
				<Route path="answers" element={ <AnswerList />} />
				<Route path="martialArts" element={ <MartialArtsList />} />
			</Route>
		</Routes>
	)
}