import GridViewIcon from "@mui/icons-material/GridView";
import ApartmentIcon from "@mui/icons-material/Apartment";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PaidIcon from "@mui/icons-material/Paid";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import { useNavigate } from "react-router-dom";

const AparmentsCard = ({ apartment, handleAgreement, agreement }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { _id, apartment_image, floor_no, block_name, apartment_no, rent } =
    apartment;
  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl p-5 border font-mulish">
        <figure>
          <img
            src={apartment_image}
            alt="Apartment Image"
            className="rounded-xl h-60 w-full"
          />
        </figure>
        <div className="mt-5 space-y-1">
          {/* Floor Block Apartment No */}
          <div className="">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-0.5 text-sm">
                <MeetingRoomIcon fontSize="small" />
                <span className="font-bold">Floor: </span>
                {floor_no}
              </h2>
              <h2 className="flex items-center gap-0.5 text-sm">
                <GridViewIcon fontSize="small" />
                Block: {block_name}
              </h2>
              <h2 className="flex items-center gap-0.5">
                <ApartmentIcon fontSize="small" />
                Apartment No: {apartment_no}
              </h2>
            </div>
          </div>
          {/* Rent */}
          <div className="flex items-center justify-end py-1">
            <h2 className="flex font-semibold items-center gap-1 text-green-600 text-xl">
              <span>RENT:</span>
              <div className="flex items-center gap-0.5">
                <PaidIcon /> <span> {rent}</span>
              </div>
            </h2>
          </div>
          {/* Agreement Button */}
          <div>
            {" "}
            <button
              disabled={agreement.length === 1}
              onClick={() => {
                user ? handleAgreement(apartment) : navigate("/login");
              }}
              className="btn btn-primary w-full text-lg text-white uppercase font-bold"
            >
              Agreement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AparmentsCard;
