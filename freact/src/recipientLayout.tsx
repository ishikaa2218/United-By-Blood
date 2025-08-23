import { Outlet } from "react-router";
import { RecipientHeader } from "./recipientHeader";

export function RecipientLayout(){
    return(
        <>
            <RecipientHeader />
            <Outlet />
        </>
    )
}  