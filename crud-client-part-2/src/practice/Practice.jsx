import React from "react";

const Practice = () => {
  const handlePractice = (e) => {
    e.preventDefault();
    const from = e.target;
    const name = from.name.value;
    const email = from.email.value;
    const practiceUser = { name, email };
    //send data backend
    fetch("http://localhost:3000/practice4", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      //backend data string hisabe patabo
      body: JSON.stringify({ practiceUser }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          alert("Practice Project v:4 data added");
        }
      });
  };
  return (
    <div className="">
      <h1 className="my-3 text-white text-2xl">Practice Data send Mongodb and v:4</h1>
      <form onSubmit={handlePractice} className="flex justify-center flex-col  w-100 ">
        <input
          className="bg-blue-300 rounded p-3"
          type="text"
          name="name"
          placeholder="Enter your name"
        />
        <br />
        <input
          className="bg-blue-300 rounded p-3"
          type="text"
          name="email"
          placeholder="Enter Your email"
        />
        <input className="mt-3 p-3 bg-blue-700 rounded " type="submit" value="Add User Mongodb" />
      </form>
    </div>
  );
};

export default Practice;
