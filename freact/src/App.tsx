import { createBrowserRouter, RouterProvider } from "react-router";
import { Layout } from "./layout";
import { Home } from "./home";
import { FindBlood } from "./findBlood";
import { Donors } from "./donors";
import { RequestBlood } from "./requestBlood";
import { ModalLogin } from "./modalLogin";
import { DonorPanel } from "./donorPanel";
import { EditDpanel } from "./editDpanel";
import { AdminLayout } from "./adminLayout";
import { AdminManage } from "./adminManage";
import { RecipientLayout } from "./recipientLayout";
import { RecipientManage } from "./recipientManage";
import { DonorLayout } from "./donorLayout";

export function App(){
  const router = createBrowserRouter([
    {
      path:'/',
      element: <Layout />,
      children:[
        {
          path:'/home',
          element:<Home />
        },
        {
          path:'/findblood/:blood/:state/:city',
          element:<FindBlood />
        },
        {
          path:'/donors',
          element:<Donors />
        },
        {
          path:'/request',
          element:<RequestBlood />
        },
        {
          path:'/login',
          element:<ModalLogin />
        }
      ]
    },{
      path:'/admin',
      element: <AdminLayout />,
      children:[
        {
          path:'adminmanage',
          element: <AdminManage />
        }
      ]
    },{
      path:'/recipient',
      element: <RecipientLayout />,
      children:[
        {
          path:'recipientmanage/:phone',
          element: <RecipientManage />
        }
      ]
    },{
      path:'/donor',
      element: <DonorLayout />,
      children:[
        {
          path:'donorpanel',
          element: <DonorPanel />
        },
        {
          path:'editdpanel',
          element: <EditDpanel />
        }
      ]
    }
  ])

  return <RouterProvider router = {router} />
}