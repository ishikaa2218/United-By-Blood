export function LearnBloodMatch({role,take,give}:any){
    return(
        <>
            <div className="row align-items-center shadow rounded p-4" style={{backgroundColor: "#fff"}}>
                <div className="col-md-6">
                    <div className="mb-3 p-3 rounded" style={{backgroundColor: "#ffd9a0"}}>
                        <div className="d-flex align-items-center mb-2">
                            <div className="fs-5" style={{width: "50px",height: "50px",backgroundColor: "#d39e00",borderRadius: "50%",marginRight: "10px",display: "flex",alignItems: "center",justifyContent: "center",fontWeight: "bold",color: "#fff"}}>
                                {role}
                            </div>
                            <h5 className="mb-0 fw-bold">You can take from</h5>
                        </div>
                        <div className="m-3 fs-5">
                            {take.join(' ')} 
                        </div>
                    </div>
                    <div className="p-3 rounded mt-4" style={{backgroundColor: "#a7cefa"}}>
                        <div className="d-flex align-items-center mb-2">
                            <div className="fs-5" style={{width: "50px",height: "50px",backgroundColor: "#3a86ff",borderRadius: "50%",marginRight: "10px",display: "flex",alignItems: "center",justifyContent: "center",fontWeight: "bold",color: "#fff"}}>
                                {role}
                            </div>
                            <h5 className="mb-0 fw-bold">You can give to</h5>
                        </div>
                        <div className="m-3 fs-5">
                            {give.join(' ')}
                        </div>
                    </div>
                </div>
                <div className="col-md-6 text-center">
                    <img src="/src/images/3.jpg" alt="Blood Donation" className="img-thumbnail" style={{border:"none"}}/>
                    <p className="mt-1" style={{fontSize: "16px"}}>
                        One Blood Donation can save up to <span style={{color:"red", fontWeight:"bold"}}>Three Lives</span>
                    </p>
                </div>
            </div>
        </>
    )
}