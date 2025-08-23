import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getFindResult } from "./axios/data"
import './css/style.css'

export function FindBlood(){
    const [result,setResult] = useState([])
    const {blood,state,city} = useParams()

    const getFindBlood = async () => {
        try{
            const res = await getFindResult(blood,state,city)
            setResult  (res.data)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getFindBlood()
    },[])

    return(
        <>
            <div className="container-fluid" style={{ background: "rgba(255, 248, 246)"}}>
                <div className="row pt-4">
                    <form className="d-flex flex-nowrap justify-content-center" role="search">	
                        <input type="search" placeholder="Search result" className="form-control search" />
                    </form>
                </div>
                <div className="container py-5">
                    {result.length === 0 ? (
                        <p className="text-center text-muted">No donors found.</p>
                    ) : (
                        <div className="row justify-content-center g-4">
                            {result.map((data: any) => (
                                <div className="col-md-5" key={data.d_id}>
                                <div className="d-flex align-items-center border rounded p-3 shadow-sm bg-white h-100">
                                    <div className="me-3">
                                    <div
                                        className="rounded-circle bg-danger text-white fw-bold d-flex justify-content-center align-items-center"
                                        style={{ width: "50px", height: "50px" }}
                                    >
                                        {data.bloodgroup}
                                    </div>
                                    </div>
                                    <div>
                                    <h6 className="mb-1">{data.fname} {data.lname}</h6>
                                    <small className="text-muted d-block">{data.city}, {data.state}</small>
                                    <a href={`tel:${data.phone}`} className="text-primary small">{data.phone}</a>
                                    </div>
                                </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}