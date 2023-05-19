import 'reflect-metadata';
import { MetadataKey, MetadataPropertyKey, MetadataTarget, MetadataValue } from './types';

export class Reflection {
    public static defineMetadata<T = any>(metadataKey: MetadataKey, metadataValue: MetadataValue<T>, target: MetadataTarget, propertyKey: MetadataPropertyKey = undefined): void {
        typeof propertyKey === 'undefined' 
            ? Reflect.defineMetadata(metadataKey, metadataValue, target)
            : Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey);
    }

    public static hasMetadata(metadataKey: MetadataKey, target: MetadataTarget, propertyKey: MetadataPropertyKey = undefined): boolean {
        return typeof propertyKey === 'undefined' 
            ? Reflect.hasMetadata(metadataKey, target)
            : Reflect.hasMetadata(metadataKey, target, propertyKey);
    }

    public static hasOwnMetadata(metadataKey: MetadataKey, target: MetadataTarget, propertyKey: MetadataPropertyKey = undefined): boolean {
        return typeof propertyKey === 'undefined' 
            ? Reflect.hasOwnMetadata(metadataKey, target)
            : Reflect.hasOwnMetadata(metadataKey, target, propertyKey);
    }

    public static getMetadata(metadataKey: MetadataKey, target: MetadataTarget, propertyKey: MetadataPropertyKey = undefined): any {
        return (
            typeof propertyKey === 'undefined' 
                ? Reflect.getMetadata(metadataKey, target)
                : Reflect.getMetadata(metadataKey, target, propertyKey)
        ) || [];
    }

    public static getOwnMetadata(metadataKey: MetadataKey, target: MetadataTarget, propertyKey: MetadataPropertyKey = undefined): any {
        return (
            typeof propertyKey === 'undefined' 
                ? Reflect.getOwnMetadata(metadataKey, target)
                : Reflect.getOwnMetadata(metadataKey, target, propertyKey)
        ) || [];
    }

    public static getMetadataKeys(target: MetadataTarget, propertyKey: MetadataPropertyKey = undefined): MetadataKey[] {
        return (
            typeof propertyKey === 'undefined' 
                ? Reflect.getMetadataKeys(target)
                : Reflect.getMetadataKeys(target, propertyKey)
        ) || [];
    }

    public static getOwnMetadataKeys(target: MetadataTarget, propertyKey: MetadataPropertyKey = undefined): MetadataKey[] {
        return (
            typeof propertyKey === 'undefined' 
                ? Reflect.getOwnMetadataKeys(target)
                : Reflect.getOwnMetadataKeys(target, propertyKey)
        ) || [];
    }

    public static deleteMetadata(metadataKey: MetadataKey, target: MetadataTarget, propertyKey: MetadataPropertyKey = undefined): boolean {
        return typeof propertyKey === 'undefined' 
            ? Reflect.deleteMetadata(metadataKey, target)
            : Reflect.deleteMetadata(metadataKey, target, propertyKey);
    }
}
