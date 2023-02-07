import { useAuth } from "../context/auth";

export default function LoginPage() {
  const { login } = useAuth();
  return (
    <>
      <button
        onClick={() => {
          login({ email: "", password: "" });
        }}
      >
        임시로그인
      </button>
    </>
  );
}
