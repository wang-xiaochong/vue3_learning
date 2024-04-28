declare module "*.vue" {
    import type { DefineComponent } from "vue";

    const vueComponent: DefineComponent<{}, {}, any>;

    export default vueComponent;
}

declare module 'lodash'

// declare module '*.js' {
//     const src: string
//     export default src
// }