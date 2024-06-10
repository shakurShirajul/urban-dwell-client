import { Link } from 'react-router-dom';
import { FaSadTear } from "react-icons/fa";

const PageNotFound = () => {
    return (
        <div className='w-screen h-screen font-roboto'>
            <div className='m-auto w-full h-full flex items-center justify-center'>
                <div className='mx-5 md:mx-0 space-y-5'>
                    <h1 className='flex gap-2 font-grotsk text-center font-medium text-4xl md:text-9xl'>404 Page Not Found</h1>
                    <div className='flex items-center justify-center'>
                        <Link to="/">
                            <button
                                className='p-2 text-xl md:py-4 md:px-5 md:text-2xl font-bold text-white rounded-2xl bg-green-600 hover:border-none hover:bg-green-800 '
                            >
                                Go Back
                            </button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PageNotFound;