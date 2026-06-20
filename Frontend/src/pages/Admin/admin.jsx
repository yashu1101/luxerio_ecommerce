// import { useContext, useState } from "react";

// import "./admin.css";
// import { useUser } from "../../hooks/useUser";
// export const Admin = () => {
//   const [pannel, setPannel] = useState("");
//   const {data: user} = useUser()

//   const togglePannel = (p) => {
//     setPannel(p);
//   };
//   return (
//     <>

//       (
//         <div className="admin-main">
//           <div className="admin-container">
//            <AdminSidebar></AdminSidebar>
//             <div className="admin-content">
//               {pannel == "products" && <Products></Products>}
//               {pannel == "categories" && <Category></Category>}
//               {pannel == "orders" && <Orders></Orders>}
//               {pannel == "users" && <Users></Users>}
//             </div>
//           </div>
//         </div>
//       )

//     </>
//   );
// };
