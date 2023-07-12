
import { useRouter } from "next/router"
import { useContext, useEffect} from "react";
import MyContext from "../lib/context";





const Home = () => {
   
    const router = useRouter()
    const context = useContext(MyContext);


    useEffect(()=> {
        if(!context?.user?.token) {
            router.push('/login')
        }
    })

    return <div>
        Welcome!
    </div>
}


export default Home