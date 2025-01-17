import React from "react";
import { useParams, Link } from "react-router-dom";
import "./RobotDetails.css";
import { useSelector } from "react-redux";

export default function RobotDetails() {
  const { username } = useParams();
  const users = useSelector((state) => state.users.users);
  const user = users.find((user) => user.username === username);

  return (
    <div className="robotDetails">
      <img src={user.pic} alt={`${user.name}'s picture`} />
      <h2>{user.name}</h2>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Address:</strong> {user.address.street}, {user.address.city}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
      <Link to="/" className="backLink">
        Back
      </Link>
    </div>
  );
}
