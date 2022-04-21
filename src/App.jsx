import Styles from './App.module.scss';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from 'react-router-dom';

import HomePage from './routes/HomePage';
import ProductPage from './routes/ProductPage';
// only import this css once for the whole project
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function App() {
    return (
        <Router>
            <main className={Styles.App}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/product/:id"
                        element={<ProductPage />}
                    />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
