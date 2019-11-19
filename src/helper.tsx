import axios from "axios";
import jwt from "jwt-decode";
import { async } from "q";

const URL = process.env.REACT_APP_BACKEND_HOST || process.env.REACT_APP_BACKEND_Local;

console.log(process.env.REACT_APP_BACKEND_HOST);
console.log(process.env.REACT_APP_BACKEND_Local);

export interface ServerData {
  id: number;
  user_id: number;
  title: string;
}

export interface CardData {
  id: number;
  list: [];
  title: string;
}

export interface UserData {
  id: number;
  username: string;
}

export const login = async (userData: { username: string; password: string }) => {
  const { username, password } = userData;
  const { data } = await axios.get(`${URL}/users/login?username=${username}&password=${password}`);
  if (data.massage) {
    window.localStorage.setItem("token", data.token);
    alert("Login에 성공했습니다.");
  } else {
    alert("Login에 실패했습니다.");
  }
  return data.massage;
};

export const check = async (username: string) => {
  const { data } = await axios.get(`${URL}/users/check?username=${username}`);
  return data;
};

export const signUp = async (userData: {
  username: string;
  password: string;
  nickname: string;
  email: string;
}) => {
  await axios.post(`${URL}/users`, userData);
};

export const getUserData = async () => {
  const token = window.localStorage.getItem("token");
  const { data } = await axios.get(`${URL}/users?token=${token}`);

  return data;
};

export const setUserData = async (newData: any) => {
  const token = window.localStorage.getItem("token");
  await axios.put(`${URL}/users`, { newData, token });
};

export const getData = async (id: number) => {
  const { data } = await axios.request<ServerData[]>({
    url: `${URL}/boards?id=${id}`
  });

  return data;
};

export const addBoard = async (title: string, userId: number) => {
  console.log(title, userId);
  await axios.post(`${URL}/boards`, { title, userId });
};

export const deleteBoard = async (boardId: number) => {
  await axios.delete(`${URL}/boards?boardId=${boardId}`);
};

export const getCards = async (id: number) => {
  const { data } = await axios.request<CardData[]>({
    url: `${URL}/cards?boardId=${id}`
  });

  return data;
};

export const addCard = async (boardId: number, title: string) => {
  await axios.post(`${URL}/cards`, { boardId, title });
};

export const deleteCard = async (cardId: number) => {
  await axios.delete(`${URL}/cards?cardId=${cardId}`);
};

export const getList = async (cardId: number) => {
  return await axios.get(`${URL}/list?cardId=${cardId}`);
};

export const setList = async (id: number, title: string) => {
  await axios.put(`${URL}/list`, { id, title });
};

export const addList = async (title: string, cardsId: number) => {
  await axios.post(`${URL}/list`, { title, cardsId });
};

export const deleteList = async (listId: number) => {
  await axios.delete(`${URL}/list?listId=${listId}`);
};

export const moveList = async (listId: number, cardId: number, title: string) => {
  await deleteList(listId);
  await addList(title, cardId);
};

export const getToken = () => {
  const token = window.localStorage.getItem("token");
  if (token) {
    const decoded = jwt<UserData>(token);
    return decoded;
  }
};
