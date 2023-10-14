import { createVuetify, VuetifyOptions } from 'vuetify'
import * as components from 'vuetify/components'
import * as labs from 'vuetify/labs/components'
import * as directives from 'vuetify/directives'
import 'vuetify/dist/vuetify.min.css'

export default createVuetify({
  ssr: true,
  directives,
  components: {
    ...components,
    ...labs
  },
  display: {
    mobileBreakpoint: 'md'
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: "#3215a1",
          secondary: "#e7386f",
          // "page-header-background": "#d7d7ce",
          // "page-background": "#cdcdc1",
          // "table-header": "#cdcdc1",
          // background: "#c0c0b5",
          // "header-background": "#b5b5a6",
          // "info-text": "#666660",
        },
      },
      dark: {
        dark: true,
        colors: {
          // primary: "#00C853",
          // "page-header-background": "#282831",
          // "page-background": "#32323E",
          // "table-header": "#2e2e2e",
          // background: "#3F3F4A",
          // "header-background": "#4a4a59",
          // "info-text": "#99999F",
        },
      },
    }
  }
} as VuetifyOptions)