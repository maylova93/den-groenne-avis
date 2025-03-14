import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layout/MainLayout';
import './styles/global.scss'; 
import { HomePage } from './pages/HomePage/HomePage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { SignUpPage } from "./pages/LoginPage/SignUpPage";
import { MinSide } from "./pages/MinSide/MinSide";
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { AnnoncePage } from './pages/AnnoncePage/AnnoncePage';
import { ProductDetail } from "./components/ProductList/ProductDetail";
import { Category } from "./components/KategoriListe/Category";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path='/annonce' element={<AnnoncePage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/min-side" element={<MinSide />} />
                    <Route path="/product/:slug" element={<ProductDetail />} />
                    <Route path="/category/:categorySlug" element={<Category />} />
                    <Route path='/*' element={<ErrorPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
