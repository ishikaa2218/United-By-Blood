import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000"
})

export function getData(){
    return API.get("/states")
}

export const getCities = (id:any) => {
    return API.get(`/cities/${id}`)
}

export const getFindResult = (blood:any,state:any,city:any) => {
    return API.get(`/findblood/${blood}/${state}/${city}`)
}

export const postDonors = (value:any) => {
    return API.post('/donors',value)
}

export const postRequest = (value:any) => {
    return API.post('/requestBlood',value)
}

export const postLogin = async(value:any) => {
    const res = await API.post('/loginValidation',value)
    if(res.data.success && res.data.token){
        localStorage.setItem("token",res.data.token)
    }
    return res
}

export const postDonorLoginData = (email:any) => {
    const token = localStorage.getItem("token")
    return API.post('/donorLoginData',email,{
        headers: {
            Authorization : `Bearer ${token}`
        }
    })
}

export const getEditDonor = (username:any) => {
    const token = localStorage.getItem("token")
    return API.get(`/editDonorData/${username}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const editDonorData = (value:any) => {
    return API.post('/updateDonorData',value)
}

export const getDonorList = () => {
    return API.get('/donordata')
}

export const getRequestList = () => {
    return API.get('/requestblood')
}

export const getRecentActivity = () => {
    return API.get('/recentactivity')
}

export const postDonorHistory = (value:any) => {
    return API.post('/donorhistory',value)
}

export const getDonorMatch = (value:any) => {
    return API.get(`/matchdonor/${value}`)
}

export const getOptimisedDonors = () => {
    return API.get('/optimisedDonors')
}

export const getBloodStock = () => {
    return API.get('/bloodstock')
}

export const postFulfill = (value:{id:any,bloodgroup:any,units:any}) => {
    return API.post('/fulfillrequest',value)
}

export const postRecipientValidation = async(value:any) => {
    const res = await API.post('/recipientvalidation',value)
    if(res.data.success && res.data.token){
        localStorage.setItem("rtoken",res.data.token)
    }
    return res
}

export const getTracking = (phone:any) => {
    const token = localStorage.getItem("rtoken")
    return API.get(`/recipienttracking/${phone}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const getDonationHistory = () => {
    return API.get('/donationHistory')
}