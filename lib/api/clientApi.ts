import type { Note, NewNote } from '@/types/note';
import { RegisterRequest, User } from '@/types/register';
import { LoginRequest } from '@/types/login';
import  {nextServer}  from './api';
import {CheckSessionRequest} from '@/types/checkSession'


export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: string; 
}



// get notes all or teg

export async function fetchNotes(search = '', page = 1, tag?: string): Promise<FetchNotesResponse> {
  const params: FetchNotesParams = { page, perPage: 12 };
  if (search.trim()) params.search = search.trim();
  if (tag && tag !== 'All') params.tag = tag; 
  const { data } = await nextServer.get<FetchNotesResponse>('/notes', { params });
  return data;
}

// search by id

export async function fetchNoteById(id: number): Promise<Note> {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
}

// create note

export async function createNote(newNote: NewNote): Promise<Note> {
  const { data } = await nextServer.post<Note>('/notes', newNote);
  return data;
}

//delete notes

export async function deleteNote(noteId: number): Promise<Note> {
  const { data } = await nextServer.delete<Note>(`/notes/${noteId}`);
  return data;
}

//register

export const register = async (data:RegisterRequest)=>{
  const res = await  nextServer.post<User>('/auth/register',data);
  return res.data;
}

// login

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

// check session 

export const checkSesion = async () =>{
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
}

// autch me 

export const getMe = async () =>{
  const {data} = await nextServer.get<User>('/auth/me');
  return data;  
}

// logout 

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout')
};  