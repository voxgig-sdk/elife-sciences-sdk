import { ElifeSciencesEntityBase } from '../ElifeSciencesEntityBase';
import type { ElifeSciencesSDK } from '../ElifeSciencesSDK';
import type { Control } from '../types';
import type { Search, SearchLoadMatch } from '../ElifeSciencesTypes';
declare class SearchEntity extends ElifeSciencesEntityBase<Search> {
    constructor(client: ElifeSciencesSDK, entopts: any);
    make(this: SearchEntity): SearchEntity;
    load(this: any, reqmatch?: SearchLoadMatch, ctrl?: Control): Promise<SearchEntity>;
}
export { SearchEntity };
