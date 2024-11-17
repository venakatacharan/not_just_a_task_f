"use client"

import {z} from "zod";
import CustomerForm, {customerFormSchema} from "@/app/dashboard/(pages)/customers/components/CustomerForm";
import axios from "axios";

const UpdateCustomerForm = ({customerData}:any) =>{
    const handleSubmit = async (values: z.infer<typeof customerFormSchema>)=> {

        const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/customers/${customerData.id}`, values, {
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })

        window.open('/dashboard/customers',"_self")

        console.log(values, response);
    }

    console.log(customerData)

    return  <CustomerForm defaultData={customerData} handleSubmit={handleSubmit}/>
}

export default UpdateCustomerForm