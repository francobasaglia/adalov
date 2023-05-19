import { ClassType } from '@adalov/common';

export type MetadataKey = string;

export type MetadataValue<T> = T;

export type MetadataTarget = Object | ClassType;

export type MetadataPropertyKey = string | symbol | undefined;
