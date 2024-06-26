import React, { useContext, useState } from "react";

import { updateProfile } from "firebase/auth";
import { AuthCon } from "./AuthProv";

function Signup({ onSignupSuccess }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("arif_S");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState("");

  const { createUser } = useContext( AuthCon );

  const handleSubmit = (event) => { 
    event.preventDefault();

    createUser(email, password)
      .then((result) => {
        updateProfile(result.user, {
          displayName: username,
        })
          .then(() => {
            const p = result.user.displayName;

          })
          .catch((error) => {
            setRegisterError(error.message);
          });
      })
      .catch((error) => {
        setRegisterError(error.message);
      });
    
    console.log(registerError);
    
    onSignupSuccess(username);

    // console.log(username + ' ' + email + ' ' + password);
  };

  return (
    <>
      <div className="flex items-center justify-center text-2xl font-semibold mb-4 mt-36">Code Canvas</div>
      <div className="flex items-center justify-center">
        <div className="w-96">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label for="username" class="block text-gray-600">Username:</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" id="username" name="username" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off"
              />
            </div>

            {/*  */}
            <div className="mb-4">
              <label for="email" class="block text-gray-600">Email:</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="username" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off"
              />
            </div>


            <div className="mb-4">
              <label for="password" class="block text-gray-600">Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off"
              />
            </div>
            <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Signup</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
