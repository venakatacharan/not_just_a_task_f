"use client"

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {LoaderCircle} from "lucide-react";

import axios from 'axios';
import {Customer} from "@/app/dashboard/(pages)/customers/columns";
import Link from "next/link";
import {useEffect, useState} from "react";

export const orderFormSchema = z.object({
    itemName: z.string().min(2,"Name is required"),
    quantity: z.coerce.number().int().min(1,"1 Quantity is required"),
    total: z.coerce.number().min(1,"Min ₹1 Amount is required"),
    customerId: z.string()
});


const OrderForm = ({defaultData, handleSubmit}: { defaultData?:any, handleSubmit:(values: any)=>Promise<void> }) => {

    const [customerData, setCustomerData] = useState<Customer[]>([]);


    useEffect(()=>{

        async function fetchCustomer(): Promise<Customer[]> {

            const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/customers`;
            const response = await axios.get(url, {
                maxBodyLength: Infinity,
                headers: {
                    'Content-Type': 'application/json',
                },
                params: {
                    limit: 50,
                    skip: 0
                },
                withCredentials: true,
            });

            setCustomerData(response.data);

            return response.data
        }

        fetchCustomer();

    },[])

    const form = useForm<z.infer<typeof orderFormSchema>>({
        resolver: zodResolver(orderFormSchema),
        defaultValues: {
            itemName: defaultData?.itemName || "",
            quantity:defaultData?.quantity,
            total: defaultData?.total,
            customerId: defaultData?.customerId
        }
    });

    useEffect(()=>{
        console.log(form.getValues("customerId"))
    },[form.formState])

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-4"} >
                <FormField
                    control={form.control}
                    name="itemName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Item Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Website Service..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Order Quantity</FormLabel>
                            <FormControl>
                                <Input placeholder="5" { ...form.register('quantity', { valueAsNumber: true } ) } {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="total"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Total Amount</FormLabel>
                            <FormControl>
                                <Input placeholder="₹5000" { ...form.register('total', { valueAsNumber: true } ) } {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="customerId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Select Customer</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a Customer" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        customerData.map(
                                            (customer)=>
                                                <SelectItem key={customer.id.toString()} value={customer.id.toString()}>
                                                    {customer.name}
                                                </SelectItem>
                                        )
                                    }
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">
                    Submit
                    {
                        form.formState.isSubmitting &&
                        <LoaderCircle className={'animate-spin'}/>

                    }
                </Button>
            </form>
        </Form>
    )

}

export default OrderForm