import Login from "@/components/login";
import {Button} from "@/components/ui/button";
import {ArrowLeft, Plus} from "lucide-react";
import NewCustomerForm from "./newCustomerForm";
import BackButton from "@/app/dashboard/(pages)/customers/components/backButton";
import {z} from "zod";
import axios from "axios";


const NewCustomerPage = () => {

    return (
        <>
            <BackButton/>
            <h1 className={'text-2xl font-bold'}>
                Add New Customers
            </h1>
            <div className={"w-[240px]"}>
                <NewCustomerForm/>
            </div>
        </>
    )
}

export default NewCustomerPage;