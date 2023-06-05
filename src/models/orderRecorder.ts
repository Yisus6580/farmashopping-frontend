export interface OrderRecorder {
  _id: string;
  date: Date;
  numberNote: string;
  name: string;
  user: User;
  observation?: string;
  state: boolean;
}

type User = {
  _id: string;
  name: string;
  lasName: string;
  userName: string;
  email: string;
  role: string;
};

export interface OrderRecorderCreate {
  date: Date;
  numberNote: string;
  name: string;
  user: string;
  observation?: string;
  state: boolean;
}
