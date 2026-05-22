import { useEffect, useState } from "react";
import { api } from "../../../api/axios";
import "./Users.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faEdit,
  faTrash,
  faUser,
  faUserGear,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { Loader } from "../../../components/Loader/Loader";
import { DateFormator } from "../../../utility/DateFormator";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  //   fetch users

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("users");
      setUsers(res?.data);
    } catch (error) {
      setError(error.response.data.message || "Somthing went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Update role

  const updateRole = async (userId) => {
    try {
      const res = await api.patch("users/role/update", {
        userId: userId,
      });
      fetchUsers();
      console.log(res.data.message);
    } catch (error) {}
  };

  //   delete users
  const deleteUser = async (userId) => {
    try {
      const res = await api.delete(`users/${userId}`);
      setMessage(res.data.message);
      fetchUsers();
    } catch (error) {
      setError(error.response.data.message || "Somthing went wrong!");
    }
  };

  // Loading

  if (loading) {
    return (
      <div className="admin-users-container">
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div className="admin-users-container">
      <div className="admin-users-header">
        <span className="admin-users-heading">Users</span>
      </div>
      <div className="admin-users-table-container">
        <table className="admin-users-table">
          <thead>
            <tr>
              <th className="users-table-heading">Name</th>
              <th className="users-table-heading">Email</th>
              <th className="users-table-heading">Role</th>
              <th className="users-table-heading">RegisteredAt</th>
              <th className="users-table-heading">Action</th>
            </tr>
          </thead>

          <tbody>
            {users?.map((user) => {
              return (
                <tr className="admin-user-table-row" key={user?._id}>
                  <td className="user-table-coll user-name-coll ">
                    {" "}
                    {user?.username}
                  </td>
                  <td className="user-table-coll user-slug-coll ">
                    {user?.email}
                  </td>
                  <td
                    className={`user-table-coll user-role-coll ${user?.role === "admin" ? "user-admin-coll" : ""}`}>
                    <span
                      className={`user-role-text ${user?.role === "admin" ? "role-admin" : "role-user"}`}>
                      {" "}
                      {user?.role}
                    </span>
                  </td>
                  <td className="user-table-coll user-registered-at-coll ">
                    {DateFormator(user?.createdAt) || "N/A" }
                  </td>

                  <td className="user-table-coll user-action-coll ">
                    {" "}
                    {user?.role === "admin" ? (
                      <FontAwesomeIcon
                        onClick={() => updateRole(user?._id)}
                        className="admin-user-action-button action-edit"
                        icon={faUserGear}></FontAwesomeIcon>
                    ) : (
                      <FontAwesomeIcon
                        onClick={() => updateRole(user?._id)}
                        className="admin-user-action-button action-edit"
                        icon={faUser}></FontAwesomeIcon>
                    )}{" "}
                    <FontAwesomeIcon
                      onClick={() => deleteUser(user?._id)}
                      className="admin-user-action-button action-delete"
                      icon={faTrash}></FontAwesomeIcon>{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
     
    </div>
  );
};
