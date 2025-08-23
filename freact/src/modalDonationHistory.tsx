import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { getCities, getData, getOptimisedDonors, postDonorHistory } from "./axios/data";

export function ModalDonationHistory(props: any){
    const [donor,setDonor] = useState([])
    const [state,setState] = useState([])
    const [selectedState,setSelectedState] = useState<string>()
    const [city,setCity] = useState([])
    const [post,setPost] = useState({
        donor: "",
        hospital: "",
        bloodgroup: "",
        state: "",
        city: "",
        remarks: ""
    })
    
    const getDonor = async() => {
        const res = await getOptimisedDonors()
        setDonor(res.data)
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
        setPost({...post,[e.target.name]:e.target.value})
    }

    const handleSubmit = async(e:any) => {
        e.preventDefault()
        console.log("Submitted donor ID:", post.donor);
        console.log(donor)
        const res = await postDonorHistory(post)
        if(res.data.success){
            alert('Donation Recorded!')
            setPost({
                donor: "",
                hospital: "",
                bloodgroup: "",
                state: "",
                city: "",
                remarks: ""
            })
            setSelectedState("")
        }
    }

    useEffect(()=>{
        getCity()
    },[selectedState])

    useEffect(()=>{
        getDonor()
        getStates()
    },[])

    return(
        <>
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header closeButton style={{ borderBottom: "none", backgroundColor:"#FFF8F6" }} />
                <Modal.Body style={{backgroundColor:"#FFF8F6"}}>
                    <div className="container-fluid">
                        <div className="row">
                            <h4 className="text-center" style={{color:"#477e9f"}}>Record Blood Donation<br />Please fill in the donation details carefully.</h4>
                        </div>
                        <form className="mt-4" onSubmit={handleSubmit}>
                            <div className="row justify-content-center mb-3">
                                <div className="col-sm-6 col-md-3">
                                    <select defaultValue="" value={post.donor} className = "form-control" name = "donor" onChange={handleChange}>
                                        <option value = "">Donor Name</option>
                                        {donor.map((value:any)=>{
                                            return(
                                                <option key = {value.d_id} value = {value.d_id}>{value.fname} {value.lname}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="col-sm-6 col-md-3">
                                    <input type="text" name="hospital" value={post.hospital} placeholder="Hospital name" className="form-control"  onChange={handleChange} />
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-sm-6 col-md-3">
                                    <select defaultValue="" value={post.bloodgroup} className="form-control" name="bloodgroup" onChange={handleChange} >
                                        <option value="">Blood group</option>
                                        <option value="A+">A+</option>
                                        <option value="B+">B+</option>
                                        <option value="A-">A-</option>
                                        <option value="B-">B-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                    </select>
                                </div>
                                <div className="col-sm-6 col-md-3">
                                    <select className = "form-control" name = "country" disabled>
                                        <option value = "India">India</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row justify-content-center mt-3">
                                <div className="col-sm-6 col-md-3">
                                    <select defaultValue="" value = {selectedState} className = "form-control" name = "state" onChange={(e)=>{setSelectedState(e.target.value);setPost({...post,state:e.target.value})}}>
                                        <option value = ""> Select the state</option>
                                        {state.map((value:any)=>{
                                            return(
                                                <option key = {value.s_id} value = {value.s_id}>{value.state}</option>
                                            )
                                        })} 
                                    </select>
                                </div>
                                <div className="col-sm-6 col-md-3">
                                    <select defaultValue="" value = {post.city} className = "form-control" name = "city" onChange={handleChange}>
                                        <option value = "">Select the city</option>
                                        {city.map((value:any)=>{
                                            return(
                                                <option key = {value.c_id} value = {value.c_id}>{value.city}</option>
                                            )
                                        })} 
                                    </select>
                                </div>
                            </div>
                            <div className="row justify-content-center mt-3">
                                <div className="col-sm col-md-6">
                                    <textarea className = "form-control" rows = {5} placeholder="Remarks" name="remarks" value = {post.remarks} onChange={handleChange}></textarea>
                                </div>
                            </div>
                            <div className="row justify-content-center mt-4">
                                <div className="col-sm col-md-6 text-center">
                                    <button className = "btn btn-danger mb-3" style = {{width: "120px", fontSize: "20px"}} type = "submit"> Record </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}