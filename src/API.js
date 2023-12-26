import axios from "axios"
export const getCapsule = () => {
    return axios.get('https://api.spacexdata.com/v3/capsules').then((res) =>{
        if(res?.data?.length > 0){
            console.log("reeees:", res);
            return res.data
        } else {
            return []
        }
    }).catch((err) =>{
        console.log("err: ", err);
    })
}
