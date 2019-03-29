<template>
  <div class="fit">
    <br-wizard
      :current-step-index="stepIndex"
      :total-steps="steps.length"
      @next="next($event)"
      @finish="finish($event)"
      @index="stepIndex = $event">
      <br-wizard-step
        :heading="currentStep.heading"
        :image="currentStep.image"
        :icon="currentStep.icon"
        :subheading="currentStep.subheading">
        <div class="q-pb-xl full-width">
          <br-create-credential-review
            v-if="stepIndex === lastStepIndex"
            :credentials="credentials"
            :schema-map="schemaMap" />
          <form v-if="currentStep.form">
            <br-q-form-generator
              v-model="currentStep.form.model"
              :vocab="vocab"
              :schema="currentStep.form.schema" />
          </form>
        </div>
      </br-wizard-step>
    </br-wizard>
  </div>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import BrCreateCredentialReview from './BrCreateCredentialReview.vue';
import {BrQFormGenerator} from 'bedrock-quasar-form-generator';
import {BrWizard, BrWizardStep} from 'bedrock-vue-wizard';
import jsonata from 'jsonata';

export default {
  name: 'BrCredentialCreatorWizard',
  components: {
    BrWizard,
    BrWizardStep,
    BrCreateCredentialReview,
    BrQFormGenerator
  },
  props: {
    value: {
      type: Array,
      default: () => [],
      required: true
    },
    subject: {
      type: String,
      default: '',
      required: true
    },
    issuer: {
      type: String,
      default: '',
      required: true
    },
    flow: {
      type: Array,
      default: () => [],
      required: true
    },
    vocab: {
      type: Object,
      default: () => ({}),
      required: true
    },
    schemaMap: {
      type: Object,
      default: () => ({}),
      required: true
    },
    templates: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data() {
    return {
      credentials: [],
      stepIndex: 0,
      welcomeStep: {
        icon: {
          name: 'fas fa-walking',
          size: '65px',
          color: 'primary'
        },
        heading: 'Welcome, let\'s get started!',
        subheading: 'We need to walk through a few steps to collect ' +
          'information for your credentials.',
        name: 'Introduction'
      },
      reviewStep: {
        icon: {
          name: 'fas fa-check-circle',
          size: '65px',
          color: 'primary'
        },
        heading: 'Does this look okay?',
        name: 'Review and Submit for Approval'
      }
    };
  },
  computed: {
    currentStep() {
      return this.steps[this.stepIndex];
    },
    lastStepIndex() {
      return this.steps.length - 1;
    },
    steps() {
      return [this.welcomeStep, ...this.flow, this.reviewStep];
    }
  },
  methods: {
    next() {
      if(this.stepIndex + 1 === this.lastStepIndex) {
        // create credentials for review
        const {flow, issuer, subject, templates} = this;
        this.credentials = createCredentials({
          flow,
          templates,
          constants: {subject, issuer}
        });
      }
    },
    finish() {
      this.$emit('finish', {credentials: this.credentials});
    }
  }
};

function createCredentials({flow, templates, constants}) {
  // 1. Merge all forms into data for the templates.
  const data = flow
    .filter(({form}) => form)
    .map(({form}) => ({[form.id]: form.model}))
    .reduce((acc, data) => ({...acc, ...data}), {});
  // 2. Create a credential for each template
  return templates.map(
    template => jsonata(template).evaluate({...data, constants}));
}
</script>
<style>
</style>
