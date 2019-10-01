<template>
  <div>
    STEP {{stepIndex}} RENDERED VIA CUSTOM COMPONENT
    <pre>{{currentStep}}</pre>
  </div>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import {BrCustomStepMixin} from 'bedrock-vue-credential-creator-wizard';

export default {
  name: 'BrCustomStep',
  mixins: [BrCustomStepMixin]
};
</script>
<style>
</style>
