import { TagFormValues } from './formValidate.interface';
import { CommentInterface } from 'types/interfaces/comment.interface';

export default interface QuoteInterface {
    _id: string;
    content: string;
    author: string;
    likes?: string[] | any[];
    tags: string[] | TagFormValues[];
    comments?: CommentInterface[];
}
export interface DashBoardQuoteInterface {
    _id: string;
    content: string;
    author: string;
    likes?: string[] | any[];
    tags: string[] | TagFormValues[];
    comments?: CommentInterface[];
    createdAt?: any;
}
