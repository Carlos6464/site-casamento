
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  assets: {
    'index.csr.html': {size: 17404, hash: '5920eaab31f0ff2fc375ec299f5b7610439c6ba7507842b03445d26aead9b426', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 8476, hash: '7e7d7469389667a731b558e5465a292430142580d64297ef105ee4283c18040a', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 107654, hash: '30445a356dec6eb22df8bf7ee919b501b0cb42e3f4847dc1773845587fe21e10', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-VEMDRYEX.css': {size: 116770, hash: 'W1kUaV7ImME', text: () => import('./assets-chunks/styles-VEMDRYEX_css.mjs').then(m => m.default)}
  },
};
