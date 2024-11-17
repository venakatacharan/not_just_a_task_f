"use client"

import axios from "axios";
import {useRouter} from "next/navigation";
import {Play} from "lucide-react";
import {Button} from "@/components/ui/button";

const StartCampaignButton = ({campaignId}:{campaignId:string}) => {

    const router = useRouter();

    const startCampaign = async (id: string) => {
        const userConfirmed = window.confirm('Are you sure you want to start this campaign?');

        if (userConfirmed) {
            try {
                const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/campaigns/start/${id}`, {},{
                    maxBodyLength: Infinity,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });

                console.log('Campaign Started:', response.data);
                router.refresh();
            } catch (error) {
                console.error('Error Starting Campaign:', error);
            }
        } else {
            console.log('Campaign Start Cancelled');
        }
    };

    return(
        <Button onClick={()=>{startCampaign(campaignId)}}>
            Start Campaign
            <Play/>
        </Button>
    )
}

export default StartCampaignButton