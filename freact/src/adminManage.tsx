import { useEffect, useState } from 'react';
import './css/admin.css'
import { getBloodStock, getDonationHistory, getDonorList, getRecentActivity, getRequestList, postFulfill } from './axios/data';
import { Button, Card, Table } from 'react-bootstrap';
import { ModalDonationHistory } from './modalDonationHistory';

export const AdminManage = () => {
  const [selectedRole, setSelectedRole] = useState<'dashboard' | 'view' | 'requests' | 'stock'>('dashboard');
  const [data,setData] = useState([])
  const [request,setRequest] = useState([])
  const [dlength,setDlength] = useState<number>()
  const [rlength,setRlength] = useState<number>()
  const [dhLength,setDhLength] = useState<number>()
  const [blength,setBlength] = useState<number>()
  const [recent,setRecent] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [stock,setStock] = useState([])
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [history,setHistory] = useState<any>([])
  
  const getData = async() => {
    const res = await getDonorList()
    const len = res.data.length
    setData(res.data)
    setDlength(len)
  }

  const getRequestData = async() => {
    const res = await getRequestList()
    const len = res.data.length
    setRlength(len)
    setRequest(res.data)
  }
  console.log(request)

  const getRecentData = async() => {
    const res = await getRecentActivity()
    setRecent(res.data)
  }

  const getStock = async() => {
    const res = await getBloodStock()
    const len = res.data.length
    setStock(res.data)
    setBlength(len)
  }

  const getHistory = async() => {
    const res = await getDonationHistory()
    const lens = res.data.length
    setHistory(res.data)
    setDhLength(lens)
  }

  const handleFulfill = async(id:any,bloodgroup:any,units:any) => {
    try {
      const res = await postFulfill({ id, bloodgroup, units });
      setMessage({ type: 'success', text: res.data.message });
      getRequestData?.();
      getStock?.();
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || "Something went wrong";
      setMessage({ type: 'error', text: errorMsg });
    }

    setTimeout(() => setMessage(null), 3000); 
  }

  useEffect(()=>{
    getData()
    getRequestData()
    getRecentData()
    getStock()
    getHistory()
  },[])

  return(
    <>
      <div className="container-fluid" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="row p-3">
          <div className="col d-flex justify-content-center">
            <button className={`btn mx-2 ${selectedRole === 'dashboard' ? 'btn-outline-danger' : ''}`} style={{ borderRadius: "30px", minWidth: "120px", fontWeight: "600" }} onClick={() => setSelectedRole('dashboard')}>
              Dashboard
            </button>
            <button className={`btn mx-2 ${selectedRole === 'view' ? 'btn-outline-danger' : ''}`} style={{ borderRadius: "30px", minWidth: "120px", fontWeight: "600" }} onClick={() => setSelectedRole('view')}>
              View Donors
            </button>
            <button className={`btn mx-2 ${selectedRole === 'requests' ? 'btn-outline-danger' : ''}`} style={{ borderRadius: "30px", minWidth: "120px", fontWeight: "600" }} onClick={() => setSelectedRole('requests')}>
              Request Recieved 
            </button>
            <button className={`btn mx-2 ${selectedRole === 'stock' ? 'btn-outline-danger' : ''}`} style={{ borderRadius: "30px", minWidth: "120px", fontWeight: "600" }} onClick={() => setSelectedRole('stock')}>
              Blood Stock 
            </button>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-5 text-center table-responsive">
      {selectedRole === 'view' && <>
          <table style={{margin:'auto',width:'90%'}} className="table table-hover table-striped table-borderless table-light">
                    <thead>
                        <tr>
                            <th>#</th> 
                            <th>NAME</th>
                            <th>BLOODGROUP</th>
                            <th>GENDER</th>
                            <th>CITY</th>
                            <th>STATE</th>
                            <th>PHONE</th>
                            <th>EMAIL</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {data.map((value:any) => {
                            return(
                                <tr key={value.d_id}>
                                    <td>{value.d_id}</td>
                                    <td>{`${value.fname} ${value.lname}`}</td>
                                    <td>{value.bloodgroup}</td>
                                    <td>{value.gender}</td>
                                    <td>{value.city}</td>
                                    <td>{value.state}</td>
                                    <td>{value.phone}</td>
                                    <td>{value.email}</td>
                                </tr>
                            )
                        })}
                    </tbody>
            </table>
        </>}
        {selectedRole === 'requests' && <>
          {message && (
            <tr>
              <td colSpan={11}>
                <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'} text-center`}>
                  {message.text}
                </div>
              </td>
            </tr>
          )}
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
                            <th>URGENCY</th>
                            <th>UNITS</th>
                            <th>STATUS</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {request.map((value:any) => {
                            return(
                                <tr key={value.r_id}>
                                    <td>{value.r_id}</td>
                                    <td>{value.pname}</td>
                                    <td>{value.hname}</td>
                                    <td>{value.bloodgroup}</td>
                                    <td>{value.city}</td>
                                    <td>{value.state}</td>
                                    <td>{value.phone}</td>
                                    <td>{value.email}</td>
                                    <td>{value.urgency}</td>
                                    <td>{value.units}</td>
                                    <td>{value.status}</td>
                                    <td><button className="btn btn-danger rounded-pill" onClick = {()=>handleFulfill(value.r_id,value.bloodgroup,value.units)} disabled={value.status === 'Fulfilled'}>Fulfill</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
            </table>
        </>}
        {selectedRole === 'dashboard' && <>
          <div className="container-fluid p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <h2 className="text-center mb-4">Admin Dashboard</h2>
            <div className="row g-4 mb-5">
              <div className="col-md-3">
                <Card className="text-center shadow-sm">
                  <Card.Body>
                    <h5>Donors Available</h5>
                    <h2>{dlength}</h2>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-md-3">
                <Card className="text-center shadow-sm">
                  <Card.Body>
                    <h5>Blood Requests</h5>
                    <h2>{rlength}</h2>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-md-3">
                <Card className="text-center shadow-sm">
                  <Card.Body>
                    <h5>Blood Donated</h5>
                    <h2>{dhLength}</h2>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-md-3">
                <Card className="text-center shadow-sm">
                  <Card.Body>
                    <h5>Blood Available</h5>
                    <h2>{blength}</h2>
                  </Card.Body>
                </Card>
              </div>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
              <h4 className="mb-3">Recent Activities</h4>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Blood Group</th>
                    <th>Activity</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                    {recent.map((value:any,index:any)=>{
                      return(
                        <tr key={index}>
                          <td>•</td>
                          <td>{value.name}</td>
                          <td>{value.bloodgroup}</td>
                          <td>{value.status}</td>
                          <td>{value.date}</td>
                        </tr>
                      )
                    })}
                </tbody>
              </Table>
              <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
                <Button variant="outline-danger" href="/adminpanel/manage-donors">View Donors</Button>
                <Button variant="outline-danger" href="/adminpanel/manage-requests">View Requests</Button>
              </div>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
              <h4 className="mb-3">Donation History</h4>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Donor Name</th>
                    <th>Hospital Name</th>
                    <th>Bloodgroup</th>
                    <th>State</th>
                    <th>City</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                    {history.map((value:any)=>{
                      return(
                        <tr key={value.dh_id}>
                          <td>•</td>
                          <td>{value.name}</td>
                          <td>{value.hospital}</td>
                          <td>{value.bloodgroup}</td>
                          <td>{value.state}</td>
                          <td>{value.city}</td>
                          <td>{value.status}</td>
                        </tr>
                      )
                    })}
                </tbody>
              </Table>
              <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
                <Button variant="outline-danger" onClick={() => setShowModal(true)}>Record Donation</Button>
              </div>
            </div>
            <ModalDonationHistory show={showModal} onHide={() => setShowModal(false)} />
          </div>
        </>}
        {selectedRole === 'stock' && <>
          <table style={{margin:'auto',width:'90%'}} className="table table-hover table-striped table-borderless table-light">
                    <thead>
                        <tr>
                            <th>#</th> 
                            <th>BLOOD GROUP</th>
                            <th>UNITS(450ml/unit)</th>
                            <th>STATUS</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {stock.map((value:any) => {
                            return(
                                <tr key={value.b_id}>
                                    <td>{value.b_id}</td>
                                    <td>{value.bloodgroup}</td>
                                    <td>{value.units}</td>
                                    <td>{value.status}</td>
                                </tr>
                            )
                        })}
                    </tbody>
            </table>
        </>}
      </div>
    </>
  )
};
