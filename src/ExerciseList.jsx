import axios from 'axios';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

const ExerciseList = () => {
    const [workouts, setWorkouts] = useState([]);
    const [error, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setError(false);
        setLoading(true);
        axios.get('https://backend-exercise-tracker-8bci.onrender.com/')
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

    const handleDate = (date)=>{
        return new Date(date).toDateString();
    }

    return (
        <div className="exercise-list p-2 mb-12">
            {workouts && !error && !isLoading && workouts.map((work) => (
                <div key={work._id} className="work p-6  rounded bg-green-100 cursor-pointer mt-4" >
                    <Link to={`/exercise/${work._id}`}>
                    <div className="date text-lg font-bold">{handleDate(work.date)}</div>
                    <div className="duration mt-2">{work.duration}</div>
                    </Link>
                </div>
            ))}
            {isLoading && <div className='text-lg'>Loading...</div>}
            {error && <div className="text-lg text-red-500">Oops! Something went wrong!</div>}
        </div>
    );
}

export default ExerciseList;
