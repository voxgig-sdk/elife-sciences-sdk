import { ElifeSciencesEntityBase } from '../ElifeSciencesEntityBase';
import type { ElifeSciencesSDK } from '../ElifeSciencesSDK';
import type { Control } from '../types';
import type { Annotation, AnnotationLoadMatch } from '../ElifeSciencesTypes';
declare class AnnotationEntity extends ElifeSciencesEntityBase<Annotation> {
    constructor(client: ElifeSciencesSDK, entopts: any);
    make(this: AnnotationEntity): AnnotationEntity;
    load(this: any, reqmatch?: AnnotationLoadMatch, ctrl?: Control): Promise<AnnotationEntity>;
}
export { AnnotationEntity };
