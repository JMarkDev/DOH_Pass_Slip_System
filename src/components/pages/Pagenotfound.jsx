import React from 'react'
import errorImg from "../../assets/images/404-error.jpg"

function Pagenotfound() {
  return (
    <>
        <img src={errorImg} alt="page not found" style={{width: '100vw', height: '100vh'}}/>
    </>
  )
}

export default Pagenotfound