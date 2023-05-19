import { ClassType } from '@adalov/common';
import { Reflection } from '../reflect';

export const DESIGN_PARAMTYPES_METADATA_KEY = 'design:paramtypes';

export const DEPENDENCIES_METADATA_KEY = 'dependencies';

export const getDependenciesRawMetadata = (target: ClassType): any[] => {
    return Reflection.getMetadata(DESIGN_PARAMTYPES_METADATA_KEY, target) as any[];
};

export const registerDependency = <T = ClassType>(target: ClassType, dependencyOrToken: T | string, index: number): void => {
    const hasDependenciesRegister = Reflection.hasOwnMetadata(DEPENDENCIES_METADATA_KEY, target);
    let dependenciesRegister: DependenciesRegister;

    if (hasDependenciesRegister) {
        dependenciesRegister = Reflection.getOwnMetadata(DEPENDENCIES_METADATA_KEY, target);
    } else {
        dependenciesRegister = new DependenciesRegister();
        
        Reflection.defineMetadata(DEPENDENCIES_METADATA_KEY, dependenciesRegister, target);
    }

    dependenciesRegister.add(index, dependencyOrToken);
};

export class DependenciesRegister {
    private readonly dependenciesMap = new Map<number, any>();

    public add<T = any>(index: number, dependencyOrToken: T | string): void {
        if (this.dependenciesMap.has(index)) {
            /** Dependency or token already registered */
            return;
        }

        this.dependenciesMap.set(index, dependencyOrToken);
    }

    public get<T = any>(index: number): T | undefined {
        return this.dependenciesMap.get(index);
    }

    public getAll(): Array<string | ClassType> {
        return Array.from(this.dependenciesMap, ([ index, dependency ]) => dependency);
    }
}
