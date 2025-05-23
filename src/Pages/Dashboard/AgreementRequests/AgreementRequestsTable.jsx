import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";

const AgreementRequestsTable = ({
  agereementRequest,
  handleAcceptButton,
  handleRejectButton,
}) => {
  const {
    _id,
    user_name,
    user_email,
    floor_no,
    block_name,
    apartment_no,
    rent,
    status,
    agreement_request_date,
  } = agereementRequest;

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate = new Date(agreement_request_date);
  const date = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  return (
    <tr className="text-base font-medium">
      <td>
        <div>
          <p>{user_name}</p>
        </div>
      </td>
      <td>
        <div>
          <p>{user_email}</p>
        </div>
      </td>
      <td>
        <div>
          <p>{floor_no}</p>
        </div>
      </td>
      <td>
        <div>
          <p>{block_name}</p>
        </div>
      </td>
      <td>
        <div>
          <p>{apartment_no}</p>
        </div>
      </td>
      <td>
        <div>
          <p>${rent}</p>
        </div>
      </td>
      <td>
        <div>
          <p>{`${date}th ${monthNames[month]} ${year}`}</p>
        </div>
      </td>
      <td>
        <div>
          <div className="flex gap-2">
            <button
              onClick={() => handleRejectButton(_id)}
              className="btn bg-red-600 border-none hover:bg-red-800"
            >
              <CancelIcon className="text-white" />
            </button>
            <button
              onClick={() => handleAcceptButton(_id)}
              className="btn bg-green-500 border-none hover:bg-green-700"
            >
              <CheckIcon className="text-white" />
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default AgreementRequestsTable;
