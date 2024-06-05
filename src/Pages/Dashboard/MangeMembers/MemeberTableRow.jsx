import React from 'react';

const MemeberTableRow = ({ member, handleRemoveButton }) => {
    return (
        <tr  className="font-mulish">
            <td>
                <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                        <img src={member.user_image} alt="Avatar Tailwind CSS Component" />
                    </div>
                </div>
            </td>

            <td>
                <div className="flex items-center gap-3">
                    <div>
                        <div className="font-bold">{member.user_name}</div>
                    </div>
                </div>
            </td>
            <td>
                <div>
                    <div className="font-bold">{member.user_email}</div>
                </div>
            </td>
            <td>
                <button onClick={()=>handleRemoveButton(member._id)} className="btn btn-error text-white font-semibold">Remove</button>
            </td>
        </tr>
    );
};

export default MemeberTableRow;