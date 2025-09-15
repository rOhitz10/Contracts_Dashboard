import { Children } from "react";
import { useAuth } from "../contextApi/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingThreeDotsJumping from "../components/common/motionLoading";


export const PrivateRoutes = ({children})=>{
 const {user,isLoading} = useAuth();
 const location = useLocation();
 
 if (isLoading) {
  return <div className="flex justify-center items-center min-h-screen">
   <LoadingThreeDotsJumping />
  </div>
 }

 if(!user){
  return <Navigate to='/' state={{from:location}} />
 }
 
 return children
}