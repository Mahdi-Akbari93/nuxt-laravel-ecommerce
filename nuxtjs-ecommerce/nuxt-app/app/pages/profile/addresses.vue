<template>
  <div class="page-card">
    <div class="heading_container mb-4">
      <span class="section-badge"><i class="bi bi-geo-alt-fill"></i> آدرس‌ها</span>
      <h5 class="fw-bold mb-0" style="font-size: 1.1rem">مدیریت آدرس‌های ارسال</h5>
    </div>

    <ProfileAddressCreate :provinces="data.provinces" :cities="data.cities"></ProfileAddressCreate>

    <div class="mt-4">
      <div v-for="address in data.addresses" :key="address.id">
        <ProfileAddressEdit :address="address" :provinces="data.provinces" :cities="data.cities"></ProfileAddressEdit>
      </div>
    </div>

  </div>
  
</template>

<script setup>

const { data , refresh } = await useFetch("/api/profile/addresses", {
  headers: useRequestHeaders(["cookie"]),
});

provide('refreshGetAddress' , refresh)

</script>
