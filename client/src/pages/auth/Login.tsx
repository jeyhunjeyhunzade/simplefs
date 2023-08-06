import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { loginAccount } from "@app/api/auth";
import { Routes } from "@app/router/rooter";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const { mutate, isLoading, error } = useMutation<any, Error, any>(
    loginAccount,
    {
      onSuccess: (data) => {
        localStorage.setItem("token", JSON.stringify(data.token));

        navigate(Routes.homepage);
      },
      onError: ({ response }: any) => {
        const message = response.data.message;
        toast.error(message);
      },
    }
  );

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="/it.jfif"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
            </div>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                }}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                }}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                mutate({
                  password,
                  email,
                });
              }}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>

          <div>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                navigate(Routes.signup);
              }}
              className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:text-indigo-500"
            >
              Click to Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
