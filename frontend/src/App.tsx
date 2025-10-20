import "./App.css";

function App() {
  return (
    <>
      <div className="flex flex-col-reverse sm:gap-10 h-screen md:flex-row justify-center items-center bg-avocado-500 ">
        <div className="bg-white p-10 rounded-3xl">
          <h1 className="text-3xl text-purple-500 text-center font-extrabold underline mb-5">
            Login
          </h1>
          <form action="">
            <div className="flex flex-col gap-5 items-center">
              <label>
                Username:{" "}
                <input
                  className="bg-gray-300 p-2 rounded-md ml-2"
                  type="text"
                  placeholder="enter your username ..."
                />
              </label>
              <label>
                Password:{" "}
                <input
                  className="bg-gray-300 p-2 rounded-md ml-2"
                  type="password"
                  placeholder="enter your password ..."
                />
              </label>
              <button className="bg-purple-500 text-white p-2 rounded-md w-full hover:cursor-pointer hover:bg-purple-700 transition">
                submit
              </button>
            </div>
          </form>
        </div>
        <img className="rounded-3xl w-96 object-cover mix-blend-multiply"
          src="https://static.vecteezy.com/system/resources/thumbnails/011/432/528/small/enter-login-and-password-registration-page-on-screen-sign-in-to-your-account-creative-metaphor-login-page-mobile-app-with-user-page-flat-illustration-vector.jpg"
          alt=""
        />
      </div>
    </>
  );
}

export default App;
