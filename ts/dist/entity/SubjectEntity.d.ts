import { ElifeSciencesEntityBase } from '../ElifeSciencesEntityBase';
import type { ElifeSciencesSDK } from '../ElifeSciencesSDK';
import type { Control } from '../types';
import type { Subject, SubjectLoadMatch } from '../ElifeSciencesTypes';
declare class SubjectEntity extends ElifeSciencesEntityBase<Subject> {
    constructor(client: ElifeSciencesSDK, entopts: any);
    make(this: SubjectEntity): SubjectEntity;
    load(this: any, reqmatch?: SubjectLoadMatch, ctrl?: Control): Promise<SubjectEntity>;
}
export { SubjectEntity };
