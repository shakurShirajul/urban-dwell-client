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

            {/* <section className="min-h-screen bg-base-200 flex">
                <div className="container grid grid-cols-2 mx-auto">
                    <img className="w-3/4 h-full rounded shadow-sm  aspect-square" src="https://i.ibb.co/dpSs86c/building-1.jpg" />
                    <img className="w-3/4 h-full rounded shadow-sm aspect-square" src="https://i.ibb.co/dpSs86c/building-1.jpg" />
                    <img className="w-3/4 h-full rounded shadow-sm aspect-square" src="https://i.ibb.co/dpSs86c/building-1.jpg" />
                    <img className="w-3/4 h-full rounded shadow-sm aspect-square" src="https://i.ibb.co/dpSs86c/building-1.jpg" />
                </div>
                <div className='lg:w-1/2 space-y-5 p-4'>
                    <h3 className='text-3xl font-bold uppercase'>ABOUT OUR BUILDING</h3>
                </div>
            </section> */}
            {/* <div>
                <div>
                    <img className="w-3/4 h-full rounded shadow-sm  aspect-square" src="https://i.ibb.co/dpSs86c/building-1.jpg" />
                    <img className="w-3/4 h-full rounded shadow-sm aspect-square" src="https://i.ibb.co/9cPVp3L/building-2.jpg" />
                </div>
                <div>
                    <img className="w-3/4 h-full rounded shadow-sm aspect-square" src="https://i.ibb.co/dpSs86c/building-1.jpg" />
                    <img className="w-3/4 h-full rounded shadow-sm aspect-square" src="https://i.ibb.co/dpSs86c/building-1.jpg" />
                </div>
            </div> */}
            <section className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-4xl font-extrabold text-gray-800">About the Building</h2>
                        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                            Our building is a blend of modern architecture and historical elegance. Built in the heart of the city, it offers stunning views, state-of-the-art amenities, and a rich history that adds to its charm. Whether you are here for business or leisure, our building provides a perfect environment to suit your needs.
                        </p>
                    </div>
                    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-800">Architectural Excellence</h3>
                            <p className="mt-2 text-gray-600 leading-relaxed">
                                Designed by renowned architects, the building stands as a testament to contemporary design. It features sleek lines, expansive glass windows, and sustainable materials that ensure both aesthetic appeal and environmental responsibility.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-800">Modern Amenities</h3>
                            <p className="mt-2 text-gray-600 leading-relaxed">
                                Residents and visitors can enjoy a wide range of amenities, including a rooftop garden, fitness center, and a luxurious lobby. Every aspect of the building has been crafted to offer the utmost comfort and convenience.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-800">Rich History</h3>
                            <p className="mt-2 text-gray-600 leading-relaxed">
                                Built on a site with a rich historical background, the building incorporates elements that pay homage to the past. The blend of old and new creates a unique ambiance that is both nostalgic and forward-looking.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-800">Prime Location</h3>
                            <p className="mt-2 text-gray-600 leading-relaxed">
                                Located in the heart of the city, the building offers easy access to major business districts, shopping centers, and cultural landmarks. Its prime location makes it an ideal choice for those looking to stay connected to the vibrant city life.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;