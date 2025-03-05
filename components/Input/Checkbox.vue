<template>
  <div>
    <label class="flex" :class="labelClass">
      <input
          class="flex-grow-0 flex-shrink-0"
          :class="[inputClass, theme]"
          :value="checkedValue"
          :name="name"
          :checked="checked"
          @change="handleChange"
          :disabled="disabled"
          type="checkbox"
      />

      <span class="inline-block text-sm ml-2"><slot :error="errorMessage"></slot></span>
    </label>

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

const props = withDefaults(defineProps<{
  placeholder?: string
  inputClass?: string | string[]
  labelClass?: string | string[]
  hideErrors?: boolean
  theme?: 'default-checkbox'

  name: string
  checkedValue: string | boolean,
  label?: string
  rules?: RuleExpression<any>
  disabled?: boolean
}>(), {
  theme: 'default-checkbox'
})

const name = toRef(props, 'name');
const disabled = toRef(props, 'disabled');

const {handleChange, value, checked, errorMessage} = useField(name, props.rules, {
  checkedValue: props.checkedValue,
  uncheckedValue: false,
  label: props.label,
  type: "checkbox"
});
</script>

<style scoped>

</style>