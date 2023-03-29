import API_BASEURL from "constants";
import axios from "axios";


export interface RegisterUserProps {
  name: string;
  token: string;
  email: string;
  phone: string;
  password: string;
}

export interface UserProps {
  id: string,
  token: string,
}

export interface UpdateUserProps {
  id: string
  token: string
  name: string
  street: string
  province: string
}

export interface UpdateUserPassword {
  password: any
  id: string;
  token: string;
}

const registerUser = async ({ token, name, email, phone, password }: RegisterUserProps) => {

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post(`${API_BASEURL}/users/register`, { name, email, phone, password }, config);

  return data;
}

const getUsers = async (token: string): Promise<{}> => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    mode: "cors",
  };


  const { data } = await axios.get(`${API_BASEURL}/users`, config);
  return data;
}

const getUser = async ({ id, token }: UserProps) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(`${API_BASEURL}/user/${id}`, config);
  return data
}

const deleteUser = async ({ id, token }: UserProps) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_BASEURL}/user/delete/${id}`, config);
  return response.data
}

const updateUser = async ({ id, password, token }: UpdateUserPassword) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_BASEURL}/users/update/${id}`, {password}, config);
  return response.data
}

const userService = {
  registerUser,
  deleteUser,
  updateUser,
  getUser,
  getUsers
}

export default userService