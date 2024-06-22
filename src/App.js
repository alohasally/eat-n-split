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
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [showAddFriend, setShowAddFriend] = useState(false);

  const handleShowAddFriend = () => {
    setShowAddFriend(() => !showAddFriend);
  };

  const handleSelectedFriend = (friend) => {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
  };
  console.log("selectedFriend", selectedFriend);

  const handleAddFriend = (friend) => {
    setFriends((cur) => [...cur, friend]);
    setShowAddFriend(false);
  };

  const handleSplitBill = (value) => {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelected={handleSelectedFriend}
        />
        {showAddFriend ? <FormAddFriend onAddFriend={handleAddFriend} /> : ""}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

function FriendsList({ friends, selectedFriend, onSelected }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          selectedFriend={selectedFriend}
          onSelected={onSelected}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, selectedFriend, onSelected }) {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <div>
        <h3>{friend.name}</h3>
        {friend.balance < 0 ? (
          <p className="red">
            You Owe {friend.name} {Math.abs(friend.balance)}
          </p>
        ) : friend.balance > 0 ? (
          <p className="green">
            {friend.name} Owe you {Math.abs(friend.balance)}
          </p>
        ) : friend.balance === 0 ? (
          <p>You and {friend.name} are even </p>
        ) : (
          ""
        )}
      </div>
      <Button onClick={() => onSelected(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
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
        <label>
          <span>👫</span>Frined Name
        </label>
        <input onChange={(e) => setName(e.target.value)}></input>
        <label>
          <span>🎆</span>image URL
        </label>
        <input value={image}></input>
        <Button onClick={handleSubmit}>Add</Button>
      </form>
    </>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  console.log("selectedFriend", selectedFriend);

  const [bill, setBill] = useState();
  const [paidByUser, setByUser] = useState(0);
  const paidByFriend = bill ? bill - paidByUser : 0;
  const [whoisPaying, setWhoisPaying] = useState("user");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSplitBill(whoisPaying === "user" ? paidByFriend : -paidByUser);
  };
  return (
    <form className="form-split-bill">
      <h2>SPLIT A BILL WITH ANTHONY</h2>
      <label>
        <span>💰</span>Bill value
      </label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      ></input>
      <label>
        <span>🧍🏻‍♀️</span>Your expense
      </label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setByUser(
            Number(e.target.value) > bill ? bill : Number(e.target.value)
          )
        }
      ></input>
      <label>
        <span>👫</span>
        {selectedFriend.name}'s expense
      </label>
      <input type="text" value={paidByFriend} disabled></input>
      <label>
        <span>🤑</span>Who is paying the bill
      </label>
      <select
        onChange={(e) => {
          setWhoisPaying(e.target.value);
        }}
      >
        <option>you</option>
        <option>{selectedFriend.name}</option>
      </select>
      <Button onClick={handleSubmit}>Split Bill</Button>
    </form>
  );
}
