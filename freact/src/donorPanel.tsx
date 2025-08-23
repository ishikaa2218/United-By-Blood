import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router"
import { getDonorMatch, postDonorLoginData } from "./axios/data"

export function DonorPanel(){
    const [donorData,setDonorData] = useState([])
    const navigate = useNavigate()

    const getDonorData = async(email:any) => {
        const res = await postDonorLoginData(email)
        //console.log(res.data)
        setDonorData(res.data)
    }

    const getMatchData = async() => {
        const token = localStorage.getItem("token");
        if(!token){
            alert("Please login first!");
            navigate('/')
            return
        }

        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        const email = decoded.username;
            
        try {
            const res = await getDonorMatch(email); 
            if (res.data && res.data.length > 0) {
                const filePath = "/White and Red Simple Certificate Science Certificate.pdf";
                const link = document.createElement("a");
                link.href = filePath;
                link.setAttribute("download", "DonationCertificate.pdf");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                alert("You are yet to donate blood!");
            }
        } catch (error) {
            console.error("Error while fetching match data:", error);
            alert("Something went wrong.");
        }
    }

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(!token){
            alert("Please login first!");
            navigate('/')
        }else{
            const payload = token.split('.')[1];
            const decoded = JSON.parse(atob(payload));
            const email = decoded.username;
            console.log(email)
            getDonorData(email)
            //console.log(token)
        }
    },[])

    return(
        <div className="container-fluid" style={{background: "rgba(255, 248, 246)"}}>
            <div className="container py-3">
                <div className="d-flex justify-content-between align-items-center pt-3">
                    <h4 className="mb-0" style={{color:"#767575"}}>Profile</h4>
                    <NavLink to={`/donor/editdpanel`} className="text-danger fw-semibold text-decoration-none">
                        Edit Profile
                    </NavLink>
                </div>
                <hr className="mt-2" style={{width: "100%"}} />
            </div>
            <div className="container my-4">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-borderless mb-0">
                                <tbody>
                                    {donorData.map((value:any)=>{
                                        return(
                                            <>
                                                <tr>
                                                    <td className="fw-semibold">Name</td>
                                                    <td>{value.fname} {value.lname}</td>
                                                </tr>
                                                <tr>
                                                    <td className="fw-semibold">Blood Group</td>
                                                    <td className="text-danger fw-semibold">{value.bloodgroup}</td>
                                                </tr>
                                                <tr>
                                                    <td className="fw-semibold">Email</td>
                                                    <td>{value.email}</td>
                                                </tr>
                                                <tr>
                                                    <td className="fw-semibold">Phone</td>
                                                    <td>{value.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td className="fw-semibold">Address</td>
                                                    <td>{value.city}, {value.state}</td>
                                                </tr>  
                                                <tr>
                                                    <td className="fw-semibold">Last Donation Date</td>
                                                    <td>{value.date}</td>
                                                </tr>  
                                            </>
                                        )
                                    })}
                                    <tr>
                                        <td className="fw-semibold">Any Disease</td>
                                        <td className="text-danger fw-semibold"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="p-3 mt-2 text-center">
                    <button className="btn btn-outline-danger" onClick={getMatchData}>Download your certificate of donation!</button> 
                </div>
            </div>
        </div>
    )
}