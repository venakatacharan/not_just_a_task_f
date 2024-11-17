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


// Define the Order interface based on the Prisma model
export interface Order {
    id: string;
    itemName: string;
    quantity: number;
    total: number;
    customerId: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    customer: {
        id: string,
        name: string,
        email: string,
        lastVisit: Date,
        createdAt: Date,
        updatedAt: Date
    }
}

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "itemName",
        header: "Item Name",
    },
    {
        accessorKey: "quantity",
        header: "Quantity",
    },
    {
        accessorKey: "total",
        header: "Amount",
        cell: ({row}) =>{
            return `₹ ${row.getValue("total")}`;
        }
    },
    {
        accessorKey: "name",
        header: "Customer",
        accessorFn: originalRow => {
            console.log(originalRow)
            return originalRow?.customer?.name
        }
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
        accessorKey: "updatedAt",
        header: "Updated At",
        cell: ({row}) =>{
            const date = row.getValue("updatedAt") as Date;
            return format(new Date(date), 'dd/MM/yyyy HH:mm');
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const customer = row.original

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const router = useRouter();

            const deleteOrder = async (id: string) => {
                const userConfirmed = window.confirm('Are you sure you want to delete this order?');

                if (userConfirmed) {
                    try {
                        const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders`, {
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
                        <DropdownMenuItem
                            onClick={()=>{router.push(`/dashboard/orders/update?id=${customer.id}`)}}
                        >Update Order
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={()=>{deleteOrder(customer.id)}}>Delete Order</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
