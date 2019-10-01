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
            v-if="stepComponent === null && stepIndex === lastStepIndex"
            :credentials="credentials"
            :schema-map="schemaMap" />
          <form v-else-if="stepComponent === 'form'">
            <br-q-form-generator
              v-model="currentStep.form.model"
              :vocab="vocab"
              :schema="currentStep.form.schema" />
          </form>
          <slot
            v-else-if="stepComponent === 'slot'"
            :currentStep="currentStep"
            :stepIndex="stepIndex"
            :vocab="vocab" />
          <component
            :is="stepComponent"
            v-else
            v-bind="{currentStep, stepIndex, vocab}" />
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
    stepComponentMap: {
      type: Object,
      default: () => ({})
    },
    templates: {
      type: Array,
      default: () => [],
      required: true
    },
    welcome: {
      type: Object,
      default: () => undefined
    },
    review: {
      type: Object,
      default: () => undefined
    }
  },
  data() {
    return {
      credentials: [],
      stepIndex: 0
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
      const {welcomeStep, reviewStep} = this;

      const steps = [];

      // only add welcome step if available
      if(welcomeStep !== null) {
        steps.push(welcomeStep);
      }

      // add main flow and review
      steps.push(...this.flow);
      steps.push(reviewStep);
      return steps;
    },
    reviewStep() {
      // use given review step
      if(this.review) {
        return this.review;
      }

      // create default review step
      return {
        icon: {
          name: 'fas fa-check-circle',
          size: '65px',
          color: 'primary'
        },
        heading: 'Does this look okay?',
        name: 'Review'
      };
    },
    welcomeStep() {
      // use given welcome step
      if(this.welcome !== undefined) {
        return this.welcome;
      }

      // create default welcome step
      const plural = 'credential' + (this.templates.length === 1 ? '' : 's');
      return {
        icon: {
          name: 'fas fa-walking',
          size: '65px',
          color: 'primary'
        },
        heading: 'Welcome, let\'s get started!',
        subheading:
          'We need to walk through a few steps to collect information for ' +
          `the ${plural}.`,
        name: 'Introduction'
      };
    },
    stepComponent() {
      const {currentStep, stepComponentMap} = this;
      if(currentStep.component) {
        return stepComponentMap[currentStep.component] || 'slot';
      }
      if(currentStep.form) {
        return 'form';
      }
      return null;
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
