import React from "react";
import { useLoaderData } from "react-router";

const UpdateUser = () => {
  const user = useLoaderData();
  console.log(user);

  //update user
  const handleUpdateUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    console.log(name, email);
    //object hisabe database data send korthe hoy
    const updateUser = { name, email };
    //send data to the server
    fetch(`http://localhost:3000/users/${user._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      //body mardome amra backend data pataitesi
      body: JSON.stringify(updateUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after update", data);
      });
  };
  return (
    <div>
      <h1>Hello Update</h1>
      {/* update user */}
      <form onSubmit={handleUpdateUser}>
        <input
          className="border border-blue-400 tex-sm font-fold"
          type="name"
          name="name"
          placeholder="Enter your name"
          id=""
          defaultValue={user.name}
        />
        <br />
        <input
          className="border border-blue-400 mt-2"
          type="email"
          name="email"
          placeholder="Enter your email"
          id=""
          defaultValue={user.email}
        />
        <br />
        <input
          className="bg-yellow-500 rounded p-2 mt-2 flex  ml-6"
          type="submit"
          value="Update User"
        />
      </form>
    </div>
  );
};

export default UpdateUser;
