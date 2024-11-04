import { useState } from "react"
import { Navbar } from "../components/DataPage/NavBar"
import SendData from "../components/DataPage/SendData"

const AddData = ()=>{
    const [addItem,setAddItem] = useState(null)
    return(
            <div className="h-screen">
                <Navbar setAddItem={setAddItem}/>
                <SendData item={addItem}/>
            </div>
    )
}
export default AddData