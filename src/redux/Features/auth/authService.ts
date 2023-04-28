import API_BASEURL  from "constants";
import axios from "axios";


import { AuthProps, SignupProps } from './authDTO'


const login = async ({email, password}: AuthProps) => {
  const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("BEFORE ")

  const {data} = await axios.post(`${API_BASEURL}/users/login`, {email, password}, config);
  return data
}

const forgetPassword = async (email: string) => {
  const config = {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
    };

  const {data} = await axios.post(`${API_BASEURL}/users/forgot-password`,{email}, config);
  console.log(data, "entered")
  return data
}

export const resetPassword = async ({token, id, newPassword} : any) => {
  const config = {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
    };

  const {data} = await axios.post(`${API_BASEURL}/users/resetpassword/${id}/${token}`, {newPassword},  config);
  return data
}



const authService = {
  login,
  forgetPassword,
}

export default authService
