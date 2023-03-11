
import { AuthProps, SignupProps } from './authDTO'

interface userDataProps {
  email: any
  password: any,
  uid: any
  username: any,
  accessToken: any,
}

const signup = async ({ email, password, username }: SignupProps) => {
  let user: any;

}

const login = async ({ email, password }: AuthProps) => {

}

const forgetPassword = async (email: string) => {

}

const logOut = async () => {

}



const authService = {
  signup,
  login,
  forgetPassword,
  logOut
}

export default authService
