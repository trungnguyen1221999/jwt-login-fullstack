import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
type RegisterInput = {
  name: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};
const schema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .nonempty("Name is required"),
    email: z.email("Invalid email address"),
    username: z
      .string()
      .min(3, "Username at least 3 character")
      .nonempty("Username is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .nonempty("Password is required"),
    confirmPassword: z
      .string().nonempty("Confirm Password is required")
      .min(6, "Confirm Password must be at least 6 characters")
    
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({ resolver: zodResolver(schema) });

  const onSubmit = (data: RegisterInput) => {
    console.log(data);
  };
  return (
    <div>
      <div className="flex flex-col sm:gap-3 overflow-y-auto justify-center items-center bg-avocado-500 border-10 border-purple-500">
        <h1 className="text-3xl text-purple-500 text-center font-extrabold underline mb-5 mt-10">
          Register
        </h1>
        <div className="flex gap-5 flex-col md:flex-row md:gap-10">
          <div className="bg-white p-10 rounded-3xl">
            <form onSubmit={handleSubmit(onSubmit)} className="md:w-[300px]">
              <div className="flex flex-col gap-5 items-center">
                <label className="w-full">
                  <p className="text-md mb-2"> Name:</p>
                  <input
                    className="bg-gray-300 p-2 rounded-md w-full"
                    type="text"
                    placeholder="enter your name ..."
                    {...register("name")}
                  />
                </label>
                <div className="text-red-500 text-sm -mt-3 w-full text-left">
                  {errors.name?.message}
                </div>
                <label className="w-full">
                  <p className="text-md mb-2"> Email:</p>
                  <input
                    className="bg-gray-300 p-2 rounded-md w-full"
                    type="text"
                    placeholder="enter your email ..."
                    {...register("email")}
                  />
                </label>
                <div className="text-red-500 text-sm -mt-3 w-full text-left">
                  {errors.email?.message}
                </div>
                <label className="w-full">
                  <p className="text-md mb-2"> Username:</p>
                  <input
                    className="bg-gray-300 p-2 rounded-md w-full"
                    type="text"
                    placeholder="enter your username ..."
                    {...register("username")}
                  />
                </label>
                <div className="text-red-500 text-sm -mt-3 w-full text-left">
                  {errors.username?.message}
                </div>
                <label className="w-full">
                  <p className="text-md mb-2">Password:</p>
                  <input
                    className="bg-gray-300 p-2 rounded-md w-full"
                    type="password"
                    placeholder="enter your password ..."
                    {...register("password")}
                  />
                </label>
                <div className="text-red-500 text-sm -mt-3 w-full text-left">
                  {errors.password?.message}
                </div>
                <label className="w-full">
                  <p className="text-md mb-2">Confirm Password:</p>
                  <input
                    className="bg-gray-300 p-2 rounded-md w-full"
                    type="password"
                    placeholder="enter your confirm password ..."
                    {...register("confirmPassword")}
                  />
                </label>
                <div className="text-red-500 text-sm -mt-3 w-full text-left">
                  {errors.confirmPassword?.message}
                </div>
                <button
                  type="submit"
                  className="bg-purple-500 text-white p-2 rounded-md w-full hover:cursor-pointer hover:bg-purple-700 transition"
                >
                  submit
                </button>
                <div
                  className="cursor-pointer text-center"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  <span>Already have an account ? </span>
                  <span className="underline underline-offset-3 text-blue-600 hover:text-blue-800">
                    Login
                  </span>
                </div>
              </div>
            </form>
          </div>
          <img
            className="rounded-3xl w-96 object-cover mix-blend-multiply"
            src="https://static.vecteezy.com/system/resources/thumbnails/011/432/528/small/enter-login-and-password-registration-page-on-screen-sign-in-to-your-account-creative-metaphor-login-page-mobile-app-with-user-page-flat-illustration-vector.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
