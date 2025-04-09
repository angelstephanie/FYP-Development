import { useNavigate } from "react-router-dom";

function Home() {
  const user = {
    ehr: "123456789",
    name: "Stephen Lai",
    dob: "2001-01-01",
    gender: "Male",
    email: "lai@email.com",
    phoneNo: "5678234",
  };

  const navigate = useNavigate();

  const handleUserLogin = (user) => {
    navigate("/search", { state: { user } });
  };

  return (
    <div>
      {/* Login with iAmSmart */}
      <nav className="w-full my-3 flex">
        <img
          className="ml-15 w-20"
          src="../images/ehealth-logo.svg"
          alt="/"
        ></img>
        <h1 className="ml-[20px] mt-2 primary font-medium text-2xl">
          Electronic Health Record Sharing System
        </h1>
      </nav>
      <form className="m-auto w-1/3 flex-col flex gap-3 mt-20">
        <label htmlFor="email-input" className="blocktext-gray-900 font-medium">
          Email address
        </label>
        <input
          type="email"
          id="email-input"
          aria-describedby="helper-text-explanation"
          className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter your email"
          required
        />

        <label
          htmlFor="password-input"
          className="blocktext-gray-900 font-medium"
        >
          Password
        </label>
        <input
          type="text"
          id="password-input"
          aria-describedby="helper-text-explanation"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter your password"
          required
        />
        <button
          onClick={() => handleUserLogin(user)}
          type="button"
          className="font-semibold text-white bg-blue-600 rounded-[10px] pt-[7px] pb-[7px] mt-4"
        >
          Login
        </button>
        <div className="m-auto flex">
          <p>Don’t have an account?&nbsp;</p>
          <a
            className="text-sky-700"
            href="https://www.iamsmart.gov.hk/en/reg.html"
          >
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
}

export default Home;
