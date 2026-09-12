import { ElifeSciencesEntityBase } from '../ElifeSciencesEntityBase';
import type { ElifeSciencesSDK } from '../ElifeSciencesSDK';
import type { Control } from '../types';
import type { Article, ArticleLoadMatch } from '../ElifeSciencesTypes';
declare class ArticleEntity extends ElifeSciencesEntityBase<Article> {
    constructor(client: ElifeSciencesSDK, entopts: any);
    make(this: ArticleEntity): ArticleEntity;
    load(this: any, reqmatch?: ArticleLoadMatch, ctrl?: Control): Promise<ArticleEntity>;
}
export { ArticleEntity };
