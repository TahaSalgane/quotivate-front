import CategorieInterface from './categorie.interface';

export default interface QuoteInterface {
    _id: string;
    content: string;
    author: string;
    likes?: string[] | any[];
    tags: string[] | CategorieInterface[];
}
