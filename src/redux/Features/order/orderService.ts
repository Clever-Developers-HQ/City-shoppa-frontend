import API_BASEURL from "constants";
import axios from "axios";


interface CreateOrder {
    products: string;
    quantity: any
    userId: string
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


    const createOrder = async ({products, quantity, userId, token }: CreateOrder) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(`${API_BASEURL}/order/add`, { products, quantity, userId}, config);
    return data;
    }


    const getOrder = async (id:string) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      };
  
      const { data } = await axios.get(`${API_BASEURL}/order/${id}`, config);
      return data;
      }
  



  const orderService = {
    getOrders,
    createOrder,
    getOrder
  }
  
  export default orderService