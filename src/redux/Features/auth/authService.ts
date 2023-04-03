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
  console.log("AFTER ")
  return data
}


const authService = {
  login,
}

export default authService
