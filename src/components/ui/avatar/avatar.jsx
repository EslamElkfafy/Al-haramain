
import React from "react";

// This component generates a simple avatar based on the user's name or email
const Avatar = ({ username }) => {
  // Generate initials from the username (or email)
  const initials = username
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  return (
    <div
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: "#007BFF",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: "18px",
        textTransform: "uppercase",
      }}
    >
      {initials}
    </div>
  );
};

export default Avatar;
