import Login from "@/components/login";
import {Button} from "@/components/ui/button";
import {ArrowLeft, Plus} from "lucide-react";
import NewCampaignForm from "./newCampaignForm";
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
                <NewCampaignForm/>
            </div>
        </>
    )
}

export default NewCustomerPage;