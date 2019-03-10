<template>
  <div class="fit">
    <div class="row justify-center">
      <div
        v-for="credential in credentials"
        :key="credential.type[1]"
        class="q-my-none row">
        <credential-card-detail
          :credential="credential"
          :schema="schemaMap[credential.type[1]]" />
      </div>
    </div>
  </div>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import {CredentialCardDetail} from 'bedrock-vue-credential-card';

export default {
  name: 'BrCreateCredentialReview',
  components: {CredentialCardDetail},
  props: {
    schemaMap: {
      type: Object,
      default: () => ({}),
      required: true
    },
    credentials: {
      type: Array,
      default: () => [],
      required: true
    }
  }
};
</script>
<style>
</style>
