/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
import Vue from 'vue';
import {BrCredentialCreatorWizard} from 'bedrock-vue-credential-creator-wizard';

// helper function that mounts and returns the rendered text
function render(propsData) {
  const Constructor = Vue.extend(BrCredentialCreatorWizard);
  return new Constructor({propsData}).$mount();
}

describe('BrCredentialCreatorWizard', () => {
  it('should check something on the rendered element', async () => {
    // TODO: specify propsData
    const vm = render({});
    should.exist(vm);
    should.exist(vm.$el);
    // TODO: $vm.el.something
  });
});
