<template>
  <component :is="tag">
    <label
        class="checkbox-chip"
        :class="{'active' : checked}">
      <input
          aria-hidden="false" class="hidden"
          :value="checkedValue"
          :name="name"
          :checked="checked"
          @change="handleChange"
          :disabled="disabled"
          type="checkbox"
      />

      <slot></slot>
    </label>
  </component>
</template>

<script setup lang="ts">
import {useField} from "vee-validate";
import type {RuleExpression} from "vee-validate";

const props = withDefaults(defineProps<{
  name: string
  checkedValue: string | number | boolean,
  label?: string
  rules?: RuleExpression<any>
  disabled?: boolean
  tag?: string
}>(), {
  tag: 'div'
})

const name = toRef(props, 'name');
const disabled = toRef(props, 'disabled');

const {handleChange, value, checked} = useField(
    name,
    props.rules,
    {
      checkedValue: props.checkedValue,
      uncheckedValue: false,
      label: props.label,
      type: "checkbox"
    }
);
</script>

<style scoped>
@reference "~/assets/css/tailwind.css";

.checkbox-chip {
  --_color: var(--color-brown-700, theme('colors.brown.700'));
  --_background-color: var(--background-color, theme('colors.brown.700'));
  color: var(--_background-color);
  border: 1px solid var(--_color);
  cursor: pointer;
  transition: background-color .3s, color .3s;
  @apply px-2 py-1 font-medium text-xs tracking-wide;

  &.active {
    --_color: var(--color-brown-700, theme('colors.brown.700'));
    color: var(--_color);
    background-color: var(--_color);
    @apply text-white;

    &:hover {
      --_color: var(--color-brown-100, theme('colors.brown.100'));
      background-color: var(--_color);
    }
  }

  &:hover {
    --_color: var(--color-brown-700, theme('colors.brown.700'));
    background-color: var(--_color);
    @apply text-white;
  }
}
</style>