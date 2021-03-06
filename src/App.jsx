import Styles from './App.module.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './routes/HomePage';
import ProductsPage from './routes/ProductsPage';
import ProductPage from './routes/ProductPage';

// only import this css once for the whole project
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

// Utility component to run some server code:
import SeedServer from './server/SeedServer';
import NavBar from './components/NavBar';
import Cart from './routes/Cart/Cart';

function App() {
    return (
        <Router basename="/ecommerce-project">
            <NavBar />
            <main className={Styles.App}>
                <Routes>
                    {/* home page displays links to categories and favourited products */}
                    <Route path="/" element={<HomePage />} />

                    {/* shopping cart route */}
                    {/* displays a list of items added to the cart and allows the user to change quantity and remove items */}
                    <Route path="/cart" element={<Cart />} />

                    {/* page that displays grid of products and featured products */}
                    <Route path="/:category" element={<ProductsPage />} />

                    {/* page displays more information on individual products */}
                    <Route path="/:category/:id" element={<ProductPage />} />

                    {/* page for dev to populate database */}
                    {/* <Route
                        path="/seedProducts"
                        element={<SeedServer />}
                    /> */}
                </Routes>
            </main>
        </Router>
    );
}

export default App;
