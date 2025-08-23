import { useEffect, useState } from "react"
import { getCities, getData, postDonors } from "./axios/data"

export function Donors(){
    const [state,setState] = useState([])
    const [selectedState,setSelectedState] = useState<string>()
    const [city,setCity] = useState([])
    const [formErrors, setFormErrors] = useState<any>({});
    const [isChecked, setIsChecked] = useState(false);
    const [post,setPost] = useState({
        fname: "",
        lname: "",
        bloodgroup: "",
        gender: "",
        phone: "",
        state: "",
        city: "",
        email: ""
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

    const handleCheckboxChange = (e: any) => {
        setIsChecked(e.target.checked);
    };

    useEffect(()=>{
        getStates()
    },[])

    useEffect(()=>{
        getCity()
    },[selectedState])

    const handleChange = (e:any) => {
        const name = e.target.name
        const value = e.target.value
        setPost({...post,[name]:value})
    }

    const validate = () => {
        const errors: any = {};
        if (!post.fname.trim()) errors.fname = "First name is required";
        if (!post.lname.trim()) errors.lname = "Last name is required";
        if (!post.bloodgroup) errors.bloodgroup = "Blood group is required";
        if (!post.gender) errors.gender = "Gender is required";
        if (!post.phone.match(/^[0-9]{10}$/)) errors.phone = "Enter valid 10-digit mobile number";
        if (!post.state) errors.state = "State is required";
        if (!post.city) errors.city = "City is required";
        if (!post.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = "Valid email is required";
        if (!isChecked) errors.check = "You must agree to the declaration";
        return errors;
    };    

    const handleSubmit = async(e:any) => {
        e.preventDefault()
        const errors = validate();
        setFormErrors(errors);
        if (Object.keys(errors).length === 0){
            try{
                await postDonors(post)
                alert("You are registered as a donor!")
                setPost({
                    fname: "",
                    lname: "",
                    bloodgroup: "",
                    gender: "",
                    phone: "",
                    state: "",
                    city: "",
                    email: ""
                })
                setSelectedState("")
                setIsChecked(false)
            }catch(err){
                console.log(err)
            }
        }
    }

    return(
       <>
            <div className="container-fluid" style={{background: "linear-gradient(90deg,rgba(255, 248, 246) 0%, rgba(255, 248, 246) 50%, rgba(255, 248, 246) 0%)"}}>
                <div className="row pt-4">
                    <h2 className="text-center" style={{color:"#477e9f"}}>Join with us and <br /> let the distress find you !</h2>
                </div>
                <form className="mt-4" onSubmit={handleSubmit}>
                    <div className="row justify-content-center mb-3">
                        <div className="col-sm-6 col-md-3">
                            <input type="text" name="fname" placeholder="First name" className="form-control" value={post.fname} onChange={handleChange} />
                            {formErrors.fname && <small className="text-danger">{formErrors.fname}</small>}
                        </div>
                        <div className="col-sm-6 col-md-3">
                            <input type="text" name="lname" placeholder="Last name" className="form-control" value={post.lname} onChange={handleChange} />
                            {formErrors.lname && <small className="text-danger">{formErrors.lname}</small>}
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
                            {formErrors.bloodgroup && <small className="text-danger">{formErrors.bloodgroup}</small>}
                        </div>
                        <div className="col-sm-6 col-md-3 d-flex align-items-center justify-content-start gap-4">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" id="female" value="female" onChange={handleChange} />
                                <label className="form-check-label" htmlFor="female">
                                    Female
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" id="male" value="male" onChange={handleChange} />
                                <label className="form-check-label" htmlFor="male">
                                    Male
                                </label>
                            </div>
                            {formErrors.gender && <small className="text-danger">{formErrors.gender}</small>}
                        </div>
                    </div>
                    <div className="row justify-content-center mt-3">
                        <div className="col-sm-6 col-md-3">
                            <input type="text" name="phone" placeholder="Mobile number" className="form-control" value={post.phone} onChange={handleChange} />
                            {formErrors.phone && <small className="text-danger">{formErrors.phone}</small>}
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
                            {formErrors.state && <small className="text-danger">{formErrors.state}</small>}
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
                            {formErrors.city && <small className="text-danger">{formErrors.city}</small>}
                        </div>
                    </div>
                    <div className="row justify-content-center mt-3">
                        <div className="col-sm col-md-6">
                            <input className = "form-control" placeholder="E-mail" name = "email" type = "mail" value={post.email} onChange={handleChange} />
                            {formErrors.email && <small className="text-danger">{formErrors.email}</small>}
                        </div>
                    </div>
                    <div className="row justify-content-center mt-4">
                        <div className="col-sm col-md-6">
                            <div className="custom-control custom-checkbox d-flex">
                                <input type="checkbox" className="custom-control-input me-3" checked = {isChecked} name= "check" id="customCheck1" onChange={handleCheckboxChange} />
                                <label className="custom-control-label" htmlFor="customCheck1">
                                    <small className = "text-justify">
                                        I here by declare that information furnished above is true to the best to my knowledge & i am willing 
                                        to disclose my details. If any of the above information is found to be wrong, I will be solely responsible for any loss or damage
                                        sustained to the Government or any other person or agency.
                                    </small>
                                </label>
                            </div>
                            {formErrors.check && <small className="text-danger">{formErrors.check}</small>}
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