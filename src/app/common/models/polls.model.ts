export interface IPoll {
  _id?: number;
  text: string;
  options: string;
  votes?: IVote[];
}
export interface IVote {
  option: string;
  value: number;
}

export interface ICurrentPoll {
  _id?: number;
  text: string;
  options: string[];
  optionsValues: string[];
  votesValues: number[];
  votes?: any[];
}
