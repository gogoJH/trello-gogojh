import axios from "axios";

const URL = process.env.REACT_APP_BACKEND_Local;

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

export const getData = async (endPoint: string) => {
  const { data } = await axios.request<ServerData[]>({
    url: `${URL}/${endPoint}`
  });

  return data;
};

export const getCards = async (id: number) => {
  const { data } = await axios.request<CardData[]>({
    url: `${URL}/cards?boardId=${id}`
  });

  return data;
};

export const setList = async (id: number, title: string) => {
  await axios.put(`${URL}/list`, { id, title });
};

export const addList = async (title: string, cardsId: number) => {
  const newData = await axios.post(`${URL}/list`, { title, cardsId });
  return newData;
};

export const deleteList = async (listId: number, cardId: number) => {
  const newData = await axios.delete(`${URL}/list?listId=${listId}&cardId=${cardId}`);
  return newData;
};
