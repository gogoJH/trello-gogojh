import axios from "axios";

const URL = process.env.REACT_APP_BACKEND_HOST;

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
