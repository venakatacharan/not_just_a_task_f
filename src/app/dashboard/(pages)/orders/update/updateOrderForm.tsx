"use client"

import {z} from "zod";
import axios from "axios";
import OrderForm, {orderFormSchema} from "@/app/dashboard/(pages)/orders/components/OrderForm";

const UpdateOrderForm = ({customerData}:any) =>{
    const handleSubmit = async (values: z.infer<typeof orderFormSchema>)=> {

        const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${customerData.id}`, values, {
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })

        window.open('/dashboard/orders',"_self")

        console.log(values, response);
    }

    console.log(customerData)

    return  <OrderForm defaultData={customerData} handleSubmit={handleSubmit}/>
}

export default UpdateOrderForm