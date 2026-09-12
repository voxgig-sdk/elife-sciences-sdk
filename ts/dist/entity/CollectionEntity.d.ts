import { ElifeSciencesEntityBase } from '../ElifeSciencesEntityBase';
import type { ElifeSciencesSDK } from '../ElifeSciencesSDK';
import type { Control } from '../types';
import type { Collection, CollectionLoadMatch } from '../ElifeSciencesTypes';
declare class CollectionEntity extends ElifeSciencesEntityBase<Collection> {
    constructor(client: ElifeSciencesSDK, entopts: any);
    make(this: CollectionEntity): CollectionEntity;
    load(this: any, reqmatch?: CollectionLoadMatch, ctrl?: Control): Promise<CollectionEntity>;
}
export { CollectionEntity };
