//Check Local Storage for token 
import jwt_decode from "jwt-decode";
import { showError } from "./AlertMsg";



export const userAuthenticateToken = () => {
  const token = localStorage.getItem("token");
  const userJSON = localStorage.getItem("user");
  const user: any | null = userJSON ? JSON.parse(userJSON) : null;
  // const id: string || null = user?._id

  if (!token) {
    showError("Please Login Again To Continue");
    setTimeout(() => {
      window.location.href = "/login";
    }, 10000)
    return
  }

  if (token) {
    const decoded: any = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    console.log(currentTime, "THE CURRENT TIME")
    console.log(decoded.exp, "THE DECODED EXP")

    if (decoded.exp < currentTime) {
      //logout user
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      showError("Session Expired, Please Login Again To Continue");
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000)
      return
    }
    return {
      token : token,
      id: user?._id,
      role: user?.role,
      isDisabled: user?.isDisabled,
      merchant_application: user?.merchant_application,
      name: user?.name,
      phone: user?.phone
    }
  }

};

//Authenticating Admin



export const adminTokenAuthentication = () => {
  const token = localStorage.getItem("token");
  const userJSON = localStorage.getItem("user");
  const user: any | null = userJSON ? JSON.parse(userJSON) : null;

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
    const decoded: any = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    console.log(currentTime, "THE CURRENT TIME")
    console.log(decoded.exp, "THE DECODED EXP")

    if (decoded.exp < currentTime) {
      //logout user
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      showError("Session Expired, Please Login Again To Continue");

      window.location.href = "/login";
      //redirect to login
      // setTimeout(() => {
      //   window.location.href = "/login";
      // }, 2000)
      return
    }

    if (user?.role !== 'admin') {
      showError("Unauthorized Access. You are not authorized to access this page")
      window.location.href = "/";
    }
  }

  return token
}





