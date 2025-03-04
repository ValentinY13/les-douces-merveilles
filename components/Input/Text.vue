<template>
  <div>
    <slot :id="inputId" :error="errorMessage"></slot>

    <div class="relative">
      <input
          :name="name"
          :disabled="disabled"
          class="w-full default-input"
          :class="[inputClass, theme, errorMessage ? 'input-error': undefined]"
          :type="type"
          :value="inputValue"
          :placeholder="placeholder"
          :id="inputId"
          @input="handleChange"
          @blur="handleBlur">
    </div>
    <transition name="fade">
            <span class="error-message" v-if="errorMessage && !props.hideErrors">
                {{ errorMessage }}
            </span>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {useField} from "vee-validate";
import type {RuleExpression} from "vee-validate";

type TextProps = {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  inputClass?: string | string[];
  theme?: 'input--no-border';
  hideErrors?: boolean;
  disabled?: boolean;
  inputId?: string
}

const props = withDefaults(defineProps<TextProps>(), {
  label: '',
  type: 'text',
  placeholder: '',
  inputClass: '',
  hideErrors: false,
  disabled: false
})

const name = toRef(props, 'name');
const disabled = toRef(props, 'disabled');

const {errorMessage, value: inputValue, handleBlur, handleChange} = useField(
    name,
    undefined,
    {
      label: props.label
    }
);
</script>