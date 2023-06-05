export interface User {
  _id: string;
  name: string;
  lastName: string;
  userName: string;
  email: string;
  password?: string;
  role: rols;
  birthDate?: Date;
  image?: userImage;
  state: boolean;
  token: string;
  verifyToken: string;
  createdAt: Date;
  updatedAt: Date;
}

type rols = 'admin' | 'grosser' | null;

export type userImage = {
  publicId: string;
  url: string;
};

export interface SessionData {
  userId: string;
  email: string;
  name: string;
  lastName: string;
  imageUrl?: string;
  role: string;
  state: boolean;
  token: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface UserCreate {
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: rols;
  birthDate?: Date | null;
  image?: string;
  state: boolean;
}

export interface UserEdit {
  name: string;
  lastName: string;
  email: string;
  role: rols;
  birthDate?: Date;
  image?: string;
}
