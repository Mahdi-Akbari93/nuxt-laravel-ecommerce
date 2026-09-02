<template>
  <template v-if="addresses?.length != 0">
    <div class="d-flex align-items-center flex-wrap gap-2">
      <label class="form-label mb-0">
        <i class="bi bi-geo-alt-fill" style="color: var(--brand)"></i>
        انتخاب آدرس
      </label>

      <select
        @change="(el) => emit('setAddressId' , el.target.value)"
        style="width: 220px"
        class="form-select"
        aria-label="انتخاب آدرس"
      >
        <option value="">انتخاب آدرس</option>
        <option
          v-for="address in addresses"
          :key="address.id"
          :value="address.id"
        >
          {{ address.title }}
        </option>
      </select>
    </div>
  </template>

  <NuxtLink v-else to="/profile/addresses" class="btn-add">
    <i class="bi bi-plus-lg"></i>
    ایجاد آدرس
  </NuxtLink>
</template>

<script setup>

const emit = defineEmits(['setAddressId'])
const { data: addresses } = await useFetch("/api/cart/addresses");

</script>
