import CustomerForm from "../components/CustomerForm";
import BackButton from "../components/backButton";

import axios from 'axios';
import {headers} from "next/headers";
import UpdateCustomerForm from "@/app/dashboard/(pages)/customers/update/updateCustomerForm";

const getCustomerData = async (id:string) =>{
    const headersList = headers()
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/customers/${id}`, {
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

    const customerData = await getCustomerData(id)

    return (
        <>
            <BackButton/>
            <h1 className="text-2xl font-bold">Update Customers</h1>
            <div className="w-[240px]">
                <UpdateCustomerForm customerData={customerData}/>
            </div>
        </>
    );
};

export default NewCustomerPage;