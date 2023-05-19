import { registerDependency } from '../di';
import { GlobalInjectionToken, ParameterDecorator } from './types';

export const InjectGlobal = function(token: GlobalInjectionToken): ParameterDecorator {
    return (target, propertyKey, parameterIndex) => {
        /**
         * When `ParameterDecorator` is used on class constructor, then target is type of function and property key is undefined
         */
        if (typeof target !== 'function' && typeof propertyKey !== 'undefined') {
            throw new Error('InjectGlobal do not support usage on class methods.');
        }
        
        registerDependency(target, token, parameterIndex);
    };
}
