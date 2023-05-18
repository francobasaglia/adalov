#!/bin/bash

target=""

while getopts t: flag
do
    case "${flag}" in
        t) target=${OPTARG};;
    esac
done

rm -rf $target/node_modules/\@adalov/*
cp -r out-pck/* $target/node_modules/\@adalov/
