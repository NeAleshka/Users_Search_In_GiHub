import './App.css'
import './index.css'
import {Route, Routes} from "react-router-dom";
import {Favorite, Main} from './pages'
import NavigationBar from "./components/NavigationBar/NavigationBar";

function App() {

    return (
        <>
            <NavigationBar/>
            <Routes>
                <Route path={'/'} element={<Main/>}/>
                <Route path={'/favorite'} element={<Favorite/>}/>
            </Routes>
        </>
    )
}

export default App
