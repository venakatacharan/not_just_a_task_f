"use client"

import {z} from "zod";
import CustomerForm, {customerFormSchema} from "@/app/dashboard/(pages)/customers/components/CustomerForm";
import axios from "axios";

const NewCustomerForm = () =>{
    const handleSubmit = async (values: z.infer<typeof customerFormSchema>)=> {

        console.log(values);

        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/customers`, values, {
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        console.log(response);

        window.open('/dashboard/customers',"_self")

    }

    return  <CustomerForm handleSubmit={handleSubmit}/>
}

export default NewCustomerForm