//Check Local Storage for token 
import jwt_decode from "jwt-decode";
import { showError } from "./AlertMsg";
import { useRouter } from 'next/router'



export const userAuthenticateToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    showError("Please Login Again To Continue");
    //redirect to login
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000)

    return
  }

  if (token) {
    const decoded : any = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      //logout user
      localStorage.removeItem("token");
      localStorage.removeItem("user");
        showError("Session Expired, Please Login Again To Continue");
      //redirect to login
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000)
    }
    return token
  } 
};


//Authenticating Admin

export const adminTokenAuthentication = () =>  {
  //get user from local storage if it exist
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user"); 
  console.log(token, "THE TOKEN OOOO") 

  if (!token) {
    showError("Please Login Again To Continue");
    //redirect to login
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000)
    return
  }

  if (token) {
    const decoded : any = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    console.log(decoded, "THE DECODED")

    if (decoded.exp < currentTime) {
      //logout user
      localStorage.removeItem("token");
      localStorage.removeItem("user");
        showError("Session Expired, Please Login Again To Continue Using CityShoppa");
      //redirect to login
      setTimeout(() => {
        window.location.href = "/admin/login";
      }, 2000)
      return
    }

  }


  // if (!user) {
  //   showError("Please Login Again To Continue");
  //   //redirect to login
  //   window.location.href = "/login";
  //   return
  // }

  return token
}





