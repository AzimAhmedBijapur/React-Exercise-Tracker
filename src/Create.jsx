import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {

    const [date,setDate] = useState('');
    const [dur,setDur] = useState('');
    const [desc,setDesc] = useState('');
    const [error, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const navigateTo = useNavigate()

    const handleSubmit = (e)=>{
        e.preventDefault();
        setLoading(true);
        setError(false);
        axios.post('http://127.0.0.1:5000/add',{
            date:date,
            duration:dur,
            description:desc
        })
        .then((res)=>{
            console.log(res);
            setLoading(false);
            navigateTo('/');
            setError(false);
        })
        .catch((err)=>{
            console.log(err);
            setLoading(false);
            setError(true);
        })
    }

    return (
        <div className="create w-3/4 md:w-1/2 p-2 text-lg">
            {!error && !isLoading &&
            <form action="" className="flex justify-center items-center flex-col">
                <div className="field w-full p-2">
                    <label htmlFor="date">Date:</label>
                    <input className="bg-slate-200 mt-2 w-full p-2 rounded"  id="date" onChange={(e)=>{setDate(e.target.value)}} name="date" type="date" required/>
                </div>
                <div className="field w-full p-2">
                    <label htmlFor="duration">Duration:</label>
                    <input className="bg-slate-200 mt-2 w-full p-2 rounded" id="duration" onChange={(e)=>{setDur(e.target.value)}} name="duration" type="text" required placeholder="15 mins"/>
                </div>
                <div className="field w-full p-2">
                    <label htmlFor="description">Description:</label>
                    <textarea className="bg-slate-200 mt-2 w-full p-2 rounded"  id="descriptin" onChange={(e)=>{setDesc(e.target.value)}} name="description" required placeholder="pushups x 100"/>
                </div>
                <div className="field">
                    <input type="submit" className="cursor-pointer bg-green-200 px-4 py-2 rounded" onClick={(e)=>{handleSubmit(e)}} value="Submit"/>
                </div>
            </form>
            }   
            {isLoading && <div className='text-lg'>Loading...</div>}
            {error && <div className="text-lg text-red-500">Oops! Something went wrong!</div>}
        </div>
        
    );
}
 
export default Create;