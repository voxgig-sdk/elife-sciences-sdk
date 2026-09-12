import { ElifeSciencesEntityBase } from '../ElifeSciencesEntityBase';
import type { ElifeSciencesSDK } from '../ElifeSciencesSDK';
import type { Control } from '../types';
import type { Person, PersonLoadMatch } from '../ElifeSciencesTypes';
declare class PersonEntity extends ElifeSciencesEntityBase<Person> {
    constructor(client: ElifeSciencesSDK, entopts: any);
    make(this: PersonEntity): PersonEntity;
    load(this: any, reqmatch?: PersonLoadMatch, ctrl?: Control): Promise<PersonEntity>;
}
export { PersonEntity };
