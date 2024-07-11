import SearchBar from "./Searchbar";
import AddUserForm from "./AddUserForm";
import Robot from "./Robot";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, openForm, closeForm } from "./userSlice";

export default function Container() {
  const users = useSelector((state) => state.users.users);
  const isOpen = useSelector((state) => state.users.isOpen);
  const dispatch = useDispatch();
  const [filterText, setFilterText] = useState("");
  // const [isOpen, setIsOpen] = useState(false);

  const handleAddUser = (newUser) => {
    dispatch(addUser(newUser));
    dispatch((closeForm()));
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="container">
      <div className="flexRow">
        <SearchBar filterText={filterText} onFilterTextChange={setFilterText} />
        <button onClick={() => dispatch(openForm())} className="addUserButton">
          Add Robot
        </button>
      </div>
      {isOpen && <AddUserForm addUser={handleAddUser} />}
      <div className="robotList">
        {filteredUsers.map((user) => (
          <Robot key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
