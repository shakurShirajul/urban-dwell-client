import GridViewIcon from '@mui/icons-material/GridView';
import ApartmentIcon from '@mui/icons-material/Apartment';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PaidIcon from '@mui/icons-material/Paid';
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProviders';
import { useNavigate } from 'react-router-dom';

const AparmentsCard = ({ apartment, handleAgreement, agreement }) => {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const { _id, apartment_image, floor_no, block_name, apartment_no, rent } = apartment;
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl p-5 border">
                <figure className="">
                    <img src={apartment_image} alt="Apartment Image" className="rounded-xl" />
                </figure>
                <div className='my-5'>
                    <div className=''>
                        <h2 className="card-title"><MeetingRoomIcon />Floor No: {floor_no}</h2>
                        <h2 className="card-title"><GridViewIcon />Block Name: {block_name}</h2>
                        <h2 className="card-title"><ApartmentIcon />Apartment No: {apartment_no}</h2>
                    </div>
                    <div className='flex'>
                        <h2 className="card-title text-green-600 text-2xl"><PaidIcon />RENT: ${rent}</h2>
                    </div>
                </div>
                <button
                    disabled={agreement.length === 1}
                    onClick={() => { user ? handleAgreement(apartment) : navigate('/login') }}
                    className="btn btn-primary w-full text-base text-white uppercase">Agreement</button>
            </div>
        </div>
    );
};

export default AparmentsCard;