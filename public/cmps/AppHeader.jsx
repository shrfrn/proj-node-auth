const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter

import { UserMsg } from './UserMsg.jsx'
import { userService } from '../services/user.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'

export function AppHeader({ loggedinUser, setLoggedinUser }) {

    const navigate = useNavigate()

    function onLogout() {
        userService.logout()
            .then(()=> {
                setLoggedinUser(null)
                navigate('/auth')
            })
            .catch(err => {
                console.log(err)
                showErrorMsg(`Couldn't logout...`)
            })
    }

    return (
        <header className="app-header full main-layout">
            <h1>React Car App</h1>
            <nav className="app-nav">
                <NavLink to="/" >Home</NavLink>
                <NavLink to="/about" >About</NavLink>
                <NavLink to="/car" >Cars</NavLink>
                {
                    !loggedinUser ? 
                    <NavLink to="/auth" >Login</NavLink> : 
                    <div className="user">
                        <Link to={`/user/${loggedinUser._id}`}>{loggedinUser && loggedinUser.fullname}</Link>
                        <button onClick={onLogout}>logout</button>
                    </div>
                }
            </nav>
            <UserMsg />
        </header>
    )
}
