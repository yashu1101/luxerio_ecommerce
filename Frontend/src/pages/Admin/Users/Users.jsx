import { api } from "../../../api/axios";
import "./Users.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUser, faUserGear } from "@fortawesome/free-solid-svg-icons";
import { Loader } from "../../../components/Loader/Loader";
import { DateFormator } from "../../../utility/DateFormator";
import { AdminAnimation } from "../../../components/Animations/AdminAnimation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const Users = () => {
  //   FETCH USERS
  const { data: users, isLoading } = useQuery({
    queryKey: ["allUser"],
    queryFn: async () => {
      const res = await api.get("users");
      return res?.data;
    },
  });

  // UPDATE ROLE
  const queryClient = useQueryClient();
  const { mutate: updateRoleMutate, isPending } = useMutation({
    mutationFn: async (userId) => {
      const res = await api.patch("users/role/update", {
        userId: userId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allUser"]);
      console.log("Role updated.");
    },
    onError: (error) =>
      console.log(error?.response?.data?.message || "Role not updated."),
  });

  //  DELETE USER
  const { mutate: deleteUserMutate, isPending: isDeletePending } = useMutation({
    mutationFn: async (userId) => {
      const res = await api.delete(`users/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allUser"]);
      console.log("User deleted.");
    },
    onError: (error) =>
      console.log(error?.response?.data?.message || "User not deleted."),
  });

  // Loading

  if (isLoading) {
    return <Loader height={"100dvh"}></Loader>;
  }

  return (
    <AdminAnimation>
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
                      {DateFormator(user?.createdAt) || "N/A"}
                    </td>

                    <td className="user-table-coll user-action-coll ">
                      <div className="user-action-container">
                        {user?.role === "admin" ? (
                          <FontAwesomeIcon
                            onClick={() => updateRoleMutate(user?._id)}
                            className="admin-user-action-button action-edit"
                            icon={faUserGear}></FontAwesomeIcon>
                        ) : (
                          <FontAwesomeIcon
                            onClick={() => updateRoleMutate(user?._id)}
                            className="admin-user-action-button action-edit"
                            icon={faUser}></FontAwesomeIcon>
                        )}{" "}
                        <FontAwesomeIcon
                          onClick={() => deleteUserMutate(user?._id)}
                          className="admin-user-action-button action-delete"
                          icon={faTrash}></FontAwesomeIcon>{" "}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminAnimation>
  );
};
