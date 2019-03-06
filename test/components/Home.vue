<template>
  <q-page
    class="column gutter-md"
    padding>
    <div class="column items-center">
      <div>
        <br-credential-creator-wizard />
      </div>
    </div>
  </q-page>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import {BrCredentialCreatorWizard} from 'bedrock-vue-credential-creator-wizard';

export default {
  name: 'Home',
  components: {BrCredentialCreatorWizard},
  data() {
    return {};
  }
};
</script>
<style>
</style>
