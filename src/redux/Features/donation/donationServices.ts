import API_BASEURL  from "constants";
import axios from "axios";


export interface CreateDonationProps {
    token: string
    amount: any
}

export interface DonationProps {
    id: string,
    token: string,
}


const createDonation = async ({token, amount}: CreateDonationProps) => {
 
  const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      
    const response = await axios.post(`${API_BASEURL}/donation/create`, {amount}, config);
    return response.data;
}

const getDonation = async ({token, id}: DonationProps): Promise<{}> => {
  console.log(API_BASEURL, "THE BASE URL")
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        mode: "cors",
      };

      
    const {data }= await axios.get(`${API_BASEURL}/donation/${id}`, config);
    return data.merchant;
}

const donationService = {
    getDonation,
    createDonation
}

export default donationService