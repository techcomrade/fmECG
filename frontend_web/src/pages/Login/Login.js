import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import './login.scss';
import { showNotiError, showNotiSuccess } from "../../components/Notification";

const LoginPage = () => {
    const [eye,setEye] = useState(false);
    const handleChange = () =>{
        setEye(!eye);
    }
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    // let username_gs = useSelector((state) => state.authSlice.username);
    const dispatch = useDispatch();
    const handleSubmit = (e) =>{
        e.preventDefault();
        const values = {
            email: email,
            password: password,
        };
        if(!email || !password) {
            showNotiError('Bạn chưa nhập đầy đủ thông tin')
        }
        else {
            
        }
    };

    return (
        <div className="container-login">
            
        </div>
    )
};
  
export default LoginPage;


    