import { useAuth } from "../context/auth";

export default function LoginPage() {
  const { login, signup } = useAuth();
  return (
    <>
      <button
        onClick={() => {
          login({ email: "abc@abc.com", password: "asdfasdf" });
        }}
      >
        임시로그인
      </button>
      <button
        onClick={() => {
          signup({
            email: "abc@abc.com",
            password: "asdfasdf",
            nickname: "asdf",
          });
        }}
      >
        임시회원가입
      </button>
    </>
  );
}
