import BackButton from "@/app/dashboard/(pages)/customers/components/backButton";
import {headers} from "next/headers";
import axios from "axios";
import {Campaign} from "@/app/dashboard/(pages)/campaign/columns";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Play, Plus} from "lucide-react";
import {DataTable} from "@/app/dashboard/(pages)/campaign/data-table";
import {Log, columns} from "@/app/dashboard/(pages)/campaign/[campaignId]/columns";
import StartCampaignButton from "@/app/dashboard/(pages)/campaign/[campaignId]/startCampaignButton";

async function getData(campaignId:string): Promise<Campaign> {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/campaigns/${campaignId}`;
    const headersList = headers()

    const response = await axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            Cookie: headersList.get('cookie') || '',
        },
        withCredentials: true,
    });

    return response.data
}



async function getLogData(campaignId:string): Promise<Log[]> {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/campaigns/log/${campaignId}`;
    const headersList = headers()

    const response = await axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            Cookie: headersList.get('cookie') || '',
        },
        withCredentials: true,
    });

    return response.data
}

const CampaignPage = async ({params}: { params: { campaignId: string } }) => {

    const campaignData = await getData(params.campaignId);
    const logData = await getLogData(params.campaignId);


    return (

        <>
            <BackButton/>
            <div className="flex flex-row justify-between items-center w-full">
                <div className={'flex flex-col gap-4'}>
                    <h1 className={'text-2xl font-bold'}>
                        {campaignData.name} - Communication Log
                    </h1>
                    <span className={"py-1 px-4 w-fit text-sm capitalize rounded-full bg-gray-200"}>
                        {campaignData.status}
                    </span>
                </div>
                {
                    campaignData.status == "not started" ?
                        <StartCampaignButton campaignId={campaignData.id}/>
                        :
                        <span></span>
                }
            </div>
            <div className="py-4">
                <DataTable columns={columns} data={logData}/>
            </div>
        </>
    )
}

export default CampaignPage;