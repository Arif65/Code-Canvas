import React, { useContext, useState } from "react";
import { AuthCon } from "./AuthProv";

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("ab@gmail.com");
  const [password, setPassword] = useState("123456");
  const { signIn } = useContext(AuthCon);
  const [registerError, setRegisterError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    signIn(email, password)
      .then((result) => {
        onLoginSuccess(result.user.displayName);
        // const name = result.user.displayName;
        // console.log(name);
        // setUsername(result.user.displayName);
        // console.log(username);
      })
      .catch((error) => {
        console.log(error.code);
        setRegisterError(error.message);
    });

    onLoginSuccess(username);
    if(registerError)
      alert(registerError);
  };

  return (
    <>
      <div className="flex items-center justify-center text-2xl font-semibold mb-4 mt-36">Code Canvas</div>
      <div className="flex items-center justify-center">
        <div className="w-96">
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label for="email" class="block text-gray-600">Email:</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" id="email" name="username" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off"
              />
            </div>

            <div className="mb-4">
              <label for="password" class="block text-gray-600">Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off"
              />
            </div>
            <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
