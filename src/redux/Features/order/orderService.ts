import API_BASEURL from "constants";
import axios from "axios";


interface CreateOrder {
    token: string;
    products: string;
    quantity: any
}


const getOrders = async (token: string): Promise<{}> => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      mode: "cors",
    };
  
  
    const { data } = await axios.get(`${API_BASEURL}/order`, config);
    return data;
  }


    const createOrder = async ({ token, products, quantity }: CreateOrder) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(`${API_BASEURL}/order/add`, { products, quantity }, config);
    return data;
    }




  const orderService = {
    getOrders,
    createOrder
  }
  
  export default orderService