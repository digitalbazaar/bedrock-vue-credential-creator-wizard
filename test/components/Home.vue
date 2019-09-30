<template>
  <q-page
    class="column q-col-gutter-md"
    padding>
    <div class="column items-center">
      <br-credential-creator-wizard
        subject="did:example:subject"
        issuer="did:example:issuer"
        :flow="flow"
        :vocab="vocab"
        :schema-map="schemaMap"
        :templates="templates"
        :welcome="welcome"
        :setup="setup"
        @finish="finish($event)">
        <template #setup="{currentStep, stepIndex}">
          Custom Step {{stepIndex}}
          <pre>{{currentStep}}</pre>
        </template>
      </br-credential-creator-wizard>
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
    return {
      credentials: [],
      setup: [{
        icon: {
          name: 'fas fa-walking',
          size: '65px',
          color: 'primary'
        },
        heading: 'Custom Setup Heading 1',
        subheading: 'Custom setup subheading 1',
        name: 'Custom Setup Name 1'
      }, {
        icon: {
          name: 'fas fa-walking',
          size: '65px',
          color: 'primary'
        },
        heading: 'Custom Setup Heading 2',
        subheading: 'Custom setup subheading 2',
        name: 'Custom Setup Name 2'
      }],
      welcome: {
        icon: {
          name: 'fas fa-walking',
          size: '65px',
          color: 'primary'
        },
        heading: 'Custom welcome, let\'s get started!',
        subheading:
          'We need to walk through a few steps to collect information for ' +
          `the credential.`,
        name: 'Custom Introduction'
      },
      flow: [{
        icon: {
          name: 'far fa-list-alt',
          size: '65px',
          color: 'primary'
        },
        heading: 'Let\'s fill out some information about you',
        name: 'Personal Information',
        form: {
          id: 'user',
          model: {
            name: 'Jane Doe',
            email: 'jane.doe@example.com'
          },
          schema: {
            name: {
              placeholder: 'Your name'
            },
            email: {
              //component: 'SomeCustomComponent',
              placeholder: 'Your email address'
            }
          }
        }
      }/*,
      {
        icon: {
          name: 'fas fa-map-marker-alt',
          size: '65px',
          color: 'primary'
        },
        heading: 'Where are you located?',
        name: 'Address Information',
        form: {
          id: 'address',
          model: {
            address: {}
          },
          schema: {
            address: {
              component: 'br-address-form'
            }
          }
        }
      }*/],
      schemaMap: {
        PersonCredential: {
          name: {
            name: 'Name',
            icon: 'fas fa-user'
          },
          email: {
            name: 'Email',
            icon: 'fas fa-envelope'
          }/*,
          address: {
            name: 'Address',
            icon: 'fa fa-map-marker-alt',
            sublabels: true
          }*/
        }
      },
      templates: [`{
        "@context": [
          "https://w3id.org/credentials/v1",
          "https://example.com/examples/v1"
        ],
        "type": ["VerifiableCredential", "PersonCredential"],
        "name": "Personal Details",
        "description": "Your personal information",
        "issuer": constants.issuer,
        "credentialSubject": $merge([
          {"id": constants.subject},
          user
        ])
      }`],
      vocab: {
        name: {
          range: 'string',
          label: 'Name',
          inputType: 'text'
        },
        email: {
          range: 'string',
          label: 'Email',
          inputType: 'email'
        },
        address: {
          range: 'PostalAddress',
          label: 'Address'
        }
      }
    };
  },
  methods: {
    finish({credentials}) {
      console.log('finish', credentials);
    }
  }
};
</script>
<style>
</style>
