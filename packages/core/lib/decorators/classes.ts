import { getDependenciesRawMetadata, registerDependency } from '../di';
import { ClassDecorator } from './types';

/** 
 * Cli Root class decorator 
 */
export const Cli = function<T, A extends any[] = []>(): ClassDecorator<T, A> {
    return target => {
        const rawDependencies = getDependenciesRawMetadata(target);

        rawDependencies.forEach((dependency, index) => {
            if (typeof dependency === 'undefined') {
                return;
            }

            registerDependency(target, dependency, index);
        });
    };
}
