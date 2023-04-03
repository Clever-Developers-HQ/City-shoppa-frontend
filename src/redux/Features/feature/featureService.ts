
import API_BASEURL  from "constants";
import axios from "axios";


export interface FeatureProps {
  id: string,
  token: string,
}

export interface CreateFeatureProps {
  image: any;
  token : string
}


const getFeatures = async (): Promise<{}> => {

      const config = {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          mode: "cors",
        };
  
        
      const {data }= await axios.get(`${API_BASEURL}/feature`, config);
      return data;
  }

  const deleteFeature = async ({ id, token }: FeatureProps) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  
    const {data} = await axios.delete(`${API_BASEURL}/feature/delete/${id}`, config);
    return data
  }

  const createFeature = async ({token, image}: CreateFeatureProps) => {
 
    const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
  
        
      const response = await axios.post(`${API_BASEURL}/feature/create`, {image}, config);
      return response.data;
  }




const featureService = {
    getFeatures,
    deleteFeature,
    createFeature
  }

  export default featureService