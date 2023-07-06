import { Link } from 'react-router-dom';
import "../style/Sidebar.css"
import { BiLogOut} from "react-icons/bi";
import {BsArchive} from "react-icons/bs"
import {LuLayoutDashboard} from "react-icons/lu"
import logo from "../../assets/DOH_SEAL_-_FULL_COLOR.png"
import { FaUsers } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Sidebar({showSidebar}) {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    }
  return (
    <div className={`sidebar ${showSidebar ? "hide__sidebar" : ""}`}>
        <div className="sidebar-context">
        <img className="logo" src={showSidebar ? logo1 : logo} alt="website logo" />

        </div>
        <div className="sidebar-links">
                <ul className='show_links'>
                    <li className="links">
                        <Link to="/dashboard" className="link">
                            <LuLayoutDashboard  className='icons'/>
                            Dashboard
                        </Link>
                    </li>  
                    <li className="links">
                        <Link to="/request" className="link">
                            <FaUsers className='icons'/>
                            Request
                        </Link>
                    </li>   
                    <li className="links">
                        <Link to="/archives" className="link">
                        <BsArchive className='icons'/>
                            Archives
                        </Link>
                    </li>
                    <li className="links">
                        <button className="link logout__btn" onClick={() => handleLogout()}>
                            <BiLogOut className='icons'/>
                            Logout
                        </button>
                    </li>
                </ul>
{/* 
        {showSidebar && 
            <ul className='hide_links'>
                <li className="links">
                    <Link to="/dashboard" className="link">
                        <LuLayoutDashboard className="icons"/>
                    </Link>
                </li>
                <li className="links">
                    <Link to="/settings" className="link">
                            <AiOutlineSetting className='icons'/>
                    </Link>
                </li>
                <li className="links">
                    <Link to="/logout" className="link">
                        <BiLogOut className='icons'/>
                    </Link>
                </li>
                
            </ul>
        } */}
        </div>
    </div>
  );
}

export default Sidebar;