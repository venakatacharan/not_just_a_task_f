import OrderForm from "../components/OrderForm";
import BackButton from "../components/backButton";

import axios from 'axios';
import {headers} from "next/headers";
import UpdateOrderForm from "@/app/dashboard/(pages)/orders/update/updateOrderForm";

const getOrderData = async (id:string) =>{
    const headersList = headers()
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Cookie: headersList.get('cookie') || '',
            },
            withCredentials: true, // Include credentials if needed
        });

        return response.data

    } catch (err) {
        console.error('Error fetching customer data:', err);
    }
}

const NewCustomerPage = async ({searchParams}:any) => {

    const {id} = searchParams;

    const customerData = await getOrderData(id)

    return (
        <>
            <BackButton/>
            <h1 className="text-2xl font-bold">Update Customers</h1>
            <div className="w-[240px]">
                <UpdateOrderForm customerData={customerData}/>
            </div>
        </>
    );
};

export default NewCustomerPage;