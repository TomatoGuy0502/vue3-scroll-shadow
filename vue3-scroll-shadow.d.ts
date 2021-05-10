import { DefineComponent, Plugin } from 'vue';

declare const Vue3ScrollShadow: DefineComponent<{}, {}, any> & { install: Exclude<Plugin['install'], undefined> };
export default Vue3ScrollShadow;
