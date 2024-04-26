import { DELETE, GET, POST, PUT } from "./fetch.utils";

export type PostOutput = {
  _id: string;
  userName: string;
  email: string;
  password: string;
};

export type PostInput = {
  userName: string;
  email: string;
  password: string;
};

type OnPostInput = PostInput;

const URI = "http://localhost:3000";

export const onPost = async (newUser: OnPostInput) => {
  const response = await POST<PostOutput, OnPostInput>(
    `${URI}/user/new`,
    newUser
  );
  return response;
};

type GetOutput = PostOutput[];

export const onGetUsers = async () => {
  const response = await GET<GetOutput>(`${URI}/users`);
  return response;
};

type OnPutInput = { userId: string; updateUser: string };

export const onPut = async ({ updateUser, userId }: OnPutInput) => {
  const response = await PUT<string, string>(
    `${URI}/user/${userId}`,
    updateUser
  );
  return response;
};

export const onDelete = async (userId: string) => {
  console.log({ userId });
  const response = await DELETE<string>(`${URI}/user/${userId}`);
  console.log("delete", { response });
  return response;
};
