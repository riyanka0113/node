import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import jwtDecode from "jwt-decode"
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import ContactList from '../pages/ContactList'
import CreateContact from '../pages/CreateContact'
import axios from 'axios'

const Router = () => {
  const [check, setCheck] = useState(false);
  const token = localStorage.getItem("Access");

  const isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn("access token expired");
      return false;
    }

    return true;
  };

  useEffect(() => {

    if (isAuthTokenValid(token)) {
      setCheck(true)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    } else {
      setCheck(false)
    }
  }, [token])



  return (
    <Routes>
      {!check ? (<>

        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </>) : (
        <>
          <Route path='/home' element={<ContactList />} />
          <Route path="/create" element={<CreateContact />} />
          <Route
            path="*"
            element={<Navigate to="/home" replace />}
          />
        </>
      )}
    </Routes>
  )
}

export default Router