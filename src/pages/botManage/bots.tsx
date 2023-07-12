
import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import MyContext from "../../lib/context";


import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,

} from "@/components/ui/dialog"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectGroup,
    SelectLabel,
    SelectValue,
  } from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface bot {
    AgentName: string,
    status: string,
    paymentMethod: string,
    userId: string,
    botId: number
}

const botList: Array<bot> = [
    {
        AgentName: "Gopher001",
        botId: 0o1,
        status: "Working",
        paymentMethod: "Credit Card",
        userId: "testName"
    },
    {
        AgentName: "Gopher002",
        botId: 0o2,
        status: "Pending",
        paymentMethod: "PayPal",
        userId: "testName"
    },
    {
        AgentName: "Gopher003",
        botId: 0o3,
        status: "Stoped",
        paymentMethod: "Bank Transfer",
        userId: "testName"
    },
]

const Bots = () => {
    const router = useRouter()
    const user = useContext(MyContext);
    useEffect(() => {
        if (!user?.user?.token) {
            router.push('/login')
        }
    }, [router, user?.user])

    const [bots, setBots] = useState(botList) // botList
    const [actionType, setActionType] = useState("create")
    const [bot, setBot] = useState({   // default bot
        AgentName: "",
        botId: 0,
        status: "",
        paymentMethod: "",
        userId: ""
    })
    const [showDiag, setShowDiag] = useState(false) 
    function EditBot(Bot: bot) {
        setBot(Bot)
        setActionType("edit")
        setShowDiag(true)
    }
    function SaveBot() {

        if(actionType == "edit") {
            
            bots.map((agent,index)=> {
                if( agent.botId == bot.botId ) {
                    bots.splice(index,1, bot)
                    setBots([...bots])
                }
            })
        } else {
            setBots([...bots,bot])
        }
        setShowDiag(false)

        setTimeout(()=> {
            setActionType("create")
        },10)
    }
    function creatNewAgent() {
        setBot({
            ...bots[bots.length -1],
            botId: bots.length + 1,
            AgentName: 'Gopher00' + (bots.length + 1)

        })
        setShowDiag(true)
    }

    function saveChange(text:string,type:string) {
        setBot({
            ...bot,
            [type]: text
        })
    }
    function setOpen() {
        setShowDiag(false)
        setActionType('create')
    
    }
    return <div className="w-full h-full bg-white flex flex-row">
        <div className="w-80 h-full border-r-2">
           
            <div className="font-bold text-3xl px-3 text-center pt-4 pb-3">
                Gopher AI
            </div>
            <div className="flex flex-col">
                <Button variant="outline" className="border-blue-800 text-blue-800 hover:bg-blue-700 hover:text-white">
                    Agents
                </Button>
                <Button variant="outline"  className="border-blue-800 text-blue-800 hover:bg-blue-700 hover:text-white">
                    Settings
                </Button>
            </div>
        </div>
        <div className="px-16 w-max flex-1 pt-4">

            {
                user?.user?.userName ? <header className='font-bold text-xl px-3 text-right pb-5'>
                    <span className="pr-2">
                        Welcome: 
                    </span>
                    {
                        <span>
                            {
                                user?.user?.userName
                            }
                        </span>
                    }
                </header> : null
            }

            <div className="flex flex-row-reverse">
                <Button variant="outline" className='border-blue-800 bg-blue-800 text-white' onClick={()=> {
                    creatNewAgent()
                }}>
                    Create Agent
                </Button>
            </div>

            <Table>
                <TableCaption className="text-gray-light">A list of your recent Agents.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px] font-bold text-2xl text-center">Bots</TableHead>
                        <TableHead className="font-bold text-2xl">Status</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bots.map((invoice, index) => (
                        <TableRow key={invoice.botId}>
                            <TableCell className="font-bold text-base flex flex-row items-center"> 
                            <svg xmlns="http://www.w3.org/2000/svg" height="42" viewBox="0 -960 960 960" width="48"><path d="M147-376q-45 0-76-31.208Q40-438.417 40-483t31.208-75.792Q102.417-590 147-590v-123q0-24 18-42t42-18h166q0-45 31.208-76 31.209-31 75.792-31t75.792 31.208Q587-817.583 587-773h166q24 0 42 18t18 42v123q45 0 76 31.208 31 31.209 31 75.792t-31.208 75.792Q857.583-376 813-376v196q0 24-18 42t-42 18H207q-24 0-42-18t-18-42v-196Zm196.235-100Q360-476 371.5-487.735q11.5-11.736 11.5-28.5Q383-533 371.265-544.5q-11.736-11.5-28.5-11.5Q326-556 314.5-544.265q-11.5 11.736-11.5 28.5Q303-499 314.735-487.5q11.736 11.5 28.5 11.5Zm274 0Q634-476 645.5-487.735q11.5-11.736 11.5-28.5Q657-533 645.265-544.5q-11.736-11.5-28.5-11.5Q600-556 588.5-544.265q-11.5 11.736-11.5 28.5Q577-499 588.735-487.5q11.736 11.5 28.5 11.5ZM342-285h276q12.75 0 21.375-8.675 8.625-8.676 8.625-21.5 0-12.825-8.625-21.325T618-345H342q-12.75 0-21.375 8.675-8.625 8.676-8.625 21.5 0 12.825 8.625 21.325T342-285ZM207-180h546v-533H207v533Zm0 0v-533 533Z"/></svg>
                            
                                <span className="px-3">
                                    {invoice.AgentName}
                                </span>
                            </TableCell>
                            <TableCell className="font-bold text-base">{invoice.status}</TableCell>

                            <TableCell className="text-right font-bold">
                                
                                <Button variant="outline" className="border-blue-800 text-blue-800 px-8 hover:bg-blue-800  hover:text-white" onClick={
                                () => {
                                    EditBot(invoice)
                                }
                            }>
                                Edit
                            </Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Dialog open={
                showDiag
            }
            onOpenChange={setOpen}
            >
                <DialogContent className="sm:max-w-[425px] h-px-[500px]">
                    <DialogHeader>
                        <DialogTitle>{
                                actionType == "edit" ? "Edit Agent" : "Create Agent"
                            }</DialogTitle>
                        <DialogDescription>
                            Make changes to your Agent here. Click save when you are done.
                        </DialogDescription>
                        

                        
                    </DialogHeader> 
                
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="AgentName" className="text-right">
                                AgentName
                            </Label>
                            <Input id="AgentName" value={bot.AgentName}  onChange={(e)=> {
                                saveChange(e.target.value, "AgentName")
                            }}  className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="AgentStatus" className="text-right">
                                AgentStatus
                            </Label>

                            <Select onValueChange={(e)=> {
                            
                                saveChange(e, "status")
                            }}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Pending</SelectLabel>
                                        <SelectItem value="Working">Working</SelectItem>
                                        <SelectItem value="Stoped">Stoped</SelectItem>
                                        
                                        </SelectGroup>
                                </SelectContent>
                                </Select>

                            {/* <Input id="AgentStatus" value={bot.status}  onChange={(e)=> {
                                saveChange(e.target.value, 'status')
                            }} className="col-span-3" /> */}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" className='border-blue-800 bg-blue-800 text-white' onClick={()=> {
                            SaveBot()
                        }}> {

                            actionType == "edit" ? "Save changes" : "Create New"

                        } </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>

    </div>
}


export default Bots