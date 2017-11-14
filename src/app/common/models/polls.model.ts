export interface IPoll {
    _id?: number;
    text: string;
    options: string[];
    userId;
    votes: IVote[];
}
export interface IVote {
    option: string;
    value: number;
}