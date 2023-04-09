import API_BASEURL from "constants";
import axios from "axios";

export interface AddProductProps {
    category_id:string
    product_name: string
    description: string
    product_price: number
    user_id: string
    merchant_id : string
    qty: number
    token: string
    brand: string
    image: string
    discount: string
    imageTop : any
    imageSide : any
    imageBack: any
}

export interface UpdateProductProps {
    product_name: string
    description: string
    token: string
    product_id: string
}

export interface ProductProps {
    product_id: string
    token: string
}


const getProducts = async (): Promise<{}> => {
    console.log(API_BASEURL, "THE BASE URL")
    const config = {
        headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        mode: "cors",
    };

    const { data } = await axios.get(`${API_BASEURL}/products`, config);
    return data
}

const getProduct = async (product_id: string) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
        },
    };

    const {data} = await axios.get(`${API_BASEURL}/product/${product_id}`, config);
    return data;
}


const createProduct = async ({ 
    category_id, product_name, description, product_price, user_id, merchant_id, qty, token, brand, image, discount, imageTop, imageSide, imageBack

}: AddProductProps) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(`${API_BASEURL}/product/create`, {     
        category_id, product_name, description, product_price, user_id, merchant_id, qty, token, brand, image, discount, imageTop, imageSide, imageBack }, config);
    return response.data;
}

const updateProduct = async ({token, product_name, description, product_id }: UpdateProductProps) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(`${API_BASEURL}/products/${product_id}`, { product_name, description }, config);
    return response.data;
}

const deleteProduct = async ({token, product_id}: ProductProps) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    const {data} = await axios.delete(`${API_BASEURL}/product/delete/${product_id}`, config);
    return data;
}


const productService = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}

export default productService