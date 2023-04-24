import API_BASEURL from "constants";
import axios from "axios";


export interface CreateCityProps {
  name: string;
  street: string;
  province: string;
  token: string
}

export interface CityProps {
  id: string,
  token: string,
}

export interface UpdateCityProps {
  id: string
  token: string
  name: string
  street: string
  province: string
}

const createCity = async ({ token, name, street, province }: CreateCityProps) => {

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post(`${API_BASEURL}/city/create`, { name, street, province }, config);

  return data;
}

const getCities = async (token: string): Promise<{}> => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    mode: "cors",
  };


  const { data } = await axios.get(`${API_BASEURL}/city`, config);
  return data;
}

const getCity = async ({ id, token }: CityProps) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(`${API_BASEURL}/City/${id}`, config);
  return data
}

const deleteCity = async ({ id, token }: CityProps) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_BASEURL}/city/delete/${id}`, config);
  return response.data
}

const updateCity = async ({ id, token, street, province, name }: UpdateCityProps) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_BASEURL}/city/update/${id}`, {name, street, province}, config);
  return response.data
}

const cityService = {
  createCity,
  deleteCity,
  updateCity,
  getCity,
  getCities
}

export default cityService