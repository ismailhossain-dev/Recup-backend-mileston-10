import React from "react";
import { useLoaderData } from "react-router";

const UserDetail = () => {
  //data load main.jsx
  const user = useLoaderData();
  console.log(user);
  return <div>UserDetail</div>;
};

export default UserDetail;
