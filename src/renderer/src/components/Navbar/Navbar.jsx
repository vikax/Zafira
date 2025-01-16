
import './navbar.css'
import $ from 'jquery'

function NavElements() {

    var landingPageElems = ['Home', 'Tools', 'Docs']
    return (
        <nav className="navbarcontainer">
            <ul className="right-menu">
                {
                    landingPageElems.map((item) =>
                        <li className='nav-top-items'>{item}</li>
                    )
                }
            </ul>
            <ul>
                <li className="mid-menu"><input id="search-item-li" type="text"></input></li>
                <li className='li-search-btn'><button className='search-btn'>Search</button></li>
            </ul>
            <ul className="left-menu">
                <li>LogIn</li>
                <li>SignUp</li>
            </ul>
        </nav>
    )
}

function KeepHighlight(e) {
    $('li.nav-top-items').removeClass('navItemsVisited')
    $(e.target).addClass('navItemsVisited')
}

function AlertSome() {
    alert("hiiii")
}

export default NavElements