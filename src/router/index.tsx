import { Route, Routes, BrowserRouter } from "react-router";
import HomePage from "../pages/home";
import StopsPage from "../pages/stops";

const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stops" element={<StopsPage />} />
        </Routes>
    </BrowserRouter>
)

export default Router;