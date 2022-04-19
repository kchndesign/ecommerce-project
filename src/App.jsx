import Styles from './App.module.scss';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from 'react-router-dom';
import HomePage from './routes/HomePage';
import ProductPage from './routes/ProductPage';
import NavBar from './components/NavBar';
// only import this css once for the whole project
import 'react-loading-skeleton/dist/skeleton.css';

function App() {
    return (
        <Router>
            <div className={Styles.App}>
                <NavBar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/product/:id"
                        element={<ProductPage />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
