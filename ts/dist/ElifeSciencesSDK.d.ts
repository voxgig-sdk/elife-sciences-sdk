import { AnnotationEntity } from './entity/AnnotationEntity';
import { ArticleEntity } from './entity/ArticleEntity';
import { CollectionEntity } from './entity/CollectionEntity';
import { PersonEntity } from './entity/PersonEntity';
import { SearchEntity } from './entity/SearchEntity';
import { SubjectEntity } from './entity/SubjectEntity';
export type * from './ElifeSciencesTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { ElifeSciencesEntityBase } from './ElifeSciencesEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class ElifeSciencesSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Annotation(entopts?: Record<string, any>): AnnotationEntity;
    Article(entopts?: Record<string, any>): ArticleEntity;
    Collection(entopts?: Record<string, any>): CollectionEntity;
    Person(entopts?: Record<string, any>): PersonEntity;
    Search(entopts?: Record<string, any>): SearchEntity;
    Subject(entopts?: Record<string, any>): SubjectEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): ElifeSciencesSDK;
    tester(testopts?: any, sdkopts?: any): ElifeSciencesSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof ElifeSciencesSDK;
export { stdutil, config, BaseFeature, ElifeSciencesEntityBase, ElifeSciencesSDK, SDK, };
