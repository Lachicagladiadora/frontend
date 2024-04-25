import { useEffect, useState } from "react";
import "./App.css";
import { PostOutput, onGet, onPost } from "./utils";

function App() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [allUsers, setAllUsers] = useState<PostOutput[]>([]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const newUser = {
        userName: userName,
        email: email,
        password: password,
      };
      await onPost(newUser);
      console.log({ newUser });
      setUserName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const onGetAllUsers = async () => {
      const users = await onGet();
      setAllUsers(users);
    };
    onGetAllUsers();
  }, []);

  return (
    <>
      <header className="p-6">
        <h1>New user</h1>
      </header>
      <main className="text-justify">
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="userName">User name</label>
            <input
              className="px-6 py-2 rounded-3xl"
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              className="px-6 py-2 rounded-3xl"
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              className="px-6 py-2 rounded-3xl"
              type="text"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button>Send</button>
        </form>
        <ul className="flex flex-col gap-4 p-6">
          {allUsers.map((cur, idx) => (
            <li key={cur._id}>
              {idx}, {cur.userName}, {cur.email}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default App;
