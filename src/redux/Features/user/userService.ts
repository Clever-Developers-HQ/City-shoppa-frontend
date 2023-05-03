import API_BASEURL from "constants";
import axios from "axios";

console.log(API_BASEURL, "THE BASE API")
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

export interface UpdateUser {
  id: string;
  token: string;
  role: string;
  business_name: string
  website:string;
  address:string
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

  const { data } = await axios.get(`${API_BASEURL}/users/${id}`, config);
  return data
}

const deleteUser = async ({ id, token }: UserProps) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const {data} = await axios.delete(`${API_BASEURL}/users/${id}`, config);
  return data
}

const updateUser = async ({ phone, isDisabled, name, email, merchant_application, id, role, token, business_name, address, website }: any) => {
  const data = {
    role,
    business_name,
    address,
    website,
    merchant_application,
    phone, 
    name, 
    email,
    isDisabled,
  }
  console.log(id ,"ID")
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    console.log("enteed before")
    const response = await axios.put(`${API_BASEURL}/users/update/${id}`, data , config);
    console.log("enteed after", response)
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update user.");
  }
}


const reactivateUser = async ({id, token}: UserProps) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_BASEURL}/users/reactivateuser/${id}`, {}, config);
  console.log(response, "THE RESPONSE BACK")
  return response.data
}


const disableUser = async ({id, token}: UserProps) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_BASEURL}/users/disableuser/${id}`, {}, config);
  return response.data
}


const userService = {
  registerUser,
  deleteUser,
  updateUser,
  getUser,
  getUsers,
  reactivateUser,
  disableUser
}

export default userService