import { useParams , useNavigate} from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const ExerciseDetails = () => {
    const {id} = useParams();
    const [work, setWorkouts] = useState({});
    const [error, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);
    let navigateTo = useNavigate();

    const handleDate = (date)=>{
        return new Date(date).toDateString();
    }

    const handleDelete = (e)=>{
        e.preventDefault();
        setLoading(true);
        setError(false);
        axios.delete(`https://backend-exercise-tracker-8bci.onrender.com/exercise/${id}`)
            .then(function (response) {
                console.log(response);
                navigateTo('/');
                setLoading(false);
                setError(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
                setError(true);
            });
    }

    useEffect(() => {
        setError(false);
        setLoading(true);
        axios.get(`https://backend-exercise-tracker-8bci.onrender.com/exercise/${id}`)
            .then(function (response) {
                console.log(response.data);
                setWorkouts(response.data);
                setLoading(false);
                setError(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
                setError(true);
            });
    }, []);

    return (
        <div className="details w-3/4 md:w-1/2 p-2">
            {!error && work && !isLoading &&
            <div key={work._id} className="work p-6 cursor-pointer mt-4 rounded bg-green-100" >
                <div className="date text-xl font-bold">{handleDate(work.date)}</div>
                <div className="duration text-lg mt-6">{work.duration}</div>
                <div className="description mt-6 text-lg">{work.description}</div>
                <button onClick={(e)=>{handleDelete(e)}} className="bg-red-600 rounded px-4 py-2 mt-4 text-white">Delete</button>
            </div>
            }   
            {error && <div className="text-lg text-red-500">Oops! Something went wrong!</div>}
            {isLoading && <div className="text-lg ">Loading...</div>}
            
        </div>
    );
}
 
export default ExerciseDetails;