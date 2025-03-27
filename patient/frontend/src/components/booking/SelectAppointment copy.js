import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Detail() {
    const location = useLocation();
    const appointment = location.state.appointment;

    const [isDatesOpen, setIsDatesOpen] = useState(true);
    const toggleAccordion = () => {
        setIsDatesOpen(!isDatesOpen);
    }

    const [isTimeOpen, setIsTimeOpen] = useState(false);
    const toggleTime = () => {
        setIsTimeOpen(!isTimeOpen);
    }
    
    const navigate = useNavigate();
    const bookProfessional = (appointment) => {
        navigate('/bookAppointment', { state: { appointment } });
    };

    console.log("Functions: getAllMedicalProfessionals, getAvailableAppointments")
    return (
        <div className="flex flex-row ">
            <div className='w-6/10 ml-15 mt-10'>
                <div className='flex ' >
                    <img className="size-25" src={`${process.env.PUBLIC_URL}/images/hospital.png`} alt='' />
                    <div className='ml-10'>
                        <p className="text-base font-semibold text-gray-600">{appointment.type}</p>
                        <p className="text-3xl font-bold mt-2">{appointment.name}</p>
                        <p className="text-xs text-gray-600 font-semibold mt-1">{appointment.service}</p>
                    </div>
                </div>
                <hr className="mt-5 mb-4 h-px bg-gray-300 border-0 "></hr>
                <div className='text-lg font-semibold mb-5'>Available Doctors</div>
                <div className='gap-4 ml-5 flex flex-col'>
                            <button type="button" className="flex gap-3 items-center text-emerald-900 hover:text-white border border-emerald-900 hover:bg-emerald-900 focus:ring-4 focus:outline-none focus:ring-emerald-900 font-medium rounded-sm text-sm px-4 py-2 text-center mt-2 mb-2">
                                <img className=" size-[40px]" alt="record-icon" src="../images/record-icon1.png"></img>
                                <div>Professional A</div>
                            </button>
                            <button type="button" className="flex gap-3 items-center text-emerald-900 hover:text-white border border-emerald-900 hover:bg-emerald-900 focus:ring-4 focus:outline-none focus:ring-emerald-900 font-medium rounded-sm text-sm px-4 py-2 text-center mt-2 mb-2">
                                <img className=" size-[40px]" alt="record-icon" src="../images/record-icon2.png"></img>
                                <div>Professional B</div>
                            </button>
                            <button type="button" className="flex gap-3 items-center text-emerald-900 hover:text-white border border-emerald-900 hover:bg-emerald-900 focus:ring-4 focus:outline-none focus:ring-emerald-900 font-medium rounded-sm text-sm px-4 py-2 text-center mt-2 mb-2">
                                <img className=" size-[40px]" alt="record-icon" src="../images/record-icon3.png"></img>
                                <div>Professional C</div>
                            </button>
                        </div>
            </div>
            <div className='mb-[200px] mt-[80px] w-4/10 flex-col flex gap-8  '>
                <div className="flex justify-center gap-7 flex-wrap">

                    <div key={appointment.id} className="w-100  p-5 bg-white border border-gray-100 rounded-[5px] shadow-sm hover:bg-gray-50">
                        <h2 className="text-xl font-semibold mt-4 mb-5" id="heading">Appointments</h2>
                        <div className="flex gap-4 items-center w-85">
                            <img src={`${process.env.PUBLIC_URL}/images/mappin.png`} className="w-5 h-6.5" alt="" />
                            <p className='text-sm text-gray-700'>{appointment.name}, XX Road 33, Tai Po, New Territories</p>

                        </div>
                        <div className='mt-5'>
                            <div id="accordion-collapse" data-accordion="collapse">
                                <h2 id="accordion-collapse-heading-1">
                                    <button
                                        type="button"
                                        className="flex items-center justify-between w-full py-4 pr-3 font-medium rtl:text-right text-md rounded-md  gap-3"
                                        data-accordion-target="#accordion-collapse-body-1"
                                        aria-expanded={isDatesOpen}
                                        aria-controls="accordion-collapse-body-1"
                                        onClick={toggleAccordion}
                                    >
                                        <span>Available Dates</span>
                                        <svg
                                            data-accordion-icon
                                            className={`w-3 h-3 rotate-${isDatesOpen ? '0' : '180'} shrink-0`}
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 10 6"
                                        >
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                                        </svg>
                                    </button>
                                </h2>
                            </div>
                            <div id="accordion-collapse-body-1" className={isDatesOpen ? '' : 'hidden'} aria-labelledby="accordion-collapse-heading-1">
                                <button type="button" className="text-emerald-900 hover:text-white border border-emerald-900 hover:bg-emerald-900 focus:ring-4 focus:outline-none focus:ring-emerald-900 font-medium rounded-full text-sm px-4 py-2 text-center me-2 mb-2">Sun, 16 Mar</button>
                                <button type="button" className="text-emerald-900 hover:text-white border border-emerald-900 hover:bg-emerald-900 focus:ring-4 focus:outline-none focus:ring-emerald-900 font-medium rounded-full text-sm px-4 py-2 text-center me-2 mb-2">Mon, 17 Mar</button>
                                <button type="button" className="text-emerald-900 hover:text-white border border-emerald-900 hover:bg-emerald-900 focus:ring-4 focus:outline-none focus:ring-emerald-900 font-medium rounded-full text-sm px-4 py-2 text-center me-2 mb-2">Tue, 18 Mar</button>
                                <button type="button" className="text-emerald-900 hover:text-white border border-emerald-900 hover:bg-emerald-900 focus:ring-4 focus:outline-none focus:ring-emerald-900 font-medium rounded-full text-sm px-4 py-2 text-center me-2 mb-2">Wed, 19 Mar</button>
                                <button type="button" className="text-emerald-900 hover:text-white border border-emerald-900 hover:bg-emerald-900 focus:ring-4 focus:outline-none focus:ring-emerald-900 font-medium rounded-full text-sm px-4 py-2 text-center me-2 mb-2">Thu, 20 Mar</button>
                                <button type="button" className="text-red-900 hover:text-white border border-red-900 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-900 font-medium rounded-full text-sm px-4 py-2 text-center me-2 mb-2">Others</button>
                            </div>
                        </div>
                        <div className="mt-2">
                            <div className="relative inline-block text-left w-full mt-3 ">
                            <span className=' py-4 pr-3 font-medium rtl:text-right text-md '>Available Time</span>
                                <div className='mt-3'> 
                                    <button type="button" className="inline-flex w-full justify-between text-md rounded-lg font-medium items-center border border-gray-300 text-gray-900rounded-lg  block w-full p-2.5" id="menu-button" aria-expanded={isTimeOpen} aria-haspopup="true"
                                        onClick={toggleTime}>
                                            Please Select
                                        <svg
                                            data-accordion-icon
                                            className={`w-3 h-3 rotate-${isTimeOpen ? '0' : '180'} shrink-0`}
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 10 6"
                                        >
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                                        </svg>
                                    </button>
                                </div>


                                <div className={isTimeOpen ? '' : 'hidden' }  role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                    <div className="py-1 absolute right-0 z-10  w-full origin-top-right rounded-md bg-white ring-1 shadow-md ring-black/5 focus:outline-hidden" role="none">
                                        <a href="/" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-0">09:00 - 10:00</a>
                                        <a href="/" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-1">13:00 - 14:00</a>
                                        <a href="/" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-2">15:00 - 16:00</a>
                                    </div>
                                </div>
                            </div>
                            <button
                                type='button'
                                onClick={()=>bookProfessional(appointment)}
                                className="inline-flex w-full mt-5 justify-center gap-x-1.5 rounded-md bg-emerald-900 px-3 py-2 text-sm font-semibold text-white shadow-xs ring-stone-300 ring-inset hover:bg-white hover:text-black">Book</button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default Detail;