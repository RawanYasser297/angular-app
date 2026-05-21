export interface IBrand {
  logos: {
    _id: string;
    image: string;
    show: boolean;
  }[];
}
export interface IBrandRes {
  message: string;
  data: IBrand;
}

export interface ILogo {
  _id: string;
  image: string;
  show: boolean;
}