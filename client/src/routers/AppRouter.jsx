import { Route, Router, Routes } from "react-router-dom"
import { Login } from "../pages/Login"
import { PrivateRoutes } from "./PrivateRoutes"
import {Contracts} from "../pages/Contracts"
import { DashboardLayout } from "../components/layouts/DashboardLayout"
import { ContractDetail } from "../pages/ContractDetail"

export const AppRouter = ()=>{
 return(
  <Routes>

   {/* public routes  */}
<Route path="/" element={<Login />} />

   {/* private routes  */}
   <Route path="/dashboard" element={<PrivateRoutes>
    <DashboardLayout />
   </PrivateRoutes>} >
   <Route index element={<Contracts />} />
   <Route path="contract/:id" element={<ContractDetail />} />

   </Route>

  </Routes>
 )
}