/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import * as brVue from 'bedrock-vue';
import Vue from 'vue';
import VueRouter from 'vue-router';

// FIXME: make configurable
Vue.config.devtools = true;

// install all plugins
Vue.use(brVue);

brVue.setRootVue(async () => {
  // load dynamic imports in parallel
  const [
    brQuasar,
    Quasar,
    {default: iconSet}
  ] = await Promise.all([
    import('bedrock-quasar'),
    import('quasar-framework'),
    import('quasar-framework/icons/fontawesome')
  ]);

  // replace default `br-root` with a custom one
  Vue.component('br-root', () => import('./BrRoot.vue'));

  const router = new VueRouter({
    mode: 'history',
    routes: [{
      path: '/',
      component: () => import('./Home.vue'),
      meta: {title: 'Test'}
    }]
  });

  // configure quasar
  Quasar.icons.set(iconSet);
  // await brQuasar.theme({
  //   Quasar,
  //   brand: {
  //     primary: '#xxxxxx'
  //   }
  // });

  const BrApp = Vue.component('br-app');
  return new BrApp({
    router
  });
});
