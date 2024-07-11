import { useState } from "react";

export default function AddUserForm({ addUser, onClose, users }) {
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
    onClose();
  };

  return (
    <div className="Form">
      <div className="FormContent">
        <span className="closeButton" onClick={onClose}>
          &times;
        </span>
        <h2>Add New User</h2>
        <form onSubmit={handleSubmit} className="addUserForm">
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
