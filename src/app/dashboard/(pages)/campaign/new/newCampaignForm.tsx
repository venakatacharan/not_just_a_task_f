"use client"

import {z} from "zod";
import axios from "axios";
import CampaignForm,{campaignFormSchema} from "@/app/dashboard/(pages)/campaign/components/CampaignForm";



const NewCampaignForm = () =>{
    const handleSubmit = async (values: z.infer<typeof campaignFormSchema>)=> {
        console.log(values);
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/campaigns`, values, {
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        console.log(response);

        window.open('/dashboard/campaign',"_self")

    }

    return  <CampaignForm handleSubmit={handleSubmit}/>
}

export default NewCampaignForm