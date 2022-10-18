import Avatar from "react-avatar";

import "./style.css";

const Client = ({ username }) => (
  <div className="Client_client">
    <Avatar
      name={username}
      size={50}
      round="14px"
      style={{
        boxShadow: "rgb(28 43 124 / 76%) 0px 0px 20px 0px",
        border: "1px solid rgb(27 41 117)",
      }}
    />
    <span className="Client_userName">{username}</span>
  </div>
);

export default Client;
