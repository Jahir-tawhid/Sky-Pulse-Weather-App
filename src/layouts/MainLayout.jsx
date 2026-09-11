// import { Outlet } from "react-router";

// const MainLayout = () => {
//     return (

//             <div  className="min-h-screen flex justify-center items-center">
//                 <Outlet/>
//             </div>

//     );
// };

// export default MainLayout;

import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    // Main container wrapper to center children across the full screen
    <div className="min-h-screen flex justify-center items-center bg-gray-900">
      <Outlet />
    </div>
  );
};

export default MainLayout;
