import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

export const Layout = () => {
    const [favorites, setFavorites] = useState([]);
    const addFavorite = (item) => {
        if (!favorites.some(fav => fav.uid === item.uid && fav.type === item.type)) {
            setFavorites([...favorites, item]);
        }
    };

    const removeFavorite = (uid, type) => {
        setFavorites(favorites.filter(fav => !(fav.uid === uid && fav.type === type)));
    };

    return (
        <ScrollToTop>
            <Navbar favorites={favorites} removeFavorite={removeFavorite} />
            <Outlet context={{ addFavorite, favorites }} />

            <Footer />
        </ScrollToTop>
    );
};