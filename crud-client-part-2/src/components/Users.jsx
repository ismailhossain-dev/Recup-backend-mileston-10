import React from "react";

const Users = () => {
  const handleAddUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    console.log(name, email);
  };
  return (
    <div>
      <form onSubmit={handleAddUser}>
        <input className="border border-white" name="name" type="text" />
        <br />
        <input className="border border-white mt-2 " name="email" type="email" />
        <br />
        <input className="bg-sky-600 py-2 px-3 mt-3 rounded-md" type="submit" value="Add User " />
      </form>
    </div>
  );
};

export default Users;
