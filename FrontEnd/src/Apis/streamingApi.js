import axios from "axios";

const buskingListUrl = `${process.env.REACT_APP_API_BASE_URL}/api/busking/buskerList`

export const getCurrentBuskingInfo = async () => {
    try{

        const response = await axios.get(buskingListUrl)
        // console.log(response)
        return response.data;
    }catch (error) {
        console.error('Error fetching busking info:', error);
        throw error
    }
}