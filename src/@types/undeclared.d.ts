





// PLEASE PLACE TYPE OVERRIDES FOR NODE_MODULES THAT ARE NOT AVAILABLE ON NPM HERE

declare module "alphanumerize" {
    export default function alphanumerize(int: number): string;
}


// import * as Ink from "ink";

// declare module "ink" {
//     export * from Ink;
//     export {} from Ink;
//     // export {default} from "ink";
// }

declare module "cli-html" {
    export default function cliHTML(html: string): string;
}
