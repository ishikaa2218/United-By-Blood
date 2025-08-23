import { useEffect, useState } from "react";
import { getCities, getData, postRequest } from "./axios/data";

export function RequestBlood(){
    const [state,setState] = useState([])
    const [selectedState,setSelectedState] = useState<string>()
    const [city,setCity] = useState([])
    const [formError,setFormError] = useState<any>({})
    const [post,setPost] = useState({
        pname: "",
        hname: "",
        bloodgroup: "",
        state: "",
        city: "",
        phone: "",
        email: "",
        urgency: "",
        units: ""
    })

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
        const name = e.target.name
        const value = e.target.value
        setPost({...post,[name]:value})
    }

    useEffect(()=>{
        getStates()
    },[])

    useEffect(()=>{
        getCity()
    },[selectedState])

    const validate = () => {
        const error: any = {}
        if(!post.pname.trim()) error.pname = "Patient name is required";
        if(!post.hname.trim()) error.hname = "Hospital name is required";
        if(!post.bloodgroup) error.bloodgroup = "Bloodgroup is required"; 
        if(!post.state) error.state = "State is required"; 
        if(!post.city) error.city = "City is required";
        if(!post.phone.match(/^[0-9]{10}$/)) error.phone = "Enter valid 10-digit mobile number"; 
        if(!post.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) error.bloodgroup = "Bloodgroup is required";
        if(!post.urgency) error.urgency = "Urgency level is required"; 
        if(!post.units) error.units = "Number of units are required";   
        return error
    }

    const handleSubmit = async(e:any) => {
        e.preventDefault()
        const errors = validate()
        setFormError(errors)
        if(Object.keys(errors).length === 0){
            try{
                await postRequest(post)
                alert("Your request has been registered!")
                setPost({
                    pname: "",
                    hname: "",
                    bloodgroup: "",
                    state: "",
                    city: "",
                    phone: "",
                    email: "",
                    urgency: "",
                    units: ""
                })
                setSelectedState("")
            }catch(err){
                console.log(err)
            }
        }
    }

    return(
        <>
            <div className="container-fluid" style={{background: "rgba(255, 248, 246)"}}>
                <div className="row pt-4">
                    <h2 className="text-center" style={{color:"#477e9f"}}>In urgent need of blood?<br />Click here to request a donor now!</h2>
                </div>
                <form className="mt-4" onSubmit={handleSubmit}>
                    <div className="row justify-content-center mb-3">
                        <div className="col-sm-6 col-md-3">
                            <input type="text" name="pname" placeholder="Patient name" className="form-control" value={post.pname} onChange={handleChange} />
                            {formError.pname && <small className="text-danger">{formError.pname}</small>}
                        </div>
                        <div className="col-sm-6 col-md-3">
                            <input type="text" name="hname" placeholder="Hospital name" className="form-control" value={post.hname} onChange={handleChange} />
                            {formError.hname && <small className="text-danger">{formError.hname}</small>}
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-sm-6 col-md-3">
                            <select defaultValue="" className="form-control" name="bloodgroup" value={post.bloodgroup} onChange={handleChange}>
                                <option value="">Select your blood group</option>
                                <option value="A+">A+</option>
                                <option value="B+">B+</option>
                                <option value="A-">A-</option>
                                <option value="B-">B-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                            </select>
                            {formError.bloodgroup && <small className="text-danger">{formError.bloodgroup}</small>}
                        </div>
                        <div className="col-sm-6 col-md-3">
                            <select className = "form-control" name = "country" disabled>
                                <option value = "India">India</option>
                            </select>
                        </div>
                    </div>
                    <div className="row justify-content-center mt-3">
                        <div className="col-sm-6 col-md-3">
                            <select defaultValue="" value={selectedState} className = "form-control" name = "state" onChange={(e) => {setSelectedState(e.target.value); setPost({...post,state:e.target.value})}} >
                                <option value = ""> Select the state</option>
                                {state.map((data:any)=>{
                                    return(
                                        <option key={data.s_id} value={data.s_id}>{data.state}</option>
                                    )
                                })}
                            </select>
                            {formError.state && <small className="text-danger">{formError.state}</small>}
                        </div>
                        <div className="col-sm-6 col-md-3">
                            <select defaultValue="" className = "form-control" name = "city" value={post.city} onChange={handleChange}>
								<option value = "">Select the city</option>
                                {city.map((data:any)=>{
                                    return(
                                        <option key={data.c_id} value={data.c_id}>{data.city}</option>
                                    )
                                })}
							</select>
                            {formError.city && <small className="text-danger">{formError.city}</small>}
                        </div>
                    </div>
                    <div className="row justify-content-center mt-3">
                        <div className="col-sm-6 col-md-3">
                            <input type="text" name="phone" placeholder="Mobile number" className="form-control" value={post.phone} onChange={handleChange} />
                            {formError.phone && <small className="text-danger">{formError.phone}</small>}
                        </div>
                        <div className="col-sm-6 col-md-3">
                            <input className = "form-control" placeholder="E-mail" name = "email" type = "mail" value={post.email} onChange={handleChange} />
                            {formError.email && <small className="text-danger">{formError.email}</small>}
                        </div>
                    </div>
                    <div className="row justify-content-center mt-3">
                        <div className="col-sm-6 col-md-3">
                            <select defaultValue="" className="form-control" name="urgency" value={post.urgency} onChange={handleChange} >
                                <option value="">Urgency level</option>
                                <option value="Need immediately">Need immediately</option>
                                <option value="Can wait for 2 weeks">Can wait for 2 weeks</option>
                                <option value="Comfortable anytime">Comfortable anytime</option>
                            </select>
                            {formError.urgency && <small className="text-danger">{formError.urgency}</small>}
                        </div>
                        <div className="col-sm-6 col-md-3">
                            <select defaultValue="" className="form-control" name="units" value={post.units} onChange={handleChange} >
                                <option value="">Units of blood</option>
                                <option value="1 unit">1 unit</option>
                                <option value="2 unit">2 unit</option>
                                <option value="3 unit">3 unit</option>
                                <option value="4 unit">4 unit</option>
                                <option value="5 unit">5 unit</option>
                                <option value="6 unit">6 unit</option>
                            </select>
                            {formError.units && <small className="text-danger">{formError.units}</small>}
                        </div>
                    </div>
                    <div className="row justify-content-center mt-3">
                        <div className="col-sm col-md-6">
                            <textarea className = "form-control" rows = {5} placeholder="Important note"></textarea>
                        </div>
                    </div>
                    <div className="row justify-content-center mt-4 mb-4">
                        <div className="col-sm col-md-6 text-center">
                            <button className = "btn btn-danger mb-3" style = {{width: "120px", fontSize: "20px"}} type = "submit"> Submit </button>
                        </div>
                    </div>
                </form>
            </div>
       </>
    )
}