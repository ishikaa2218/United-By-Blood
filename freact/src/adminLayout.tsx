import { Outlet } from "react-router";
import { AdminHeader } from "./adminHeader";

export function AdminLayout(){
    return(
        <>
            <AdminHeader />
            <Outlet />
        </>
    )
}  