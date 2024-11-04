export const InfoCard =  ({name,image}) =>{
    return(
        // <div className="border rounded-md h-72 w-56 mx-2 bg-gray-400 cursor-pointer">
        //     <div className="h-1/6 flex justify-center items-center text-xl text-white">{name}</div>
        //     <div className="h-5/6">
        //         <img src={image} alt="name's image" className="h-full rounded-b-md"/>
        //     </div>
        // </div>
        <div className="w-64 mx-4 my-2 card-link">
        <div className="info-card p-4 bg-white rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
            <img src={image} alt={name} className="w-full h-40 object-cover rounded-lg" />
            <div className="mt-4">
            <h2 className="text-xl font-bold text-gray-800">{name}</h2>
            </div>
        </div>
        </div>
    )
}
