import axios from "axios";

const buskingListUrl = `${process.env.REACT_APP_API_BASE_URL}/api/busking/buskerList`

export const getCurrentBuskingInfo = async () => {
    const response = await axios.get(buskingListUrl)

    return response.data
}