import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <div className="navbar p-3 w-1/2 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Exercise Tracker</h1>
            <ul className="flex items-center p-3 gap-6 text-xl">
                <Link to='/'>Home</Link>
                <Link to='/add'>Add</Link>
            </ul>
        </div>
    );
}
 
export default Navbar;