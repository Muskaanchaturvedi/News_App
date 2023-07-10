import "./App.css";

import React, { useState} from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import LoadingBar from 'react-top-loading-bar'
import { createBrowserRouter,RouterProvider,Route,Outlet,} from "react-router-dom";


const pageSize=5;



const App =()=> {

   const apiKey=process.env.REACT_APP_NEWS_API
   const [progress, setProgress] = useState(0)
   
  const rou = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <LoadingBar height={3} color='#f11946' progress={progress}/>
          <Outlet />
        </>
      ),
      children: [
        {
          index: true,
          element: <News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key="general" country={"in"} category={"general"} />,
        },
  
        {
          path: "/business",
          element: <News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key="business"country={"in"} category={"business"} />,
        },
        {
          path: "/entertainment",
          element: <News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize}  key="entertainment"country={"in"} category={"entertainment"} />,
        },
        {
          path: "/general",
          element: <News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize}  key="general" country={"in"} category={"general"} />,
        },
        {
          path: "/health",
          element: <News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize}   key="ealth" country={"in"} category={"health"} />,
        },
        {
          path: "/science",
          element: <News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize}  key="science" country={"in"} category={"science"} />,
        },
        {
          path: "/sports",
          element: <News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize}  key="sports" country={"in"} category={"sports"} />,
        },
        {
          path: "/technology",
          element: <News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize}   key="technology" country={"in"} category={"technology"} />,
        },
      ],
    },
  ]);
    return (
      <>
        <RouterProvider router={rou} />
      </>
    );
}
export default App
