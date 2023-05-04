import API_BASEURL from "constants";
import axios from "axios";


export interface CreateOrderProps {
    products: string;
    quantity: any
    userId: string
    token: string
    discounted_productId: string
    merchant_id: string
    discountedmerchant_id:string
}

export interface OrderProps{
  id: string
  token: string
}


const getOrders = async (token: string): Promise<{}> => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
    };
  
  
    const { data } = await axios.get(`${API_BASEURL}/order`, config);
    return data;
  }


    const createOrder = async ({products, discountedmerchant_id, merchant_id, quantity, userId, token, discounted_productId }: CreateOrderProps) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(`${API_BASEURL}/order/add`, { products, merchant_id, quantity, userId}, config);
    return data;
    }


    const getOrder = async ({id, token}: OrderProps) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
  
      const { data } = await axios.get(`${API_BASEURL}/order/${id}`, config);
      return data;
      }

      const completeOrder = async ({id, token,}: OrderProps) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
  
      const { data } = await axios.put(`${API_BASEURL}/order/ordercomplete/${id}`, {}, config);
      return data;
      }

      const updateOrder = async ({id, token, decline_reason, state}: any) => {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
    
        const { data } = await axios.put(`${API_BASEURL}/order/update/${id}`, {state, decline_reason}, config);
        return data;
        }
  



  const orderService = {
    getOrders,
    createOrder,
    getOrder,
    completeOrder,
    updateOrder
  }
  
  export default orderService