// import { createBrowserRouter } from "react-router";
// import { RouterProvider } from "react-router/dom";
// import MainLayout from "./layouts/MainLayout";
// import Home from "./pages/Home";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     Component : MainLayout,
//     children : [
//       {
//         index : true,
//         element : <Home/>
//       }
//     ]
//   },
// ]);

// function Router() {
//   return (
//    <RouterProvider router={router} />
//   )
// }

// export default Router

import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Define main layout wrapper route */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutUs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
