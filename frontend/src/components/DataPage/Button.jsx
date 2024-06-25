const Button = ({item,setAddItem})=>{
    const handleClick = ()=>{
        setAddItem(item.split(" ").slice(-1)[0])
    }
    return(
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-4"
        onClick={handleClick}>
                {item}
        </button>
    )
}
export default Button