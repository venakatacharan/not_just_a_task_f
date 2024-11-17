"use client"
import RuleBuilder from "@/app/dashboard/(pages)/audience/rulesBuilder";
import axios from "axios";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {LoaderCircle} from "lucide-react";
import {DataTable} from "@/app/dashboard/(pages)/customers/data-table";
import {columns,Customer} from "@/app/dashboard/(pages)/customers/columns";

const AudienceCreateForm = () =>{

    const [fetching, setFetching] = useState<boolean>(false);
    const [rules, setRules] = useState();
    const [audience, setAudience] = useState<Customer[]>([]);

    const [creatingAudience, setCreatingAudience] = useState<boolean>(false);

    const calculateAudienceSize = async (rules:any) => {
        setFetching(true);
        try {
            const response = await axios.post('http://localhost:5000/audience/size',{
                rules:rules
            } ,{
                maxBodyLength: Infinity,
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
            setAudience(response.data);
        } catch (error) {
            console.error('Error calculating audience size:', error);
        }finally {
            setFetching(false);
        }
    };


    const createAudience = async (rules:any) => {
        setCreatingAudience(true);
        try {
            const response = await axios.post('http://localhost:5000/audience/create',{
                customers:audience
            } ,{
                maxBodyLength: Infinity,
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error creating audience', error);
        }finally {
            setCreatingAudience(false);
        }
    };




    return(
        <div className="flex flex-col gap-2">


            <RuleBuilder onChange={(incomingRule: any) => setRules(incomingRule)}/>

            <Button className={'w-fit flex flex-row gap-2'} onClick={() => {
                calculateAudienceSize(rules)
            }}>
                Check Size
                {
                    fetching &&
                    <LoaderCircle className={'animate-spin'}/>
                }
            </Button>

            <div className="py-4">
                <DataTable columns={columns} data={audience}/>
            </div>


            <Button className={'w-fit flex flex-row gap-2'} onClick={() => {
                createAudience(audience)
            }}>
                Create Audience
                {
                    creatingAudience &&
                    <LoaderCircle className={'animate-spin'}/>
                }
            </Button>

        </div>
    )
}

export default AudienceCreateForm