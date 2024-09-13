'use server'

import {CHEACK_CREDIITIONALS_URL, FORGET_PASSWORD_URL, REGISTER_URL, RESET_PASSWORD_URL } from '@/lib/apiEndPoint'
import axios, { AxiosError } from 'axios'


export async function registerAction(prevState:any ,formdata:FormData) {

    try{

        const {data} = await axios.post(REGISTER_URL, {
            name:formdata.get("name"),
            email:formdata.get("email"),
            password:formdata.get("password"),
            confirm_password:formdata.get("confirm_password"),
        })
        return {
            status:200,
            message:data?.message ?? "Accont reacted successfully please cheake yur emal",
            errors:{},
        }

    } catch(error){
        if(error instanceof AxiosError){
            if(error.response?.status===422){
                return {
                    status:422,
                    message:error.response?.data?.message,
                    errors:error.response?.data.errors,
                }
            }

        }
        return {
            status:500,
            message:"Something went wrong . please try again",
            errors:{},
        }

    }

}



export async function loginAction(prevState:any ,formdata:FormData) {

    try{

        const {data} = await axios.post(CHEACK_CREDIITIONALS_URL , {
            email:formdata.get("email"),
            password:formdata.get("password"),
        })
        return {
            status:200,
            message:data?.message ?? "Login you",
            errors:{},
            data:{
                email:formdata.get("email"),
            password:formdata.get("password"),
            }
        }

    } catch(error){
        if(error instanceof AxiosError){
            if(error.response?.status===422){
                return {
                    status:422,
                    message:error.response?.data?.message,
                    errors:error.response?.data.errors,
                    data:{}
                }
            }

        }
        return {
            status:500,
            message:"Something went wrong . please try again",
            errors:{},
            data:{}
        }

    }

}



export async function forgetPasswordAction(prevState:any ,formdata:FormData) {

    try{

        const {data} = await axios.post(FORGET_PASSWORD_URL , {
            email:formdata.get("email"),
            password:formdata.get("password"),
        })
        return {
            status:200,
            message:data?.message ?? "We have emailed you the password reset link",
            errors:{},

        }

    } catch(error){
        if(error instanceof AxiosError){
            if(error.response?.status===422){
                return {
                    status:422,
                    message:error.response?.data?.message,
                    errors:error.response?.data.errors,
                }
            }

        }
        return {
            status:500,
            message:"Something went wrong . please try again",
            errors:{},
        }

    }

}




export async function resetPasswordAction(prevState:any ,formdata:FormData) {

    try{

        const {data} = await axios.post(RESET_PASSWORD_URL, {
            email:formdata.get("email"),
            password:formdata.get("password"),
            confirm_password:formdata.get("confirm_password"),
            token:formdata.get("token"),

        })

        console.log("tokenn",data)
        return {
            status:200,
            message:data?.message ?? "Password reset Successfully please login now",
            errors:{},
        }

    } catch(error){
        if(error instanceof AxiosError){
            if(error.response?.status===422){
                return {
                    status:422,
                    message:error.response?.data?.message,
                    errors:error.response?.data.errors,
                }
            }

        }
        return {
            status:500,
            message:"Something went wrong . please try again",
            errors:{},
        }

    }

}
