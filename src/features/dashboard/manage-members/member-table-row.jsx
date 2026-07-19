import { HiOutlineTrash } from "react-icons/hi2";
import PropTypes from "prop-types";

const MemberTableRow = ({ member, onRemove }) => (
  <tr className="border-b border-base-content/10 last:border-0">
    <td className="px-4 py-4">
      <div className="flex items-center gap-3">
        {member.user_image ? <img src={member.user_image} alt="" width="48" height="48" className="size-12 rounded-2xl object-cover" /> : <span className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-content">{member.user_name?.charAt(0)}</span>}
        <span className="font-bold">{member.user_name}</span>
      </div>
    </td>
    <td className="max-w-xs break-words px-4 py-4 text-sm text-base-content/60">{member.user_email}</td>
    <td className="px-4 py-4 text-right">
      <button type="button" onClick={() => onRemove(member)} className="inline-flex h-10 items-center gap-2 rounded-full bg-error/10 px-4 text-sm font-bold text-error hover:bg-error hover:text-error-content" aria-label={`Remove ${member.user_name} as a member`}>
        <HiOutlineTrash aria-hidden="true" /> Remove
      </button>
    </td>
  </tr>
);

MemberTableRow.propTypes = {
  member: PropTypes.shape({
    user_image: PropTypes.string,
    user_name: PropTypes.string.isRequired,
    user_email: PropTypes.string.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default MemberTableRow;
