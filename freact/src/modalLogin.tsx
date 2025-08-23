import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router";
import { postLogin, postRecipientValidation } from "./axios/data";

export function ModalLogin(props: any) {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'donor' | 'recipient'>('admin');
  const navigate = useNavigate()
  const [post,setPost] = useState({
    username: "",
    pass: ""
  })
  const [phone,setPhone] = useState({
    phone: ""
  })

  const handleChange = (e:any) => {
    const name = e.target.name
    const value = e.target.value
    setPost({...post,[name]:value})
  }
  
  const handleSubmit = async(e:any) => {
    e.preventDefault()
    if(selectedRole === 'admin'){
      if(post.username === 'admin' && post.pass === 'password'){
        localStorage.setItem("atoken",post.pass)
        props.onHide();
        navigate('/admin/adminmanage')
      }else{
        alert('Invalid Credentials')
      }
    }else if(selectedRole === 'donor'){
      const res = await postLogin(post)
      if(res.data.success){
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("role","donor");
        props.onHide();
        navigate(`/donor/donorpanel`)
      }else{
        alert('Invalid Credentials')
      }
    }else if(selectedRole === 'recipient'){
      const res = await postRecipientValidation(phone)
      if(res.data.success){
        props.onHide();
        navigate(`/recipient/recipientmanage/${phone.phone}`)
      }else{
        alert('Invalid Credentials')
      }
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered 
    >
      <Modal.Header closeButton style={{ borderBottom: "none", backgroundColor:"#FFF8F6" }} />
      <Modal.Body style={{backgroundColor:"#FFF8F6"}}>
        <div className="container text-center">
          <div className="mb-4">
            <button className={`btn mx-2 ${selectedRole === 'admin' ? 'btn-outline-danger' : ''}`} style={{ borderRadius: "30px", minWidth: "120px", fontWeight: "600" }} onClick={() => setSelectedRole('admin')}>
              Admin
            </button>
            <button className={`btn mx-2 ${selectedRole === 'donor' ? 'btn-outline-danger' : ''}`} style={{ borderRadius: "30px", minWidth: "120px", fontWeight: "600" }} onClick={() => setSelectedRole('donor')}>
              Donor
            </button>
            <button className={`btn mx-2 ${selectedRole === 'recipient' ? 'btn-outline-danger' : ''}`} style={{ borderRadius: "30px", minWidth: "120px", fontWeight: "600" }} onClick={() => setSelectedRole('recipient')}>
              Reciever
            </button>
          </div>
          {selectedRole === 'admin' && (
            <>
              <h4 className="mb-4" style={{ fontWeight: '700',color:"#333333" }}>Admin Login</h4>
              <form onSubmit={handleSubmit}>
                <input type="text" name="username" onChange={handleChange} className="form-control mb-3" placeholder="Admin Username" style={{ borderRadius: "20px", padding: "10px" }} />
                <input type="password" name="pass" onChange={handleChange} className="form-control mb-4" placeholder="Password" style={{ borderRadius: "20px", padding: "10px" }} />
                <button className="btn btn-danger w-100" style={{ borderRadius: "25px", padding: "10px", fontWeight: "600" }}>
                  Login
                </button>
              </form>
            </>
          )}
          {selectedRole === 'donor' && (
            <>
              <h4 className="mb-4" style={{ fontWeight: '700',color:"#333333" }}>Donor Login</h4>
              <form onSubmit={handleSubmit}>
                <input type="email" name="username" onChange={handleChange} className="form-control mb-3" placeholder="Donor Email" style={{ borderRadius: "20px", padding: "10px" }} />
                <input type="password" name="pass" onChange={handleChange} className="form-control" placeholder="Password" style={{ borderRadius: "20px", padding: "10px" }} />
                <small>Your password is your last name</small>
                <button className="btn btn-danger w-100 mt-4" style={{ borderRadius: "25px", padding: "10px", fontWeight: "600" }}>
                  Login
                </button>
              </form>
            </>
          )}
          {selectedRole === 'recipient' && (
            <>
              <h4 className="mb-4" style={{ fontWeight: '700',color:"#333333" }}>Recipient Login</h4>
              <form onSubmit={handleSubmit}>
                <input type="text" name="phone" onChange={(e)=>setPhone({...phone,phone:e.target.value})} className="form-control mb-3" placeholder="Phone number(mentioned in the form)" style={{ borderRadius: "20px", padding: "10px" }} />
                <button className="btn btn-danger w-100 mt-4" style={{ borderRadius: "25px", padding: "10px", fontWeight: "600" }}>
                  Login
                </button>
              </form>
            </>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
