/// <reference types="vite/client" />
declare module '*.vue' {
    import { defineComponent } from 'vue'
    constcomponent: ReturnType<typeof defineComponent>
    export default component
}