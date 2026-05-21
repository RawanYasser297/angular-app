export interface IUserAddress {
  label?: string;
  addressLine: string;
  placeId?: string;
}

export interface IUserPhoneNumber {
  label?: string;
  number: string;
}

export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role?: 'user' | 'admin';
  addresses?: IUserAddress[];
  phoneNumbers?: IUserPhoneNumber[];
}
