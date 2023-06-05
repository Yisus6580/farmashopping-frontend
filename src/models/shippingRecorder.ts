export interface ShippingRecorder {
  _id: string;
  date: Date;
  namePharmacy: string;
  typeBox: string;
  boxNumber: string;
  numberNotes: string[];
  destiny: string;
  shippingCompany: string;
  numberGuide: string;
  user: User;
  state: boolean;
  createdAt: Date;
  updatedAt: Date;
}

type User = {
  _id: string;
  name: string;
  lasName: string;
  userName: string;
  email: string;
  role: string;
};

export interface ShippingRecorderCreate {
  date: Date;
  namePharmacy: string;
  typeBox: string;
  boxNumber: string;
  numberNotes: string[];
  destiny: string;
  shippingCompany: string;
  numberGuide: string;
  user: string;
  state: boolean;
}
