import './maincontent.css'
import ApiClientPage from './APIClient/ApiClient'
import { createRoot } from 'react-dom/client'
import DatabaseClient from './DatabaseClient/DatabaseClient'
import $ from 'jquery'
import BlobClient from './BlobClient/BlobClient'


let container = null

export default function MainContent() {
    return (
        <main className="maincontentcontainer">
            <div id="title-main" className="main-title">API Client</div>
            <div id="main-content-page-selection" className="main-content-landing-page-container">
                <ApiClientPage />
            </div>
        </main>
    )
}


export function landingPage(e) {
    console.log("landingpage clicked")
    $('li.nav-top-items').removeClass('navItemsVisited')
    $(e.target).addClass('navItemsVisited')

    if (!container) {
        container = createRoot(document.getElementById('main-content-page-selection'))
    }

    container.render(
        <>
            <h2>
                Hello world!!!
            </h2>
        </>
    )
}

export function hello(e) {

    $('li.sidebar-li-items').removeClass('activated')
    $(e.target).addClass('activated')

    var title = document.getElementById("title-main")
    var page = e.target.innerHTML
    title.innerHTML = page

    if (!container) {
        container = createRoot(document.getElementById('main-content-page-selection'))
    }

    if (page == 'API Client') {
        container.render(
            <>
                <ApiClientPage />
            </>
        )
    }

    else if (page == "Database Client") {
        container.render(
            <>
                <DatabaseClient />
            </>
        )
    }
    else {
        container.render(
            <>
                <BlobClient />
            </>
        )
    }
}
