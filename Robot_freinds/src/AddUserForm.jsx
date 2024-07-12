import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeForm } from "./userSlice";

export default function AddUserForm({ addUser }) {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: users.length + 1,
      name,
      username,
      email,
      address: {
        street,
        city,
      },
      phone,
      pic: `https://robohash.org/${username}`,
    };
    addUser(newUser);
    dispatch(closeForm());
  };

  return (
    <div className="Form">
      <div className="FormContent">
        <span className="closeButton" onClick={() => dispatch(closeForm())}>
          &times;
        </span>
        <h2>Add New User</h2>
        <form onSubmit={handleSubmit} className="addUserForm">
          <label></label> 
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            value={street}
            placeholder="Street"
            onChange={(e) => setStreet(e.target.value)}
            required
          />
          <input
            type="text"
            value={city}
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <input
            type="text"
            value={phone}
            placeholder="Phone"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button type="submit">Add User</button>
        </form>
      </div>
    </div>
  );
}
