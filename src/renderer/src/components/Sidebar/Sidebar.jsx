import { hello } from '../MainContent.jsx'
import './sidebar.css'


function Sidebar() {
    /*
<li className="sidebar-li-items" onClick={hello}>Home</li>
                <li className="sidebar-li-items" onClick={hello}>API Client</li>
                <li className="sidebar-li-items" onClick={hello}>Database Client</li>
                <li className="sidebar-li-items" onClick={hello}>Blob Client</li>
    */

    var sideBarElements = ['Home', 'API Client', 'Database Client', 'Blob Client']
    return (
        <div className="sidebarcontainer">
            <ul className="sidebar-ul">
                {
                    sideBarElements.map((item) =>
                        <li key={item} className="sidebar-li-items" onClick={hello}>{item}</li>)
                }
            </ul>
        </div>
    )
}

export default Sidebar