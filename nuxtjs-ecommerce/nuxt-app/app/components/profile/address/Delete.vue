<template>
  <div @click="deleteAddress" class="btn btn-outline-brand text-danger" style="border-color: rgba(239,68,68,.45); color: var(--danger)">
    <i class="bi bi-trash3 ms-1"></i>
    حذف آدرس

    <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";

const props = defineProps(["addressId"]);
const loading = ref(false);
const toast = useToast();
const errors = ref([]);
const refreshGetAddress = inject('refreshGetAddress')

async function deleteAddress() {
  try {
    loading.value = true;
    errors.value = [];

    await $fetch("/api/profile/addresses/delete", {
      method: "POST",
      body: {address_id: props.addressId },
    });

    refreshGetAddress()
    toast.warning("حذف آدرس باموفقیت انجام شد");
  } catch (error) {
    errors.value = Object.values(error.data.data.message).flat();
  } finally {
    loading.value = false;
  }
}
</script>
