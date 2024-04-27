import { useEffect, useState } from "react";
import "./App.css";
import { PostOutput, onGetUsers, onPost, onPut, onDelete } from "./utils";

function App() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [allUsers, setAllUsers] = useState<PostOutput[]>([]);
  const [showFormNewUser, setShowFormNewUser] = useState(false);
  const [updateUserName, setUpdateUserName] = useState<string | null>(null);
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [current, setCurrent] = useState<PostOutput | null>(null);
  // const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const newUser = {
        userName: userName,
        email: email,
        password: password,
      };
      const response = await onPost(newUser);
      console.log({ response });
      // setMessage(response)
      console.log({ newUser });
      setShowFormNewUser(false);
      setUserName("");
      setEmail("");
      setPassword("");
      const users = await onGetUsers();
      setAllUsers(users);
    } catch (error) {
      console.error(error);
    }
  };

  type OnEditInput = { initialValue: string; userId: string };

  const onEdit = async ({ initialValue, userId }: OnEditInput) => {
    console.log("start put");
    setUpdateUserName(initialValue);
    if (!updateUserName) return;
    console.log("start put 2");

    const resPut = await onPut({
      updateUser: updateUserName,
      userId: userId,
    });
    console.log({ resPut });
    const users = await onGetUsers();
    setAllUsers(users);
    console.log("end put");
  };

  const onDeleteUser = async (userId: string) => {
    await onDelete(userId);
    // console.log("delete", { response });
    // setMessage(response);
    const users = await onGetUsers();
    setAllUsers(users);
  };

  useEffect(() => {
    const onGetAllUsers = async () => {
      const users = await onGetUsers();
      setAllUsers(users);
    };
    onGetAllUsers();
  }, []);
  // todo: edit and delete

  return (
    <>
      <header className="w-full p-6">
        <h1>Users</h1>
      </header>
      <main className="text-justify">
        <button onClick={() => setShowFormNewUser((prev) => !prev)}>
          {showFormNewUser ? "X" : "+ Add new user"}
        </button>

        {showFormNewUser && (
          <form
            className="flex flex-col gap-5 border border-orange-500 p-6 rounded-2xl"
            onSubmit={onSubmit}
          >
            <h2>New user</h2>
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
        )}

        <ul className="flex flex-col gap-4 p-6">
          {allUsers.map((cur, idx) => (
            <li
              key={cur._id}
              className="p-4 border border-red-600 rounded-xl hover:bg-red-950 group/edit group/delete relative capitalize"
            >
              {idx + 1}. {!showFormEdit && cur.userName}
              {showFormEdit && cur === current && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onEdit({ initialValue: cur.userName, userId: cur._id });
                    setShowFormEdit(false);
                  }}
                >
                  <input
                    type="text"
                    value={updateUserName}
                    onChange={(e) => setUpdateUserName(e.target.value)}
                  />
                  <button>Save</button>
                </form>
              )}
              <span className="block normal-case opacity-70">{cur.email}</span>
              <button
                className="invisible absolute top-0 -right-12  group-hover/edit:visible text-green-600 p-1 w-24"
                onClick={() => {
                  setShowFormEdit((prev) => !prev);
                  setUpdateUserName(cur.userName);
                  setCurrent(cur);
                }}
              >
                {showFormEdit ? "X" : "Edit"}
              </button>
              <button
                className="invisible absolute bottom-0 -right-12 group-hover/delete:visible text-red-600 p-1 w-24"
                onClick={() => onDeleteUser(cur._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        {/* <div className="text-yellow-300 text-xl ">{message}</div> */}
      </main>
    </>
  );
}

export default App;
