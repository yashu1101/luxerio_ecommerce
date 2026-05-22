import { useContext, useState } from "react";

import "./admin.css";
export const Admin = () => {
  const [pannel, setPannel] = useState("");
  const { user } = useContext(AuthContext);

  const togglePannel = (p) => {
    setPannel(p);
  };

  // const checkRole = () => {
  //   if (!user?.role || user?.role !== "admin") {
  //     return <AccessDenied></AccessDenied>;
  //     console.log('You are not admin')
  //   }
  // };

  // useEffect(() => {
  //   checkRole();
  // }, []);
  return (
    <>
    

      {/* {user?.role == "admin" ?  */}
      (
        <div className="admin-main">
          <div className="admin-container">
           <AdminSidebar></AdminSidebar>
            <div className="admin-content">
              {pannel == "products" && <Products></Products>}
              {pannel == "categories" && <Category></Category>}
              {pannel == "orders" && <Orders></Orders>}
              {pannel == "users" && <Users></Users>}
            </div>
          </div>
        </div>
      )
       {/* : (
        <AccessDenied></AccessDenied>
      )} */}
    </>
  );
};
