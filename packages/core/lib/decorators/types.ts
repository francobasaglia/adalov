import { ClassType } from '@adalov/common';

/** 
 * Class decorators types
 */
export type ClassDecorator<T = any, A extends any[] = []> = (target: ClassType<T, A>) => void;

/** 
 * Parameter decorators types
 */
export type ParameterDecorator<T = any> = (target: T, propertyKey: string | symbol | undefined, parameterIndex: number) => void;


export type GlobalInjectionToken = 'node:process';
