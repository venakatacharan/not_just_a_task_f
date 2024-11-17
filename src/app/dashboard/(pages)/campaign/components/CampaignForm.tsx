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
import { Textarea } from "@/components/ui/textarea"
import {LoaderCircle} from "lucide-react";

import axios from 'axios';
import Link from "next/link";
import {useEffect, useState} from "react";
import {format} from 'date-fns'
import {Audience} from "@/app/dashboard/(pages)/audience/columns";

export const campaignFormSchema = z.object({
    name: z.string().min(2,"Name is required"),
    message: z.string().min(2,"Message is required"),
    audienceId: z.string()
});


const CampaignForm = ({defaultData, handleSubmit}: { defaultData?:any, handleSubmit:(values: any)=>Promise<void> }) => {

    const [audienceData, setAudienceData] = useState<Audience[]>([]);


    useEffect(()=>{

        async function getAudience() {

            const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/audience`;
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

            setAudienceData(response.data);

            return response.data
        }

        getAudience();

    },[])

    const form = useForm<z.infer<typeof campaignFormSchema>>({
        resolver: zodResolver(campaignFormSchema),
        defaultValues: {
            name: defaultData?.name || "",
            audienceId:defaultData?.audience
        }
    });

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-4"} >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Enter Campaign Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Dummy Campaign..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter Message to send."
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="audienceId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Select Audience</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select an Audience" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        audienceData.map(
                                            (audience)=>
                                                <SelectItem key={audience.id.toString()} value={audience.id.toString()} >
                                                        <>
                                                            Created on {format(audience.createdAt, "dd-MM-yyyy HH:mm")}
                                                        </>
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

export default CampaignForm