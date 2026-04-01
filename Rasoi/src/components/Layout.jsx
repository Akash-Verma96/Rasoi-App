import { Outlet } from "react-router-dom";
import FeatureBar from "./FeatureBar/FeatureBar";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fecthUser = async () => {
    if (userData) return;

    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (error) {
      if (error.response?.status === 401) {
        return navigate("/Onboarding");
      }
      console.log("ERROR : ", error.response);
    }
  };

  useEffect(() => {
    fecthUser();
  }, []);

  return (
    <div className=" w-full ">
      <Outlet />

      <FeatureBar />
    </div>
  );
}

export default Layout;
