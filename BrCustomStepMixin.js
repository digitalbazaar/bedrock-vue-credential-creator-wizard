/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

export default {
  props: {
    currentStep: {
      type: Object,
      default: () => ({}),
      required: true
    },
    stepIndex: {
      type: Number,
      default: 0,
      required: true
    },
    vocab: {
      type: Object,
      default: () => ({}),
      required: true
    }
  }
};
