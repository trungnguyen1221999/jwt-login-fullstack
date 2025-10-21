import { useMutation } from "@tanstack/react-query";
import React from "react";
import logoutApi from "./api/logoutApi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await logoutApi();
    },
    onSuccess: () => {
      console.log("Logged out successfully");
      localStorage.removeItem("accessToken");
      navigate("/login");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
  const handleClick = () => {
    logoutMutation.mutate();
  };
  return (
    <div className="h-screen flex justify-center item-center">
      <button
        onClick={handleClick}
        className="p-5 w-[400px] h-[200px] rounded-3xl text-3xl text-white bg-yellow-600"
      >
        logout
      </button>
    </div>
  );
};

export default Home;
