import { useState } from "react";
import useInput from "../hooks/useInput";

const Profile = () => {
  const [nickname, setNickname] = useState("기본이름");
  const [isEditMode, setIsEditMode] = useState(false);
  const { input, onChange, onSubmitCallback } = useInput(nickname);

  const editNickName = onSubmitCallback(() => {
    setNickname(input);
    setIsEditMode(false);
  });

  return (
    <>
      {isEditMode ? (
        <form onSubmit={editNickName}>
          <input value={input} onChange={onChange} />
        </form>
      ) : (
        <div onClick={() => setIsEditMode(true)}>{nickname}</div>
      )}
    </>
  );
};

export default Profile;
