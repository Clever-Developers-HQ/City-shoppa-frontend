import API_BASEURL  from "constants";
import axios from "axios";


export interface CreateCategoryProps {
    name: string;
    token: string
}

export interface CategoryProps {
    id: string,
    token: string,
}

export interface UpdateCategoryProps {
  id: string,
  token: string,
  business_name: string,
  address: string,
  website: string,
  email: string,
  name: string,
}

const createCategory = async ({token, name}: CreateCategoryProps)  =>  {
    console.log("HITTED, i DEY")
  const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

    const {data} = await axios.post(`${API_BASEURL}/category/create`, {name}, config);
  
    return data;
}

const getCategories = async (token: string): Promise<{}> => {
  console.log(API_BASEURL, "THE BASE URL")
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        mode: "cors",
      };

      
    const {data}= await axios.get(`${API_BASEURL}/category`, config);
    return data.Category;
}

const getCategory = async ({id, token}: CategoryProps) => {
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

    const {data} = await axios.get(`${API_BASEURL}/category/${id}`, config);
    return data
}

const deleteCategory = async ({id, token}: CategoryProps) => {
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

    const response = await axios.delete(`${API_BASEURL}/category/${id}`, config);
    return response.data
}

const updateCategory = async ({id, token, name, business_name, email, website, address}: UpdateCategoryProps) => {
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

    const response = await axios.put(`${API_BASEURL}/Category/update/${id}`, { name, business_name, email, website, address}, config);
    return response.data
}



const CategoryService = {
    createCategory, 
    getCategories,
    deleteCategory,
    updateCategory,
    getCategory
}

export default CategoryService