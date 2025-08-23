import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { editDonorData, getCities, getData, getEditDonor } from "./axios/data"

export function EditDpanel(){
    const [editData,setEditData] = useState([])
    const [state,setState] = useState([])
    const [selectedState,setSelectedState] = useState<string>()
    const [city,setCity] = useState([])
    const [selectedCity, setSelectedCity] = useState<string>()
    const navigate = useNavigate()
    const [update,setUpdate] = useState({
        d_id: "",
        email: "",
        phone: "",
        stateid: "",
        cityid: ""
    })

    const getEditData = async(email:any) => {
        const res = await getEditDonor(email)
        console.log(res.data)
        setEditData(res.data)
        if (res.data.length > 0) {
            setSelectedState(res.data[0].stateid);
            setSelectedCity(res.data[0].cityid);
            setUpdate({
                d_id: res.data[0].d_id,
                email: res.data[0].email,
                phone: res.data[0].phone,
                stateid: res.data[0].stateid,
                cityid: res.data[0].cityid,
            })
        }
    }

    const getStates = async () => {
        const res = await getData()
        setState(res.data)
    }

    const getCity = async () => {
        if(selectedState){
            const res = await getCities(selectedState)
            setCity(res.data)
        }else{
            setCity([])
        }
    }

    const handleChange = (e:any) => {
        setUpdate({...update,[e.target.name]:e.target.value})
    }

    useEffect(()=>{
        getCity()
    },[selectedState])

    useEffect(()=>{
        const token = localStorage.getItem("token")
        if(!token){
            alert("Please login first")
            navigate('/')
        } else{
            const payload = token.split('.')[1];
            const decoded = JSON.parse(atob(payload));
            const email = decoded.username;
            getStates()
            getEditData(email)
            console.log(token)
        } 
    },[])

    const handleSubmit = async(e:any) => {
        e.preventDefault()
        const res = await editDonorData(update)
        if(res.status === 200){
            alert(res.data)
            navigate(-1)
        }else{
            console.log("error occured")
        }
    }

    return(
        <>
            <div className="container-fluid" style={{background: "rgba(255, 248, 246)"}}>
                <div className="container py-3">
                    <div className="d-flex justify-content-between align-items-center pt-3">
                        <h4 className="mb-0" style={{color:"#767575"}}>Profile</h4>
                    </div>
                    <hr className="mt-2" style={{width: "100%"}} />
                </div>
                <div className="container my-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <form className="mt-4" onSubmit={handleSubmit}>
                                <div className="container">
                                    {editData.map((value:any)=>{
                                        return(
                                            <>
                                                <div className="row justify-content-center mb-3">
                                        <div className="col-sm-6 col-md-3">
                                            <label htmlFor="name" className="col-form-label">Name</label>
                                        </div>
                                        <div className="col-sm-6 col-md-3">
                                            <input type="text" id="name" name="fullname" value={`${value.fname} ${value.lname}`} className="form-control" disabled readOnly/>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center mb-3">
                                        <div className="col-sm-6 col-md-3">
                                            <label htmlFor="bg" className="col-form-label">Blood Group</label>
                                        </div>
                                        <div className="col-sm-6 col-md-3">
                                            <input className="form-control" type="text" id="bg" value={value.bloodgroup} name="bloodgroup" disabled readOnly />
                                        </div>
                                    </div>
                                    <div className="row justify-content-center mb-3">
                                        <div className="col-sm-6 col-md-3">
                                            <label htmlFor="mail" className="col-form-label">E-mail</label>
                                        </div>
                                        <div className="col-sm-6 col-md-3">
                                            <input className="form-control" type="text" id="mail" value={update.email} name="email" onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="row justify-content-center mb-3">
                                        <div className="col-sm-6 col-md-3">
                                            <label htmlFor="mobile" className="col-form-label">Phone</label>
                                        </div>
                                        <div className="col-sm-6 col-md-3">
                                            <input className="form-control" type="text" id="mobile" value={update.phone} name="phone" onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="row justify-content-center mb-3">
                                        <div className="col-sm-6 col-md-3">
                                            <label htmlFor="state" className="col-form-label">State</label>
                                        </div>
                                        <div className="col-sm-6 col-md-3">
                                            <select value={selectedState} className = "form-control" id = "state" name = "state" onChange={(e) => {setSelectedState(e.target.value); setUpdate({...update,stateid:e.target.value})}} >
                                                <option value = ""> Select the state</option>
                                                {state.map((data:any)=>{
                                                    return(
                                                        <option key={data.s_id} value={data.s_id}>{data.state}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center mb-3">
                                        <div className="col-sm-6 col-md-3">
                                            <label htmlFor="city" className="col-form-label">City</label>
                                        </div>
                                        <div className="col-sm-6 col-md-3">
                                            <select value={selectedCity} className = "form-control" name = "city" onChange={(e)=>{setSelectedCity(e.target.value);setUpdate({...update,cityid:e.target.value})}}>
                                                <option value = "">Select the city</option>
                                                {city.map((data:any)=>{
                                                    return(
                                                        <option key={data.c_id} value={data.c_id}>{data.city}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center mb-3">
                                        <div className="col-sm-6 col-md-3">
                                            <label htmlFor="date" className="col-form-label">Last Donation Date</label>
                                        </div>
                                        <div className="col-sm-6 col-md-3">
                                            <input className="form-control" type="text" id="date" name="date" value={value.date} disabled readOnly />
                                        </div>
                                    </div>
                                    <div className="row justify-content-center mb-3">
                                        <div className="col-sm-6 col-md-3">
                                            <label htmlFor="disease" className="col-form-label">Any Disease</label>
                                        </div>
                                        <div className="col-sm-6 col-md-3">
                                            <input className="form-control" type="text" id="disease" name="disease" />
                                        </div>
                                    </div>
                                            </>
                                        )
                                    })}
                                    <div className="row justify-content-center mt-5">
                                        <div className="col-sm col-md-6 text-center">
                                            <button className = "btn btn-danger mb-3" style = {{width: "120px", fontSize: "20px"}} type = "submit"> Save </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>    
                </div>
            </div>
        </>
    )
}
