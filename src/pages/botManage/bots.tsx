
import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import MyContext from "../context";

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
    DialogTrigger,
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
        AgentName: "INV001",
        botId: 1111,
        status: "working",
        paymentMethod: "Credit Card",
        userId: "testName"
    },
    {
        AgentName: "INV002",
        botId: 1112,
        status: "Pending",
        paymentMethod: "PayPal",
        userId: "testName"
    },
    {
        AgentName: "INV003",
        botId: 1113,
        status: "stoped",
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
            botId: bots[bots.length -1].botId + 1

        })
        setShowDiag(true)
    }

    function saveChange(text:string,type:string) {
        setBot({
            ...bot,
            [type]: text
        })
    }

    return <div className="w-full h-full bg-white flex flex-row">
        <div className="w-80 h-full border-r-2">
            {
                user?.user?.userName ? <header>
                    {
                        user?.user?.userName
                    }
                </header> : null
            }
            <div>
                Gopher AI
            </div>
            <div className="flex flex-col">
                <Button variant="outline">
                    Agents
                </Button>
                <Button variant="outline">
                    Settings
                </Button>
            </div>
        </div>
        <div className="px-16 w-max flex-1">
            <div className="flex flex-row-reverse">
                <Button variant="outline" onClick={()=> {
                    creatNewAgent()
                }}>
                    Create Agent
                </Button>
            </div>

            <Table>
                <TableCaption>A list of your recent Agents.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Bots</TableHead>
                        <TableHead>Status</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bots.map((invoice, index) => (
                        <TableRow key={invoice.botId}>
                            <TableCell className="font-medium">{invoice.AgentName}</TableCell>
                            <TableCell>{invoice.status}</TableCell>

                            <TableCell className="text-right">
                                
                                <Button variant="outline" onClick={
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
            }>
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
                                console.log(e)
                                saveChange(e, "status")
                            }}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Pending</SelectLabel>
                                        <SelectItem value="working">working</SelectItem>
                                        <SelectItem value="stoped">stoped</SelectItem>
                                        
                                        </SelectGroup>
                                </SelectContent>
                                </Select>

                            {/* <Input id="AgentStatus" value={bot.status}  onChange={(e)=> {
                                saveChange(e.target.value, 'status')
                            }} className="col-span-3" /> */}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={()=> {
                            SaveBot()
                        }}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>

    </div>
}


export default Bots