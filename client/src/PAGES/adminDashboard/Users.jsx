import React, { useState } from "react";
import {
  useGetAllAdminsQuery,
  useGetAllUsersQuery,
} from "../../Features/userfeatures/Admin";
import deleteicon from "../../assets/Rectangle 42.png";
import "./Users.scss";
import {
  useDeleteAdminMutation,
  useDeleteUserMutation,
} from "../../Features/userfeatures/Admin";

const Users = () => {
  const [deleteAdmin] = useDeleteAdminMutation();
  const handleDeleteAdmin = async (id) => {
    try {
      await deleteAdmin(id);
    } catch (error) {
      console.log(error);
    }
  };

  const [deleteUser] = useDeleteUserMutation();
  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
    } catch (error) {
      console.log(error);
    }
  };

  const [selectedType, setSelectedType] = useState("Users");
  const { data: users } = useGetAllUsersQuery();
  const { data: admins } = useGetAllAdminsQuery();

  const handleButtonClick = (type) => {
    setSelectedType(type);
  };

  return (
    <div className="Users">
      <div>
        <button onClick={() => handleButtonClick("Users")}>Users</button>
        <button onClick={() => handleButtonClick("Admins")}>Admins</button>
      </div>
      {selectedType === "Users" && (
        <div>
          <div className="add-members">
            <p>Members</p>
            <button>Add New</button>
          </div>
          <h2>All Users</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>County</th>
                <th>Residence</th>
                <th>NationalID</th>
                <th>Userid</th>
                <th>Action</th>
                {/* Add other user details headers here */}
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => (
                  <tr key={user.UserID}>
                    <td>
                      {user.FirstName} {user.LastName}
                    </td>
                    <td>{user.Email}</td>
                    <td>{user.County}</td>
                    <td>{user.Residence}</td>
                    <td>{user.NationalID}</td>
                    <td>{user.UserID}</td>
                    <td
                      className="on-delete"
                      onClick={() => handleDeleteUser(user.UserID)}
                    >
                      <img src={deleteicon} alt="" />
                      DELETE!
                    </td>
                    {/* Add other user details here */}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
      {selectedType === "Admins" && (
        <div>
          <h2>All Admins</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>County</th>
                <th>Residence</th>
                <th>NationalID</th>
                <th>AdminID</th>
                <th>Action</th>
                {/* Add other admin details headers here */}
              </tr>
            </thead>
            <tbody>
              {admins &&
                admins.map((admin) => (
                  <tr key={admin.AdminID}>
                    <td>
                      {admin.FirstName} {admin.LastName}
                    </td>
                    <td>{admin.Email}</td>
                    <td>{admin.County}</td>
                    <td>{admin.Residence}</td>
                    <td>{admin.NationalID}</td>
                    <td>{admin.AdminID}</td>
                    <td
                      className="on-delete"
                      onClick={() => handleDeleteAdmin(admin.AdminID)}
                    >
                      <img src={deleteicon} alt="" />
                      DELETE!
                    </td>
                    {/* Add other admin details here */}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
