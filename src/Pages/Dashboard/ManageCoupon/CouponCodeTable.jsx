import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
const CouponCodeTable = ({ couponCode, index, handleCouponDisable }) => {
  // console.log(coupon_Code)
  return (
    <tr className="text-base font-normal">
      <th>{index + 1}</th>
      <td>{couponCode.coupon_Code}</td>
      <td>{couponCode.coupon_Discount}</td>
      <td>{couponCode.coupon_Description}</td>
      <td>
        <button
          onClick={() => handleCouponDisable(couponCode.coupon_Code)}
          className="btn border-none bg-red-600 hover:bg-red-800 text-white w-full"
        >
          <DeleteForeverIcon Name="text-white" />
        </button>
      </td>
    </tr>
  );
};

export default CouponCodeTable;
