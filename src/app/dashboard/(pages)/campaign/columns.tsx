"use client"

import { ColumnDef } from "@tanstack/react-table"
import {format} from "date-fns";

import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from "axios";
import {useRouter} from "next/navigation";
import {Customer} from "@/app/dashboard/(pages)/customers/columns";
import {Audience} from "@/app/dashboard/(pages)/audience/columns";


// Define the Order interface based on the Prisma model
export interface Campaign {
    id: string;
    name: string;
    message: string;
    status: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    Audience: Audience
}

export const columns: ColumnDef<Campaign>[] = [
    {
        accessorKey: "name",
        header: "Campaign Name",
    },
    {
        accessorKey: "message",
        header: "Message",
    },
    {
        accessorKey: "id",
        header: "Audience Id",
        accessorFn: originalRow => {
            console.log(originalRow)
            return originalRow?.Audience?.id
        }
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({row}) =>{
            const date = row.getValue("createdAt") as Date;
            return format(new Date(date), 'dd/MM/yyyy HH:mm');
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const campaign = row.original

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const router = useRouter();

            const deleteCampaign = async (id: string) => {
                const userConfirmed = window.confirm('Are you sure you want to delete this campaign?');

                if (userConfirmed) {
                    try {
                        const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/campaigns`, {
                            maxBodyLength: Infinity,
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            data: {
                                ids: [id]
                            },
                            withCredentials: true
                        });

                        console.log('Order deleted:', response.data);
                        router.refresh();
                    } catch (error) {
                        console.error('Error deleting order:', error);
                    }
                } else {
                    console.log('Order deletion cancelled');
                }
            };

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

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={()=>{router.push(`/dashboard/campaign/${campaign.id}`)}}>View Campaign</DropdownMenuItem>
                        <DropdownMenuItem onClick={()=>{startCampaign(campaign.id)}}>Start Campaign</DropdownMenuItem>
                        <DropdownMenuItem onClick={()=>{deleteCampaign(campaign.id)}}>Delete Campaign</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
