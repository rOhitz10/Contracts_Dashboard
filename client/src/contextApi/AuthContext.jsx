import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();
export const useAuth = ()=>{
 return useContext(AuthContext);
}

export const AuthProvider = ({children})=>{
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
  const token = localStorage.getItem('token');
  const userData = localStorage.getItem('user');

      if (token && userData) {
      setUser(userData);
    }
    
    setIsLoading(false);
  },[])

  const login = (userData,token)=>{
  localStorage.setItem('token', token);
    localStorage.setItem('user', userData);
    setUser(userData);
  }

  const logout = ()=>{
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  setUser(null)
  }

  const value = {
   user,
   login,
   logout,
   isLoading
  }


 return <AuthContext.Provider value={value}>
  {children}
 </AuthContext.Provider>
}

