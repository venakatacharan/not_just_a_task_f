import Login from "@/components/login";
import {Button} from "@/components/ui/button";
import {ArrowLeft, Plus} from "lucide-react";
import NewOrderForm from "./newOrderForm";
import BackButton from "@/app/dashboard/(pages)/customers/components/backButton";
import {z} from "zod";
import axios from "axios";


const NewCustomerPage = () => {

    return (
        <>
            <BackButton/>
            <h1 className={'text-2xl font-bold'}>
                Create New Order
            </h1>
            <div className={"w-[240px]"}>
                <NewOrderForm/>
            </div>
        </>
    )
}

export default NewCustomerPage;