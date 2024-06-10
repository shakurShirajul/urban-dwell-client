import React from 'react';

const AboutUs = () => {
    return (
        <div>


            {/* <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className='lg:w-1/2 relative'>
                        <img src="https://i.ibb.co/dpSs86c/building-1.jpg" className="w-3/4 rounded-lg shadow-2xl" />
                        <img src="https://i.ibb.co/9cPVp3L/building-2.jpg" className="w-1/2 absolute right-5 top-1/2 rounded-lg border-8 border-white shadow-2xl" />
                    </div>
                    <div className='lg:w-1/2 space-y-5 p-4'>
                        <h3 className='text-3xl font-bold uppercase'>ABOUT OUR BUILDING</h3>
                    </div>
                </div>
            </div> */}

            <section className="min-h-screen bg-base-200 flex">
                <div className="container grid grid-cols-2 mx-auto">
                    <img className="w-3/4 h-full rounded shadow-sm  aspect-square" src="https://i.ibb.co/dpSs86c/building-1.jpg" />
                    <img className="w-3/4 h-full rounded shadow-sm aspect-square" src="https://i.ibb.co/dpSs86c/building-1.jpg" />
                    <img className="w-3/4 h-full rounded shadow-sm aspect-square" src="https://i.ibb.co/dpSs86c/building-1.jpg" />
                    <img className="w-3/4 h-full rounded shadow-sm aspect-square" src="https://i.ibb.co/dpSs86c/building-1.jpg" />
                </div>
                <div className='lg:w-1/2 space-y-5 p-4'>
                    <h3 className='text-3xl font-bold uppercase'>ABOUT OUR BUILDING</h3>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;