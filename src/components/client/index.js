import Avatar from "react-avatar";

import "./style.css";

const Client = ({ username }) => (
  <div className="Client_client">
    <Avatar name={username} size={50} round="14px" />
    <span className="Client_userName">{username}</span>
  </div>
);

export default Client;
