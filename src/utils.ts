import { GET, POST } from "./fetch.utils";

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

export const onGet = async () => {
  const response = await GET<GetOutput>(`${URI}/users`);
  return response;
};
