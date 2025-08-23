import { useEffect, useState } from "react"
import { getTracking } from "./axios/data"
import { useNavigate, useParams } from "react-router"

export function RecipientManage(){
    const [tracking,setTracking] = useState([])
    const {phone} = useParams()
    const navigate = useNavigate()

    const getRecipientTracking = async() => {
        const res = await getTracking(phone)
        setTracking(res.data)
    }

    useEffect(()=>{
        const token = localStorage.getItem("rtoken")
        if(!token){
            alert("Please login first!")
            navigate('/')
        } else{
            getRecipientTracking()
            console.log(token)
        }
    },[])

    return(
        <>
            <div className="container-fluid" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="row p-3">
                    <div className="col d-flex justify-content-center">
                        <h4>Track Your Request Status</h4>
                    </div>
                </div>
            </div>
            <div className="container-fluid mt-5">
                <table style={{margin:'auto',width:'90%'}} className="table table-hover table-striped table-borderless table-light">
                        <thead>
                            <tr>
                                <th>#</th> 
                                <th>PATIENT NAME</th>
                                <th>HOSPITAL NAME</th>
                                <th>BLOODGROUP</th>
                                <th>CITY</th>
                                <th>STATE</th>
                                <th>PHONE</th>
                                <th>EMAIL</th>
                                <th>UNITS</th>
                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {tracking.map((value:any) => {
                                return(
                                    <tr key={value.r_id}>
                                        <td>•</td>
                                        <td>{value.pname}</td>
                                        <td>{value.hname}</td>
                                        <td>{value.bloodgroup}</td>
                                        <td>{value.city}</td>
                                        <td>{value.state}</td>
                                        <td>{value.phone}</td>
                                        <td>{value.email}</td>
                                        <td>{value.units}</td>
                                        <td>{value.status}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                </table>
            </div>
      </>
    )
}