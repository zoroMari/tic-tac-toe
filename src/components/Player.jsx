import { useState } from "react"

export default function Player({ initialName, symbol, isActive, onChangeName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(initialName);

  const editHandler = () => {
    if (isEditing) onChangeName(symbol, userName);
    setIsEditing((prevState) => !prevState);
  };
  const changeNameHandler = (e) => setUserName((name) => e.target.value);
  
  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {isEditing && <input type='text' required value={userName} onChange={changeNameHandler} />}
        {!isEditing && <span className="player-name">{userName}</span>}
        <span className="player-symbol">{symbol}</span>  
      </span>
      <button onClick={editHandler}>
        {!isEditing ? 'Edit' : 'Save'}
      </button>
    </li>
  )
}