"use client"

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod"
import { format } from "date-fns"

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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import {cn} from "@/lib/utils";
import {CalendarIcon, LoaderCircle} from "lucide-react";

import axios from 'axios';
import {Customer} from "@/app/dashboard/(pages)/customers/columns";

export const customerFormSchema = z.object({
    name: z.string().min(2,"Name is required"),
    email: z.string().email("Please enter a valid email address"),
    lastVisit: z.date().optional()
});

const CustomerForm = ({defaultData, handleSubmit}: { defaultData?:any, handleSubmit:(values: any)=>Promise<void> }) => {

    const form = useForm<z.infer<typeof customerFormSchema>>({
        resolver: zodResolver(customerFormSchema),
        defaultValues: {
            name: defaultData?.name || "",
            email:defaultData?.email || "",
            lastVisit: defaultData?.lastVisit || new Date(),
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
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Your customer's name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Your customer's email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastVisit"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Date of Last Visit</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        {...form.register("lastVisit", {
                                            valueAsDate: true,
                                        })}
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date()
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
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

export default CustomerForm