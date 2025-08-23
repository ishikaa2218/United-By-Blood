import { Navigate, Outlet } from "react-router";
import { DonorHeader } from "./donorHeader";

export function DonorLayout(){
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if(!token || role !== "donor"){
        alert("Please login first!")
        return <Navigate to = '/home' replace />
    }

    return(
        <>
            <DonorHeader />
            <Outlet />
        </>
    )
}  