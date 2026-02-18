import {Link} from "react-router-dom";
export function ErrorPage(){
    return (
        <div className="flex flex-col w-full py-4 items-center justify-center text-white min-h-screen">
            <h1 className="font-bold text-6xl mb-2">404</h1>
            <h1 className="font-bold text-4xl mb-4">Page not found</h1>
            <p className="italic text-1xl mb-4">Sorry, the page you are looking for does not exist.</p>
            <Link className="bg-gray-50/20 py-1 px-4 rounded-md " 
            to="/">Go back to home</Link>
        </div>
    )
}