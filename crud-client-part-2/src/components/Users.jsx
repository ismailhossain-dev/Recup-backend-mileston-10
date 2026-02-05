import React, { use, useState } from "react";
import { Link } from "react-router";

const Users = ({ promise }) => {
  //getting data from backend
  const initialUsers = use(promise);
  const [user, setUser] = useState(initialUsers);
  //post data backend
  const handleAddUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    console.log(name, email);
    const newUser = { name, email };
    //save this user data to the database (via server)
    fetch("http://localhost:3000/users", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          //amra ekane frontend sobkichu nisi and add korsi backend id ta
          const savedUser = { ...newUser, _id: data.insertedId };
          //reload kora chaira data ta add kortesi
          // Spread operator mardome savedUser take add korsi
          setUser([...user, savedUser]);

          alert("users successfully added");
          e.target.reset();
        }
      });
  };

  //delete user work
  const handleDeleteUser = (id) => {
    // console.log(id);
    console.log("delete button clicked");
    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount) {
          alert("deleted successfully");
          //reload deya chara delete korar kaj
          //button jetate click korbo and  etar jodi client id mile na take tahole se delete hoye
          const remaining = user.filter((users) => users._id !== id);
          setUser(remaining);
        }
      });
  };

  return (
    <div className="">
      <h3 className="text-3xl text-center font-bold text-white my-3">Users: {user.length}</h3>
      <form onSubmit={handleAddUser} className=" flex justify-center items-center flex-col    ">
        <input
          className="border-2 text-blue-400 p-2"
          type="text"
          name="name"
          id=""
          placeholder="Enter your name "
        />
        <br />
        <input
          className="border-2 text-blue-400 p-2"
          type="text"
          name="email"
          id=""
          placeholder="Enter your email"
        />
        <input type="submit" value="Add Users" className="bg-blue-500 p-3 rounded  mt-4" />
      </form>

      {/* fetch code */}
      <div className="text-white text-center">
        <h1 className="text-4xl text-pink-500 my-2 font-bold"> Getting user Data</h1>
        {user.map((user) => (
          <div key={user._id}>
            <p>
              {user.name} : {user.email}
              <Link className="bg-green-500 p-3 text-white rounded mx-3" to={`/user/${user._id}`}>
                Details page
              </Link>
              <Link className="bg-blue-500 text-white p-3 rounded" to={`/update/${user._id}`}>
                Update
              </Link>
              <button
                onClick={() => handleDeleteUser(user._id)}
                className="bg-red-500 text-white p-2 rounded m-3"
              >
                Delete
              </button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
