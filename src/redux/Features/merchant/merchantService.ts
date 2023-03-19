import API_BASEURL  from "constants";
import axios from "axios";


export interface RegisterMerchantProps {
    name: string;
    business_name: string,
    address: string,
    website: string,
    email: string,
}

export interface MerchantProps {
    id: string,
    token: string,
}

export interface UpdateMerchantProps {
  id: string,
  token: string,
  data: any,
}

const registerMerchant = async ({name, business_name, address, website}: RegisterMerchantProps) => {
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      
    const response = await axios.post(`${API_BASEURL}/merchant/register`, registerMerchant, config);
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

const updateMerchant = async ({id, token, data}: UpdateMerchantProps) => {
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

    const response = await axios.put(`${API_BASEURL}/merchant/${id}`, data, config);
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