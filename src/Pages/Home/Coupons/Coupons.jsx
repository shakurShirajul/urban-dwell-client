import React from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const Coupons = () => {

    const axiosPublic = useAxiosPublic();

    const { data: coponsDisplay = [], refetch } = useQuery({
        queryKey: ['coponsDisplay'],
        queryFn: async () => {
            const response = await axiosPublic.get(`/coupon-code`, { withCredentials: true });
            return response.data;
        }
    })

    console.log(coponsDisplay)

    return (
        <div>
            
        </div>
    );
};

export default Coupons;