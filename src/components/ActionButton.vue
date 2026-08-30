<template>
  <q-btn
    :to="to"
    :label="label"
    :class="['action-button', `variant-${variant}`]"
    :flat="variant === 'nav'"
    :outline="variant === 'secondary' || variant === 'ghost'"
    :unelevated="variant === 'primary'"
    :no-caps="variant === 'nav' || variant === 'secondary'"
    :color="variant === 'primary' ? 'primary' : variant === 'secondary' ? 'white' : 'transparent'"
    :text-color="variant === 'primary' ? 'grey-9' : variant === 'nav' ? 'white' : 'white'"
    @click="$emit('click')"
  >
    <slot />
  </q-btn>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: '',
  },
  to: {
    type: String,
    default: undefined,
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'ghost', 'nav'].includes(value),
  },
})

defineEmits(['click'])
</script>

<style scoped>
.action-button {
  border-radius: 999px;
  font-weight: 700;
  letter-spacing: 0.02em;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.action-button:hover,
.action-button:focus-visible {
  transform: translateY(-2px);
}

.variant-primary {
  background: linear-gradient(135deg, #f8d68a 0%, #f1b668 100%);
  color: #1f2937 !important;
  box-shadow: 0 12px 24px rgba(241, 182, 104, 0.28);
}

.variant-primary:hover,
.variant-primary:focus-visible {
  box-shadow: 0 18px 30px rgba(241, 182, 104, 0.35);
}

.variant-secondary {
  border-color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.04);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.4);
}

.variant-secondary:hover,
.variant-secondary:focus-visible {
  background: rgba(255, 255, 255, 0.08);
}

.variant-ghost {
  border-color: rgba(17, 24, 39, 0.2);
  background: rgba(255, 255, 255, 0.55);
  color: #11212c !important;
}

.variant-nav {
  min-height: 40px;
  padding-inline: 0.75rem;
  font-size: 0.95rem;
  border-radius: 10px;
  color: #f5f7ff !important;
}

.variant-nav:hover,
.variant-nav:focus-visible {
  background: rgba(255, 255, 255, 0.06);
}
</style>
