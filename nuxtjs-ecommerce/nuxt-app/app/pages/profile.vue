<template>
    <NuxtLayout name="profile">
        <NuxtPage></NuxtPage>
    </NuxtLayout>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});
</script>
