import SearchBar from "./Searchbar";
import AddUserForm from "./AddUserForm";
import Robot from "./Robot";
import { useState } from "react";

export default function Container({ users, addUser }) {
  const [filterText, setFilterText] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="container">
      <div className="flexRow">
        <SearchBar filterText={filterText} onFilterTextChange={setFilterText} />
        <button onClick={() => setIsOpen(true)} className="addUserButton">
          Add Robot
        </button>
      </div>
      {isOpen && (
        <AddUserForm
          addUser={addUser}
          onClose={() => setIsOpen(false)}
          users={users}
        />
      )}
      <div className="robotList">
        {filteredUsers.map((user) => (
          <Robot key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
