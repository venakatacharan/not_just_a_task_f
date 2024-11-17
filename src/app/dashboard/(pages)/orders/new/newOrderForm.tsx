"use client"

import {z} from "zod";
import OrderForm, {orderFormSchema} from "@/app/dashboard/(pages)/orders/components/OrderForm";
import axios from "axios";
import {Customer} from "@/app/dashboard/(pages)/customers/columns";
import {headers} from "next/headers";



const NewOrderForm = () =>{
    const handleSubmit = async (values: z.infer<typeof orderFormSchema>)=> {
        console.log(values);
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders`, values, {
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        console.log(response);

        window.open('/dashboard/orders',"_self")

    }

    return  <OrderForm handleSubmit={handleSubmit}/>
}

export default NewOrderForm