import React from "react";

const Header = ({ activePage, setActivePage, disabled }) =>
{
    return (
        <header className={`${activePage === "collection" ? "active" : "inactive"} ${disabled ? "disabled-nav" : ""}`}>
            <nav>
                <ul>
                    <li 
                        onClick={() => !disabled && setActivePage("home")} 
                        className={activePage === "home" ? "active" : "inactive"}
                    >STRONA GŁÓWNA
                    </li>
                    <li 
                        onClick={() => !disabled && setActivePage("collection")} 
                        className={activePage === "collection" ? "active" : "inactive"}
                    >KOLEKCJA KSIĄŻEK
                    </li>
                    <li 
                        onClick={() => !disabled && setActivePage("list")} 
                        className={activePage === "list" ? "active" : "inactive"}
                    >LISTA ŻYCZEŃ
                    </li>
                    <li 
                        onClick={() => !disabled && setActivePage("contact")} 
                        className={activePage === "contact" ? "active" : "inactive"}
                    >KONTAKT
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;