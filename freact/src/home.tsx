import 'bootstrap/dist/css/bootstrap.min.css';
import Marquee from "react-fast-marquee";
import { getCities, getData } from './axios/data';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { LearnBloodMatch } from './learnBloodMatch';
import InfoMarquee from './infoMarquee';

export function Home(){
    const [gdata,setGdata] = useState([])
    const [selectedState,setSelectedState] = useState<string>()
    const [selectedBlood,setSelectedBlood] = useState<string>()
    const [selectedCity,setSelectedCity] = useState<string>()
    const [cities,setCities] = useState([])
    const [activeTab, setActiveTab] = useState<'awareness' | 'welfare' | 'emergency'>('awareness');
    const [role,setRole] = useState<'A+' | 'O+' | 'B+' | 'AB+' | 'A-' | 'O+' | 'O-' | 'B-' | 'AB-'>('A+')
    const navigate = useNavigate()
    const bloodMatchData: any = {
        'A+': { take: ['A+', 'A-', 'O+', 'O-'], give: ['A+', 'AB+'] },
        'O+': { take: ['O+', 'O-'], give: ['O+', 'A+', 'B+', 'AB+'] },
        'B+': { take: ['B+', 'B-', 'O+', 'O-'], give: ['B+', 'AB+'        ] },
        'AB+': { take: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'], give: ['AB+'] },
        'A-': { take: ['A-', 'O-'], give: ['A-', 'A+', 'AB-', 'AB+'] },
        'O-': { take: ['O-'], give: ['O-', 'O+', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'] },
        'B-': { take: ['B-', 'O-'], give: ['B-', 'B+', 'AB-', 'AB+'] },
        'AB-': { take: ['AB-', 'A-', 'B-', 'O-'], give: ['AB-', 'AB+'] },
      }

    const tabContent = {
        awareness: {
          title: "Awareness Campaigns",
          description: (
            <>
              <p><strong>What does your support enable?</strong><br />
              Funds help run educational campaigns, organize blood drives, and spread vital awareness about the need for blood donation.</p>
    
              <p><strong>How are funds utilized?</strong><br />
              Contributions go into creating promotional materials, conducting workshops, and expanding outreach programs.</p>
    
              <p><strong>Why continuous support matters?</strong><br />
              Sustained efforts ensure ongoing education and a larger, informed community ready to step up when needed.</p>
            </>
          ),
          image: "/src/images/4.jpg",
        },
        welfare: {
          title: "Donor Welfare",
          description: (
            <>
              <p><strong>What does your support enable?</strong><br />
              Donations assist in providing care kits, refreshments, and post-donation support for voluntary blood donors.</p>
    
              <p><strong>How are funds utilized?</strong><br />
              Funds help offer medical checkups, donor gifts, and appreciation events to motivate and retain regular donors.</p>
    
              <p><strong>Why continuous support matters?</strong><br />
              Donor satisfaction improves donation frequency, ultimately strengthening the overall blood supply chain.</p>
            </>
          ),
          image: "/src/images/5.jpg",
        },
        emergency: {
          title: "Emergency Response Fund",
          description: (
            <>
              <p><strong>What does your support enable?</strong><br />
              Enables rapid mobilization of resources during critical shortages, accidents, or natural disasters requiring urgent blood supply.</p>
    
              <p><strong>How are funds utilized?</strong><br />
              Donations equip mobile blood banks, transport units, and emergency outreach programs.</p>
    
              <p><strong>Why continuous support matters?</strong><br />
              Preparedness saves lives. Immediate response is only possible when a strong emergency fund is maintained.</p>
            </>
          ),
          image: "/src/images/6.jpg",
        },
      };
    
    const stateData = async () => {
        try{
            const res = await getData()
            console.log(res.data)
            setGdata(res.data)
        }catch(error){
            console.log(error)
        }
    }

    const cityData = async () => {
        if(selectedState){
            const res = await getCities(selectedState)
            console.log(res.data)
            setCities(res.data)
        }else{
            setCities([])
        }
    }

    useEffect(()=>{
        cityData()
    },[selectedState])

    useEffect(()=>{
        stateData()
    },[])

    const handleSubmit = (e:any) => {
        e.preventDefault()
        const encodeBlood = encodeURIComponent(selectedBlood ?? "")
        navigate(`/findblood/${encodeBlood}/${selectedState}/${selectedCity}`)
    }

    return(
        <>
            <div className="container-fluid" style={{background: "linear-gradient(163deg,rgba(255, 248, 246) 0%, rgba(255, 248, 246) 50%,rgb(164, 24, 24) 50%)"}}>
                <div className="row pt-4">
                    <h2 className="text-center" style={{color:"#477e9f"}}>Meet nation's one of the largest online <br /> blood information archive.</h2>
                </div>
                <form onSubmit={handleSubmit}>
					<div className = "form-group row pt-5">
						<div className = "col-sm-3 offset-sm-3">
							<select defaultValue="" value={selectedBlood} onChange={(e) => setSelectedBlood(e.target.value)} className = "form-control" style={{backgroundColor:"white",borderColor:"#bbb7b7"}}>
								<option value = "">Select your blood group</option>
								<option value = "A+">A+</option>
								<option value = "B+">B+</option>
								<option value = "A-">A-</option>
								<option value = "B-">B-</option>
								<option value = "O+">O+</option>
								<option value = "O-">O-</option>
								<option value = "AB+">AB+</option>
								<option value = "AB-">AB-</option>
							</select>
						</div>
						<div className = "col-sm-3">
							<select className = "form-control" disabled style={{borderColor:"#bbb7b7"}}>
								<option value = "India"> India </option>
							</select>
						</div>
					</div>
					<div className = "form-group row pt-4">
						<div className = "col-sm-3 offset-sm-3">
							<select defaultValue="" value={selectedState} onChange={(e)=> setSelectedState(e.target.value)} className = "form-control" style={{backgroundColor:"white",borderColor:"#bbb7b7"}}>
								<option value = ""> State </option>
								{gdata.map((data:any)=>{
                                    return(
                                        <option key = {data.s_id} value = {data.s_id}>{data.state}</option>
                                    )
                                })}
							</select>
						</div>
						<div className = "col-sm-3">
							<select className = "form-control" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} style={{backgroundColor:"white",borderColor:"#bbb7b7"}}>
								<option value = ""> City </option>
								{cities.map((data:any)=>{
                                    return(
                                        <option key={data.c_id} value={data.c_id}>{data.city}</option>
                                    )
                                })}
							</select>
						</div>
					</div>
					<div className = "form-group row pt-5">
						<div className = "col-sm-12 text-center">
							<button className = "btn px-4 py-2 mb-3 mt-2" type = "submit" style={{backgroundColor:"white",color:"#e0312b"}} disabled = {!selectedBlood || !selectedState || !selectedCity}>Search</button>
						</div>
					</div>
				</form>
                <div className="row mt-4 pb-4">
                    <small className="text-center" style={{color:"white"}}>Donate your blood & make a difference. <span style={{color:"white"}}>Join us!</span></small>
                </div>
                <div className="row mt-5"></div>
            </div>
            <div className="container-fluid" style={{ backgroundColor: '#f8d7da ' }}>
                <div className="row p-2">
                    <Marquee speed={10}>
                        <div className="col d-flex justify-content-center align-items-center px-5 pt-2 fs-5 text-danger">
                           <pre> Saving Lives, Spreading Hope.        Together, We Are United by Blood.           One Community. One Purpose. One Drop at a Time.             Your Blood. Someone's Hope. </pre>
                        </div>
                    </Marquee>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row mb-5"></div>
                <div className="row pt-3">
                    <div className="col-sm-6 p-5" style={{textAlign:"justify"}}>
                        <h2 className="mb-4" style={{color:"#477e9f"}}>United By Blood</h2>
                        <p>
                            Founded with a mission to make blood accessible to every patient, every hospital, and every emergency, United by Blood connects voluntary blood donors with those in urgent need.
                            Our platform bridges the gap between donors and recipients by providing a fast, reliable, and transparent system for blood donation and requests.
                            <br/><br/>
                            We are more than just a service — we are a movement.
                            A movement of kindness, humanity, and unwavering commitment to life.
                            Through partnerships with hospitals, blood banks, and volunteers, we aim to ensure that no life is lost due to the shortage of blood.
                        </p>

                        <div className="d-lg-block d-none" style={{marginTop: "15px"}}>
                            🩸 Saving lives through timely action<br/>
                            🩸 Empowering donors to become everyday heroes<br/>
                            🩸 Spreading awareness about the importance of blood donation<br/>
                            🩸 Building a united and stronger community
                        </div>

                        <p style={{marginTop: "15px"}}>
                            Together, we can overcome challenges, break barriers, and save countless lives — because when we unite by blood, we unite by humanity.
                        </p>
                    </div>
                    <div className="col-sm-6">
                        <img className="img-fluid text-center" src="/src/images/2.png" alt="photo" />
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <h2 className="text-center mt-5" style={{color:"#477e9f"}}>Learn About Donation</h2>
                </div>
                <div className="row p-3 mb-3">
                    <div className="col d-flex justify-content-center mt-3">
                        <button className={`btn mx-3 fs-5 ${role === 'A+' ? "btn-danger" : "btn-outline-danger"}`} style={{minWidth: "80px", fontWeight: "600" }} onClick={()=>setRole('A+')}>
                            A+
                        </button>
                        <button className={`btn mx-3 fs-5 ${role === 'O+' ? "btn-danger" : "btn-outline-danger"}`} style={{minWidth: "80px", fontWeight: "600" }} onClick={()=>setRole('O+')}>
                            O+
                        </button>
                        <button className={`btn mx-3 fs-5 ${role === 'B+' ? "btn-danger" : "btn-outline-danger"}`} style={{minWidth: "80px", fontWeight: "600" }} onClick={()=>setRole('B+')}>
                            B+ 
                        </button>
                        <button className={`btn mx-3 fs-5 ${role === 'AB+' ? "btn-danger" : "btn-outline-danger"}`} style={{minWidth: "80px", fontWeight: "600" }} onClick={()=>setRole('AB+')}>
                            AB+ 
                        </button>
                        <button className={`btn mx-3 fs-5 ${role === 'A-' ? "btn-danger" : "btn-outline-danger"}`} style={{minWidth: "80px", fontWeight: "600" }} onClick={()=>setRole('A-')}>
                            A- 
                        </button>
                        <button className={`btn mx-3 fs-5 ${role === 'O-' ? "btn-danger" : "btn-outline-danger"}`} style={{minWidth: "80px", fontWeight: "600" }} onClick={()=>setRole('O-')}>
                            O-
                        </button>
                        <button className={`btn mx-3 fs-5 ${role === 'B-' ? "btn-danger" : "btn-outline-danger"}`} style={{minWidth: "80px", fontWeight: "600" }} onClick={()=>setRole('B-')}>
                            B-
                        </button>
                        <button className={`btn mx-3 fs-5 ${role === 'AB-' ? "btn-danger" : "btn-outline-danger"}`} style={{minWidth: "80px", fontWeight: "600" }} onClick={()=>setRole('AB-')}>
                            AB-
                        </button>
                    </div>
                </div>
                {role === 'A+' && <LearnBloodMatch role={role} take={bloodMatchData[role].take} give={bloodMatchData[role].give} />}
                {role === 'O+' && <LearnBloodMatch role={role} take={bloodMatchData[role].take} give={bloodMatchData[role].give} />}
                {role === 'B+' && <LearnBloodMatch role={role} take={bloodMatchData[role].take} give={bloodMatchData[role].give} />}
                {role === 'AB+' && <LearnBloodMatch role={role} take={bloodMatchData[role].take} give={bloodMatchData[role].give} />}
                {role === 'A-' && <LearnBloodMatch role={role} take={bloodMatchData[role].take} give={bloodMatchData[role].give} />}
                {role === 'B-' && <LearnBloodMatch role={role} take={bloodMatchData[role].take} give={bloodMatchData[role].give} />}
                {role === 'O-' && <LearnBloodMatch role={role} take={bloodMatchData[role].take} give={bloodMatchData[role].give} />}
                {role === 'AB-' && <LearnBloodMatch role={role} take={bloodMatchData[role].take} give={bloodMatchData[role].give} />}
                <div className="row mt-5"></div>
            </div>
            <div className="container-fluid" style={{ backgroundColor: '#f8d7da' }}>
                <div className="row mt-5">
                    <div className="container text-center pt-5">
                        <h2 className="mb-5">
                            How <span style={{ color: '#c82333', fontWeight: 'bold' }}>Donation</span> Contributes?
                        </h2>
                        <div className="row justify-content-center align-items-center">
                            <div className="col-md-3 bg-white rounded p-4 m-2 shadow-sm">
                                <div className="mb-3">
                                <i className="bi bi-people" style={{ fontSize: '50px', color: '#c82333' }}></i>
                                </div>
                                <h5 className="fw-bold text-danger">Community Impact</h5>
                                <p className="text-muted">Every donation strengthens the bond within communities, fostering a culture of care and support.</p>
                            </div>
                            <div className="col-md-1 d-none d-md-block">
                                <h1 style={{color: '#c82333'}}>{'>'}</h1>
                            </div>
                            <div className="col-md-3 bg-white rounded p-4 m-2 shadow-sm">
                                <div className="mb-3">
                                <i className="bi bi-heart" style={{ fontSize: '50px', color: '#c82333' }}></i>
                                </div>
                                <h5 className="fw-bold text-danger">Saving Lives</h5>
                                <p className="text-muted">Donated blood becomes a lifeline for patients in need, contributing to better health outcomes worldwide.</p>
                            </div>
                            <div className="col-md-1 d-none d-md-block">
                                <h1 style={{color: '#c82333'}}>{'>'}</h1>
                            </div>
                            <div className="col-md-3 bg-white rounded p-4 m-2 shadow-sm">
                                <div className="mb-3">
                                    <i className="bi bi-globe" style={{ fontSize: '50px', color: '#c82333' }}></i>
                                </div>
                                <h5 className="fw-bold text-danger">Global Contribution</h5>
                                <p className="text-muted">A single act of donation connects individuals across nations, promoting global solidarity and care.</p>
                            </div>
                        </div>
                        <div className="row mb-5"></div>
                    </div>
                </div>
            </div>
            <div className="container mt-3 py-5">
                <h2 className="text-center mb-4">
                    Types of <span style={{ color: "#c82333", fontWeight: "bold" }}>Charity Support</span>
                </h2>
                <p className="text-center text-muted mb-5">
                    Every contribution you make powers blood donation awareness, community welfare, and emergency outreach. Together, we can save lives and spread hope.
                </p>
                <div className="row">
                    <div className="col-md-3">
                        <div className="list-group">
                            <button
                            className={`list-group-item list-group-item-action ${activeTab === 'awareness' ? 'active' : ''}`}
                            style={activeTab === 'awareness' ? { backgroundColor: "#fde8e8", borderColor: "#c82333", color: "#c82333" } : {}}
                            onClick={() => setActiveTab('awareness')}
                            >
                            Awareness Campaigns
                            </button>
                            <button
                            className={`list-group-item list-group-item-action ${activeTab === 'welfare' ? 'active' : ''}`}
                            style={activeTab === 'welfare' ? { backgroundColor: "#fde8e8", borderColor: "#c82333", color: "#c82333" } : {}}
                            onClick={() => setActiveTab('welfare')}
                            >
                            Donor Welfare
                            </button>
                            <button
                            className={`list-group-item list-group-item-action ${activeTab === 'emergency' ? 'active' : ''}`}
                            style={activeTab === 'emergency' ? { backgroundColor: "#fde8e8", borderColor: "#c82333", color: "#c82333" } : {}}
                            onClick={() => setActiveTab('emergency')}
                            >
                            Emergency Response Fund
                            </button>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="card p-4 shadow-sm">
                            <div className="row">
                                <div className="col-md-8">
                                    {tabContent[activeTab].description}
                                </div>
                                <div className="col-md-4">
                                    <img src={tabContent[activeTab].image} alt={tabContent[activeTab].title} className="img-thumbnail rounded" style={{border:"none"}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="text-center mt-5">
                        <button className="btn btn-danger px-4 py-2 rounded-pill">
                            Donate for Awareness
                        </button>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row mt-4">
                    <InfoMarquee />
                </div>
            </div>
        </>
    )
}