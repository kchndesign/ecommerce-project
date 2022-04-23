import Styles from './App.module.scss';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';

import HomePage from './routes/HomePage';
import ProductsPage from './routes/ProductsPage';
import ProductPage from './routes/ProductPage';

// only import this css once for the whole project
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

// Utility component to run some server code:
import SeedServer from './server/SeedServer';
import NavBar from './components/NavBar';

function App() {
    return (
        <Router>
            <NavBar />
            <main className={Styles.App}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/:category"
                        element={<ProductsPage />}
                    />
                    <Route
                        path="/:category/:id"
                        element={<ProductPage />}
                    />

                    <Route
                        path="/seedProducts"
                        element={<SeedServer />}
                    />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
