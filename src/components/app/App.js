import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditPage from '../../pages/EditPage';

import MainPage from '../../pages/MainPage';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<MainPage />} />
                <Route path={'/edit'} element={<EditPage />} />
            </Routes>
        </BrowserRouter>

    );
}

export default App;
