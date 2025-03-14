import { Outlet } from 'react-router-dom';
import {Nav} from '../components/Nav/Nav'
import { Footer } from '../components/Footer/Footer'

export const MainLayout = () => {

    //opbygning af site
    return (
        <div>
            <Nav />
            <Outlet />
            <Footer />
        </div>
    )
}

