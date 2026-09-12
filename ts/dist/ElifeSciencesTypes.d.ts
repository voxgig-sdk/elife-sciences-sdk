export interface Annotation {
}
export interface AnnotationLoadMatch {
    by?: string;
    order?: string;
    page?: number;
    per_page?: number;
}
export interface Article {
    id?: string;
}
export interface ArticleLoadMatch {
    id: string;
}
export interface Collection {
    id?: string;
}
export interface CollectionLoadMatch {
    id: string;
}
export interface Person {
    id?: string;
}
export interface PersonLoadMatch {
    id: string;
}
export interface Search {
}
export interface SearchLoadMatch {
    for: string;
    order?: string;
    page?: number;
    per_page?: number;
    sort?: string;
    subject?: any[];
    type?: any[];
}
export interface Subject {
    id?: string;
}
export interface SubjectLoadMatch {
    id: string;
}
