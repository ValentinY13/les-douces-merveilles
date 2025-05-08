<template>
  <div ref="dropdownRef">
    <slot :id="inputId" :error="errorMessage"></slot>

    <div class="relative">
      <select
          :name="name"
          :disabled="disabled"
          :class="inputClasses"
          v-model="fieldValue"
          :id="inputId"
          hidden
      >
        <option value="" disabled selected>{{ placeholder }}</option>
        <option v-for="option in options" :value="option.value">
          {{ option.label }}
        </option>
      </select>

      <button
          :disabled="disabled" type="button"
          @click="toggleDropdown"
          class="cursor-pointer py-3 px-2 text-xs border-b border-b-brown-100 flex items-center text-left gap-3 w-full hover:ring-1 hover:ring-brown-700 disabled:bg-grey-100 disabled:hover:ring-0 disabled:cursor-not-allowed"
          :class="[isOpen ? 'ring-1 ring-brown-700' : undefined, errorMessage ? '!ring-red-700 ring-1': undefined]"
          aria-haspopup="listbox"
          :aria-expanded="isOpen" tabindex="0">
        <span class="overflow-hidden whitespace-nowrap text-ellipsis flex-1 text-sm text-brown-100 opacity-50">{{
            selectedOption || placeholder
          }}</span>
        <span class="relative">
          <i class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 icon icon-simple-chevron-bold -rotate-90 text-brown-700 text-base"></i>
        </span>
      </button>

      <transition name="fade-top">
        <ul v-if="isOpen"
            class="absolute shadow overflow-clip translate-y-1 left-0 w-full bg-bg-primary text-xs z-40"
            role="listbox" :aria-labelledby="inputId">
          <li
              class="py-3 px-6 cursor-pointer border-b-[1px] border-b-grey-700 last:border-b-0 hover:bg-brown-700 hover:text-white"
              v-for="option in options"
              :key="option.value"
              @click="handleValueChange(option.value, $event)"
              @keydown.enter="handleValueChange(option.value, $event)"
              role="option"
              :aria-selected="fieldValue === option.value"
              tabindex="0"
              :data-disabled="option.disabled"
              :class="{ 'bg-brown-700 text-white': fieldValue === option.value, '!bg-grey-100 !text-grey-700 !cursor-not-allowed': option.disabled }"
          >
            {{ option.label }}
          </li>
        </ul>
      </transition>

    </div>

    <transition name="fade">
        <span class="error-message block" v-if="errorMessage && !hideErrors">
            {{ errorMessage }}
        </span>
    </transition>
  </div>
</template>


<script setup lang="ts">
import {useField} from "vee-validate";
import type {RuleExpression} from "vee-validate";

type SelectProps = {
  modelValue?: string | number;
  label?: string;
  value?: string | number;
  name: string;
  placeholder?: string;
  rules?: RuleExpression<any>;
  inputClass?: string | string[];
  hideErrors?: boolean;
  disabled?: boolean;
  options: { value: string, label: string, disabled?: boolean }[]
  theme?: string;
  inputId?: string
}

const {
  modelValue = '',
  label = '',
  value = '',
  disabled = false,
  hideErrors = false,
  theme = 'default',
  rules,
  inputClass,
  name,
  options
} = defineProps<SelectProps>()

const inputThemeClass = computed(() => {
  return `select--${theme}`
})

const inputClasses = computed(() => {
  if (!inputClass) return inputThemeClass.value;

  if (typeof inputClass === "string")
    return [inputThemeClass.value, inputClass];

  return [inputThemeClass.value, ...inputClass]
})

const {errorMessage, value: fieldValue, setValue} = useField(name, rules, {
  label: label
});

const isOpen = ref(false);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

const selectedOption = computed(() => {
  const option = options.find(option => option.value === fieldValue.value);
  return option ? option.label : '';
})

function handleValueChange(newValue: string, event: Event) {
  // check if the option is disabled (data-disabled attribute)
  const isDisabled = (event.target as HTMLElement).getAttribute('data-disabled') === 'true';

  if (isDisabled) return;

  setValue(newValue);
  toggleDropdown();
}

function handleClickOutside() {
  isOpen.value = false;
}

const dropdownRef = templateRef('dropdownRef');
onClickOutside(dropdownRef, handleClickOutside)

watch(() => modelValue, (newValue) => {
  setValue(newValue);
});

// watch options for changes and check if the selected value is disabled
watch(() => options, (newValue) => {
  if (newValue.length === 0) return;

  const selectedOption = newValue.find(option => option.value === fieldValue.value);
  if (selectedOption && selectedOption.disabled) {
    setValue(undefined);
  }
}, {deep: true})

defineExpose({
  value: fieldValue,
  setValue
})
</script>
