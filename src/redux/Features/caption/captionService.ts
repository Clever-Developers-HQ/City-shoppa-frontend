import API_BASEURL  from "constants";
import axios from "axios";

export interface CreateCaptionProps {
   sub_heading: string;
   heading: string;
   image: string;
   token: string;
}

export interface CaptionProps {
    id: string;
    token: string;
 }

 export interface UpdateCaptionProps {
    id: string;
    token: string;
    data: any;
 }

const createCaption = async ({sub_heading, heading, image, token}: CreateCaptionProps) => { 
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

    const response = await axios.post(`${API_BASEURL}/caption/create`, {sub_heading, heading, image} , config);
    return response.data;
}   

const getCaption = async ({id, token}:  CaptionProps) => {
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

    const {data} = await axios.get(`${API_BASEURL}/caption/${id}`, config);
    return data;
}

const getCaptions = async(token:string) => {
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

    const {data} = await axios.get(`${API_BASEURL}/caption`, config);
    return data;
}

const updateCaption = async({id, token, data}: UpdateCaptionProps) => {
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
    const response = await axios.put(`${API_BASEURL}/caption/${id}`, data, config);
    return response.data;
}

const deleteCaption = async ({id, token}: CaptionProps ) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    const {data} = await axios.delete(`${API_BASEURL}/caption/delete/${id}`, config);
    return data;
}

const captionService = {
    createCaption,
    getCaption,
    getCaptions,
    updateCaption,
    deleteCaption,
}

export default captionService;