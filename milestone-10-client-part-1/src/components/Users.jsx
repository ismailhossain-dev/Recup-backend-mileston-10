import React, { use, useState } from "react";

const Users = ({ userPromise }) => {
  const initialUsers = use(userPromise);

  //from teke ja data patai tesi segol backend store hoy and backend abr cliient pataitese tai agolo load korara jorno useState use korsi
  const [users, setUsers] = useState(initialUsers);

  const handleAddUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    console.log("clicked name & email", name, email);
    const newUser = { name, email };
    //send from data backend or sever
    fetch("http://localhost:3000/users", {
      //post ta uppercase ba lowercase dithe parbo
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      //newUser ta backend patai diyesi
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after post", data);
        console.log("test");
        //users ...morde ja data sob gola nichu and add korsi data
        const newUsers = [...users, data];
        setUsers(newUsers);
        //backend data patanor pore amra from take reset kore divo
        e.target.reset();
      });
  };
  return (
    <div>
      {/* send from data backend */}
      <div>
        <h3>Add a user</h3>
        <form onSubmit={handleAddUser}>
          <input name="name" type="text" />
          <br />
          <input type="email" name="email" id="" />
          <br />
          <button>Add user</button>
        </form>
        {/* users map  */}
      </div>
      {users.map((user) => (
        <p key={user.id}>
          {user.name} Email : {user.email}
        </p>
      ))}
    </div>
  );
};

export default Users;
