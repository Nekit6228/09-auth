import type { Note, NewNote } from '@/types/note';
import nextServer from './api';
import { User } from '@/types/user';
import { LoginRequest, Register, CheckSession, UserData} from '@/types/Auth'

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


// search all notes and filter
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


// delete note
export async function deleteNote(noteId: number): Promise<Note> {
  const { data } = await nextServer.delete<Note>(`/notes/${noteId}`);
  return data;
}


// regiter 

export const register = async (data: Register) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};


// login 

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};


// check session 

export const checkSession = async () => {
  const res = await nextServer.get<CheckSession>('/auth/session');
  return res.data.success;
};


// get me 

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/auth/me');
  return data;
};


// logout 

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout')
};

// edit client 

export const editUser = async (user: UserData): Promise<User> => {
  const responce = await nextServer.patch<User>("/users/me", user);
  return responce.data;
};