import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ExerciseList = () => {
    const [workouts, setWorkouts] = useState([]);
    const [error, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [page, setPage] = useState(1); // Current page
    const [limit, setLimit] = useState(5); // Number of workouts per page
    const [totalPages, setTotalPages] = useState(0); 

    useEffect(() => {
        setError(false);
        setLoading(true);
        axios.get(`https://backend-exercise-tracker-8bci.onrender.com/?page=${page}&limit=${limit}`)
            .then(function (response) {
                console.log(response.data);
                setWorkouts(response.data.workouts);
                setTotalPages(response.data.totalPages);
                console.log(totalPages);
                setLoading(false);
                setError(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
                setError(true);
            });
    }, [page, limit]); // Add page and limit as dependencies

    const handleDate = (date) => {
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
            {/* Pagination controls */}
            <div className="pagination mt-4 flex justify-center text-lg">
                {page>1 && <button className='' onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>}
                <span className="mx-4">Page {page}</span>
                {page<totalPages && <button onClick={() => setPage(page + 1)}>Next</button>}
            </div>
        </div>
    );
}

export default ExerciseList;
