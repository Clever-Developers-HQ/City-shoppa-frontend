//Check Local Storage for token 
import jwt_decode from "jwt-decode";
import { showError } from "./AlertMsg";
import { useRouter } from 'next/router'



export const userAuthenticateToken = () => {
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmUwMjA4NzkxMGMyYmY1ZWNkYmYzZCIsImlhdCI6MTY3Nzk2MTc2NCwiZXhwIjoxNjc4ODI1NzY0fQ.jio-31uksQiPxeVzO6orysRFLUPHjB4nO0KoeX3mMtA"
  const token = localStorage.getItem("token");
  // localStorage.setItem("token", token)
  if (!token) {
    showError("Please Login Again To Continue");
    setTimeout(() => {
      window.location.href = "/login";
    }, 10000)

    return
  }

  if (token) {
    const decoded : any = jwt_decode(token);

    if ( Date.now() >= decoded.exp * 1000) {
      //logout user
      localStorage.removeItem("token");
      localStorage.removeItem("user");
        showError("Session Expired, Please Login Again To Continue");
      //redirect to login
      setTimeout(() => {
        window.location.href = "/login";
      }, 5000)
    }
    return token
  } 
};


//Authenticating Admin

export const adminTokenAuthentication = () =>  {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user"); 

  if (!token) {
    //redirect to login
      window.location.href = "/login";
    showError("Please Login Again To Continue");

    setTimeout(() => {
      window.location.href = "/login";
    }, 2000)

    return
  }

  if (token) {
    const decoded : any = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    console.log(currentTime,  "THE CURRENT TIME")
    console.log(decoded.exp, "THE DECODED EXP")

    if (decoded.exp < currentTime) {
      //logout user
      localStorage.removeItem("token");
      localStorage.removeItem("user");
        showError("Session Expired, Please Login Again To Continue");
      
        //redirect to login
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000)
      return
    }
  }

  return token
}





