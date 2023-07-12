
import { Button } from "@/components/ui/button"

import { useRouter } from "next/router"
import { useContext} from "react";
import MyContext from "../context";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"



const Login = () => {
   
    const router = useRouter()
    const context = useContext(MyContext);
    function fakelogin() {
     

        context?.setUser({
            userName: "testname",
            token: 'testToken'
        })
        router.push("/botManage/bots")
    }

    return <figure className="container mx-auto px-8 pt-40 place-content-center w-96 top-44 md:flex h-1/2">

        <Card className="block place-content-center h-56 w-96">
            <CardHeader>
                <CardTitle>Login</CardTitle>
            
            </CardHeader>
            <CardContent className="place-content-center" >
                <img className="w-24 h-24 rounded-full mx-auto" src={"/static/user.png"} alt="" width="80" height="80" />
                <div className="place-content-center w-full md:flex">
                    <Button className="rounded-md text-white bg-blue-800" variant="outline" onClick={fakelogin} >Sign in with Google</Button>
                </div>
            </CardContent>
        </Card>
    </figure>
}


export default Login