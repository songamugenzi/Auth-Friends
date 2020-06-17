import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

export const Dashboard = () => {
  const initialUser = {
    name: "",
    email: "",
    age: "",
    id: "",
  };

  const [friends, setFriends] = useState([]);
  const [newUser, setNewUser] = useState(initialUser);

  const getData = () => {
    axiosWithAuth()
      .get("/api/friends")
      .then((res) => {
        console.log(res.data);
        setFriends(res.data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChanges = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewUser({ ...newUser, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newFriend = {
      name: newUser.name,
      email: newUser.email,
      age: newUser.age,
      id: new Date(),
    };
    postUser(newFriend);
    setNewUser(initialUser);
  };
  const postUser = (user) => {
    axiosWithAuth()
      .post("/api/friends", user)
      .then((res) => {
        getData();
      });
  };

  return (
    <div className="friendsContainer">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          value={newUser.name}
          placeholder="Enter name here"
          onChange={handleChanges}
        />
        <input
          type="text"
          name="email"
          value={newUser.email}
          placeholder="Enter email address here"
          onChange={handleChanges}
        />
        <input
          type="text"
          name="age"
          value={newUser.age}
          placeholder="Enter age here"
          onChange={handleChanges}
        />
        <button onClick={onSubmit}>Add new friend</button>
      </form>
      <div className="friend">
        {friends.map((friend) => (
          <>
            <h3>{friend.name}</h3>
            <p>{friend.email}</p>
            <p>{friend.age}</p>
          </>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
