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
    id: any,
    token: any,
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

const registerMerchant = async (merchantProps: RegisterMerchantProps) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${merchantProps.token}`,
    },
  };
  console.log("THE DATA", "BEFORE BEFORE");
  const { data } = await axios.post(`${API_BASEURL}/merchant/register`, merchantProps, config);
  console.log(data, "THE DATA");
  return data;
};

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

const getMerchant = async (id : string) => {
    const config = {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
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
    return response.data
}

const disableMerchant = async ({id, token}: MerchantProps) => {
  const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

  const response = await axios.put(`${API_BASEURL}/merchant/disablemerchant/${id}`, {}, config);
  return response.data
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

const reactivateMerchant = async ({id, token}: MerchantProps) => {
  // console.log(token, id,  "THAT ENTERED")
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_BASEURL}/merchant/reactivate/${id}`, {}, config);
  console.log(response, "THE RESPONSE BACK")
  return response.data
}

const approveMerchant = async ({id, token}: any) => {
  console.log(id, token, "IN THE APPROVE");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_BASEURL}/merchant/merchant-pending-status/${id}`, {}, config);
  return response.data;
};



const merchantService = {
    registerMerchant, 
    getMerchants,
    getMerchant,
    deleteMerchant,
    updateMerchant,
    disableMerchant,
    reactivateMerchant,
    approveMerchant,
}

export default merchantService