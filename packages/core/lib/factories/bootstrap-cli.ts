import { ClassType } from '@adalov/common';
import { Reflection } from '../reflect';

export const bootstrapCli = <T = any>(target: ClassType<T, any>) => {
    const dependencies = Reflection.getOwnMetadata('dependencies', target);

    console.log('dependencies: ', dependencies.getAll());
};
