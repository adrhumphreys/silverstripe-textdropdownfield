import { loadComponent } from 'lib/Injector';
import React from 'react';
import { createRoot } from 'react-dom/client';

window.jQuery.entwine('ss', ($) => {
  $('.js-injector-boot .form__field-holder .text-dropdown-field').entwine({
    ReactRoot: null,

    onmatch() {
      const cmsContent = this.closest('.cms-content').attr('id');
      const context = (cmsContent)
        ? { context: cmsContent }
        : {};

      const Component = loadComponent('TextDropdownField', context);
      const schemaState = this.data('state');

      const setValue = (fieldName, value) => {
        const input = document.querySelector(`input[name="${fieldName}"]`);

        if (!input) {
          return;
        }

        input.value = value;
      };

      let root = this.getReactRoot();
      if (!root) {
        root = createRoot(this[0]);
        this.setReactRoot(root);
      }
      root.render(
        <Component {...schemaState} onAutofill={setValue} />
      );
    },

    onunmatch() {
      const root = this.getReactRoot();
      if (root) {
        root.unmount();
        this.setReactRoot(null);
      }
    },
  });
});
