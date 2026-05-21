export interface IHero {
  _id: string;
  title: string;
  subtitle: string;
  backgroundImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IHeroRes {
  message: string;
  data: IHero;
}

export interface ICreateHero {
  title: string;
  subtitle: string;
}

export interface IUpdateHero {
  title: string;
  subtitle: string;
}
