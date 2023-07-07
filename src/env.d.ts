/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client-image" />
declare namespace App {
    interface Locals {
        getProject: (slug:string) => Promise<any>;
        getAllProjects: () => Promise<any>;
    }
}