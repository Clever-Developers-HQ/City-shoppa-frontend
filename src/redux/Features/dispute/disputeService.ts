import API_BASEURL  from "constants";
import axios from "axios";


export interface CreateDisputeProps {
    token: string
    product_name: string
    dispute_reason: string
    seller_id: string
    phone: string
    email: string
}

export interface DisputeProps {
    id: string,
    token: string,
}


const createDispute = async ({token, product_name, dispute_reason, seller_id, email, phone}: CreateDisputeProps) => {
 
  const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      
    const response = await axios.post(`${API_BASEURL}/dispute/create`, {product_name, dispute_reason, seller_id, email, phone}, config);
    return response.data;
}

const getDisputes = async (token: string): Promise<{}> => {

    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        mode: "cors",
      };

      
    const {data }= await axios.get(`${API_BASEURL}/dispute/`, config);
    return data
}

const updateDispute = async ({id, token}: DisputeProps): Promise<{}> => {
      const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          mode: "cors",
        };
  
        
      const {data }= await axios.put(`${API_BASEURL}/dispute/${id}`, config);
      return data
  }


const DisputeService = {
    getDisputes,
    createDispute,
    updateDispute
}

export default DisputeService