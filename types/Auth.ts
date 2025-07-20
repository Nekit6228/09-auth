export type Register = {
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export  type CheckSession = {
  success: boolean;
};

export type UserData={
  username: string;
  email: string;
}