import React from "react";
import { useParams, Link } from "react-router-dom";
import "./RobotDetails.css";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Edit from "./EditUser";
import Delete from "./DeleteUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

export default function RobotDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  // const users = useSelector((state) => state.users.users);
  // const user = users.find((u) => u.id === parseInt(id));

  // const { username } = useParams();
  // const users = useSelector((state) => state.users.users);
  // const user = users.find((u) => u.username === username);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isDeleteMsgOpen, setIsDeleteMsgOpen] = useState(false);

  ////////////////////////
  const [user, setUser2] = useState({});
  useEffect(() => {
    fetch(`http://localhost:3000/user/${id}`)
      .then((response) => response.json())
      .then((u) => {
        const updatedUsers = {
          ...u,
          pic: `https://robohash.org/${u.username}`,
        };
        // dispatch(setUsers(updatedUsers));
        setUser2(updatedUsers);
      });
  }, [dispatch]);

  if (!user) {
    return (
      <div>
        <p>User not found</p>
        <Link to="/">
          <button>Back</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="robotDetails">
      <div className="icons">
        <Link to="/" className="backLink">
          <FontAwesomeIcon icon={faAngleLeft} className="icon backIcon" />
        </Link>
        <button className="editbutton" onClick={() => setIsEditFormOpen(true)}>
          <FontAwesomeIcon icon={faPen} className="icon editIcon" />
        </button>
        <button className="deleteicon" onClick={() => setIsDeleteMsgOpen(true)}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
      <img src={user.pic} alt={`${user.name}'s picture`} />
      <h2>{user.name}</h2>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Address:</strong> {user.address?.street}, {user.address?.city}
      </p>
      <p>
        <strong>Geo:</strong> Lat: {user.address?.geo?.lat}, Lng:{" "}
        {user.address?.geo?.lng}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
      <p>
        <strong>Website:</strong> {user.website}
      </p>
      <p>
        <strong>Company:</strong> {user.company?.name}
      </p>
      <p>
        <strong>Catch Phrase:</strong> {user.company?.catchPhrase}
      </p>
      <p>
        <strong>BS:</strong> {user.company?.bs}
      </p>
      {/* <Link to="/" className="backLink">
        Back
      </Link>
      <button className="editbutton" onClick={() => setIsEditFormOpen(true)}>Edit</button> */}
      {isEditFormOpen && (
        <Edit user={user} onClose={() => setIsEditFormOpen(false)} />
      )}
      {isDeleteMsgOpen && (
        <Delete user={user} onClose={() => setIsDeleteMsgOpen(false)} />
      )}
    </div>
  );
}
