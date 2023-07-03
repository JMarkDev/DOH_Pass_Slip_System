import React, { useState, useEffect } from 'react';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useLocation } from 'react-router-dom';
import '../style/Navbar.css';

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/request': 'Request',
  '/archive': 'Archive',
};

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

function Navbar({ showSidebar, handleSidebarToggle }) {
  const location = useLocation();
  const pageTitle = pageTitles[location.pathname];
  const [dateNow, setDateNow] = useState('');

  useEffect(() => {
    const today = new Date();
    const month = monthNames[today.getMonth()];
    const date = month + ' ' + today.getDate() + ', ' + today.getFullYear();

    function getHours() {
      const options = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      };

      return today.toLocaleString('en-US', options);
    }

    const time = getHours();
    setDateNow(date + ' ' + time);
  }, []);

  return (
    <div className={`nav__dashboard ${showSidebar ? 'nav__dashboard1' : ''}`}>
      <div className="burger">
        <RxHamburgerMenu className="burger__icon" onClick={handleSidebarToggle} />
        <h3 className="nav_title">{pageTitle}</h3>
      </div>
      <div className="search">
        <span className="nav__icon search__icon">
          <p>{dateNow}</p>
        </span>
        <span className="nav__icon notification__icon">
          <IoIosNotificationsOutline />
        </span>
      </div>
    </div>
  );
}

export default Navbar;
