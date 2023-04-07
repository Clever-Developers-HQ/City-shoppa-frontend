import API_BASEURL from "constants";
import axios from "axios";

export interface AddProductProps {
    product_name: string
    description: string
    produvt_price: number
    category_id: string
    qty: number
    token: string
    brand: string
    image: string
    merchant_id: string
    discount: any
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

const getProduct = async ({ product_id, token }: ProductProps) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    const {data} = await axios.get(`${API_BASEURL}/products/${product_id}`, config);
    return data;
}


const addProduct = async ({ product_name, description, produvt_price, category_id, qty, token, brand, image, merchant_id, discount }: AddProductProps) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(`${API_BASEURL}/products`, { product_name, description, produvt_price, category_id, qty, brand, image, merchant_id, discount }, config);
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
    addProduct,
    updateProduct,
    deleteProduct
}

export default productService