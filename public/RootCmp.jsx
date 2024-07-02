const Router = ReactRouterDOM.BrowserRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { AppHeader } from "./cmps/AppHeader.jsx";
import { Team } from "./cmps/Team.jsx";
import { Vision } from "./cmps/Vision.jsx";
import { About } from "./pages/About.jsx";
import { UserDetails } from "./pages/UserDetails.jsx";
import { CarDetails } from "./pages/CarDetails.jsx";
import { CarEdit } from "./pages/CarEdit.jsx";
import { CarIndex } from "./pages/CarIndex.jsx";
import { Home } from "./pages/Home.jsx";

export function RootCmp() {

    return (
        <Router>
            <section className="app main-layout">
                <AppHeader />

                <main>
                    <Routes>
                        {/* <Route path="/" element={<Navigate to="/car" />} /> */}
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />}>
                            <Route path="team" element={<Team />} />
                            <Route path="vision" element={<Vision />} />
                        </Route>
                        <Route path="/car/:carId" element={<CarDetails />} />
                        <Route path="/car/edit/:carId" element={<CarEdit />} />
                        <Route path="/car/edit" element={<CarEdit />} />
                        <Route path="/car" element={<CarIndex />} />
                        <Route path="/user/:userId" element={<UserDetails />} />
                    </Routes>
                </main>
            </section>
        </Router>
    )
} 