import React, { useContext } from 'react';
import useAxiosSecure from '../../../hooks/userAxiosSecure';
import { AuthContext } from '../../../Providers/AuthProviders';
import { ToastContainer } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import CouponCodeTable from './CouponCodeTable';

const ManageCoupons = () => {

    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const { successToast } = useContext(AuthContext);

    const { data: couponCodes = [], refetch } = useQuery({
        queryKey: ['couponCodes'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/coupon-code`)
            return res.data;
        }
    })

    const handleCreateCoupon = (event) => {
        event.preventDefault();
        const form = event.target;

        const couponData = {
            couponCode: form.couponCode.value,
            couponDiscount: form.couponDiscount.value,
            couponDescription: form.couponDescription.value,
        }
        axiosSecure.post(`/create-coupon`, couponData)
            .then((response) => {
                console.log(response.data);
                successToast("Coupon created successfully");
                refetch();
                form.reset();
            })

    }

    const handleCouponDisable = (couponId) => {
        axiosSecure.delete(`/delete-coupon/${couponId}`)
            .then((response) => {
                console.log(response.data);
                successToast("Coupon disabled successfully");
                refetch();
            })
    }

    console.log(couponCodes);

    return (
        <div className='p-5 font-roboto'>
            <p className='text-3xl font-semibold mb-5'>ManageCoupons</p>
            <div>
                <button
                    className="btn btn-success text-white text-base font-bold mb-5"
                    onClick={() => document.getElementById('my_modal_5').showModal()}>
                    Add Coupon
                </button>
                <dialog className="modal modal-bottom sm:modal-middle">
                    <form onSubmit={handleCreateCoupon} className="modal-box">
                        <div className='space-y-2'>
                            <div className='flex gap-5'>
                                <div className='space-y-1 flex-1'>
                                    <p className='font-semibold'>Coupon Code: </p>
                                    <input type="text" name="couponCode" className="w-full text-black rounded-lg py-1 pl-2 border" />
                                </div>
                                <div className='space-y-1 flex-1'>
                                    <p className='font-semibold'>Dsicount Percentage(%): </p>
                                    <input type="number" name="couponDiscount" className="w-full text-black rounded-lg py-1 px-2 border" />
                                </div>
                            </div>
                            <div className='space-y-1'>
                                <p className='font-semibold'>Coupon Description:</p>
                                <input type="text" name='couponDescription' className="w-full text-black rounded-lg py-1 pl-2.5 border" />
                            </div>
                        </div>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn btn-error text-white text-base font-bold ">Close</button>
                            </form>
                            <div>
                                <button type='submit' className='btn btn-success text-white text-base font-bold '>Save</button>
                            </div>
                        </div>
                    </form>
                </dialog>

                <div className="overflow-x-auto border rounded-xl">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead className='text-base font-semibold'>
                            <tr>
                                <th></th>
                                <th>Coupon Code</th>
                                <th>Discount Percentage</th>
                                <th>Coupon Description</th>
                                <th>Availability</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                couponCodes.map((couponCode, index) =>
                                    <CouponCodeTable couponCode={couponCode} index={index} handleCouponDisable={handleCouponDisable} />
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ManageCoupons;