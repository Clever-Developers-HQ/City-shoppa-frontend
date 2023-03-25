import API_BASEURL  from "constants";
import axios from "axios";


export interface RegisterMerchantProps {
    name: string;
    business_name: string,
    address: string,
    website: string,
    email: string,
    token: string;
}

export interface MerchantProps {
    id: string,
    token: string,
}

export interface UpdateMerchantProps {
  id: string,
  token: string,
  business_name: string,
  address: string,
  website: string,
  email: string,
  name: string,
}

const registerMerchant = async ({token, name, business_name, address, website, email}: RegisterMerchantProps) => {
    console.log("HITTED, i DEY")
  const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      
    const response = await axios.post(`${API_BASEURL}/merchant/register`, {name, business_name, address, website, email}, config);
    console.log(response.data, "THE DATA")
    return response.data;
}

const getMerchants = async (token: string): Promise<{}> => {
  console.log(API_BASEURL, "THE BASE URL")
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        mode: "cors",
      };

      
    const {data }= await axios.get(`${API_BASEURL}/merchant`, config);
    return data.merchant;
}

const getMerchant = async ({id, token}: MerchantProps) => {
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

    const {data} = await axios.get(`${API_BASEURL}/merchant/${id}`, config);
    return data
}

const deleteMerchant = async ({id, token}: MerchantProps) => {
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

    const response = await axios.delete(`${API_BASEURL}/merchant/${id}`, config);
    return response
}

const updateMerchant = async ({id, token, name, business_name, email, website, address}: UpdateMerchantProps) => {
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

    const response = await axios.put(`${API_BASEURL}/merchant/update/${id}`, { name, business_name, email, website, address}, config);
    return response.data
}



const merchantService = {
    registerMerchant, 
    getMerchants,
    getMerchant,
    deleteMerchant,
    updateMerchant
}

export default merchantService