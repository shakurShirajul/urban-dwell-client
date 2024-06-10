import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

const CouponCodeTable = ({ couponCode, index, handleCouponDisable }) => {
    // console.log(coupon_Code)
    return (
        <tr className='text-base font-normal'>
            <th>{index + 1}</th>
            <td>{couponCode.coupon_Code}</td>
            <td>{couponCode.coupon_Discount}</td>
            <td>{couponCode.coupon_Description}</td>
            <td>
                <div>
                    <div className='flex gap-2'>
                        <button
                            onClick={() => handleCouponDisable(couponCode.coupon_Code)}
                            className="btn btn-error p-1 md:p-2 flex justify-center items-center text-white text-sm md:text-base">
                            <CloseIcon className='text-white' />
                            <span>Disable</span>
                        </button>
                    </div>
                </div>
            </td>
        </tr>
    );
};

export default CouponCodeTable;