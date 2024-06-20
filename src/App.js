import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState("");

  const handleSelectedFriend = (id) => {
    setSelectedFriend((cur) => (cur?.id === id ? null : friends));
  };

  const handleAddFriend = (friend) => {
    setFriends((cur) => [...cur, friend]);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelected={handleSelectedFriend}
        />
        <FormAddFriend onAddFriend={handleAddFriend} />
      </div>
    </div>
  );
}

function FriendsList({ friends, selectedFriend, onSelected }) {
  <ul>
    {friends.map((friend) => (
      <Friend
        key={friend.id}
        friend={friend}
        selectedFriend={selectedFriend}
        onSelected={onSelected}
      />
    ))}
  </ul>;
}

function Friend({ friend, selectedFriend, onSelected }) {
  const isSelected = selectedFriend.id === friend.id;

  return (
    <li
      className={isSelected ? "selected" : ""}
      onClick={() => onSelected(friend.id)}
    >
      <img src={friend.image} alt={friend.name} />
      <div>
        <h3>{friend.name}</h3>
        <p>You Owe name </p>
      </div>
      <Button>{isSelected ? "Select" : "Close"}</Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    const id = crypto.randomUUID();

    const newFriend = {
      id,
      name,
      image,
      balance: 0,
    };
    setImage("https://i.pravatar.cc/48");

    onAddFriend(newFriend);
  }
  return (
    <>
      <form className="form-add-friend">
        <label>Frined Name</label>
        <input onChange={(e) => setName(e.target.value)}></input>
      </form>
      <Button onClick={handleSubmit}>Add</Button>
    </>
  );
}

// function FormSplitBill() {}
