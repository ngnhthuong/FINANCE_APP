import React ,{createContext,useState, useEffect} from 'react';
import axios from 'axios';
const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated,setisAuthenticated] = useState(false);
    const [updateData, setUpdateData] = useState(false);
    const [updateDataIncome, setUpdateDataIncome] = useState(false);
    const [updateDataExpenses, setUpdateDataExpenses] = useState(false);
    const [isPremium, setIsPremium] = useState(false);
    return (
        <AuthContext.Provider 
            value={{id ,email, updateData, setUpdateData,updateDataExpenses, setUpdateDataExpenses,updateDataIncome, setUpdateDataIncome, setEmail,password,setId, setPassword,isAuthenticated,setisAuthenticated, isPremium, setIsPremium}}
        >
            {children}
        </AuthContext.Provider>
    );
};

export {AuthContext,AuthProvider};