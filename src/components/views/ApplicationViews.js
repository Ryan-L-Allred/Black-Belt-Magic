import { Outlet, Route, Routes } from "react-router-dom"

export const ApplicationViews = () => {
    return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Welcome to Black Belt Magic!</h1>
					<div>Demystifying martial arts since 2022.</div>

					<Outlet />
				</>
			}>
			</Route>
		</Routes>
	)
}