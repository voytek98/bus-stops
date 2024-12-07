import { Route, Routes, BrowserRouter } from "react-router";
import App from "../App";
import StopsPage from "../pages/stops";

const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/stops" element={<StopsPage />} />
        </Routes>
    </BrowserRouter>
)

export default Router;