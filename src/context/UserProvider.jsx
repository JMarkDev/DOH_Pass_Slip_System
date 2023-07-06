import React, { useState, useEffect } from 'react'
import UserContext from './UserContext'

function UserProvider({children}) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        // Load user details from localStorage
        const storedUser = JSON.parse(localStorage.getItem(user))
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }, []);
    
      useEffect(() => {
        // Save user details to localStorage whenever it changes
        if (user) {
            console.log(user)
          localStorage.setItem('user', JSON.stringify(user));
        }
      }, []);
      return (
        <UserContext.Provider value={{ user, setUser }}>
          {children}
        </UserContext.Provider>
      );
}

export default UserProvider