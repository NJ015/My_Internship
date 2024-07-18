import SearchBar from "./Searchbar";
import AddUserForm from "./AddUserForm";
import Robot from "./Robot";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, setUsers, openForm, closeForm } from "./userSlice";

export default function Container() {
  const dispatch = useDispatch();
  ////////////////////////
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {
        const updatedUsers = users.map((user) => ({
          ...user,
          pic: `https://robohash.org/${user.username}`,
        }));
        dispatch(setUsers(updatedUsers));
      });
  }, [dispatch]);
  /////////////////////////
  const users = useSelector((state) => state.users.users);
  const isOpen = useSelector((state) => state.users.isOpen);

  const [filterText, setFilterText] = useState("");
  // const [isOpen, setIsOpen] = useState(false);

  const handleAddUser = (newUser) => {
    dispatch(addUser(newUser));
    dispatch(closeForm());
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
