<template>
  <div>
    <NuxtLoadingIndicator color="#a23e2c" :height="3"></NuxtLoadingIndicator>
    <button
      class="theme-toggle"
      :aria-label="isDark ? 'روشن کردن حالت روشن' : 'روشن کردن حالت تاریک'"
      @click="toggleTheme"
      type="button"
    >
      <i :class="isDark ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill'" aria-hidden="true"></i>
    </button>
    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </div>
</template>

<script setup>
const isDark = ref(false);

function applyTheme(theme) {
  const selectedTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", selectedTheme);
  document.documentElement.style.colorScheme = selectedTheme;
  isDark.value = selectedTheme === "dark";
}

function toggleTheme() {
  const nextTheme = isDark.value ? "light" : "dark";
  localStorage.setItem("theme", nextTheme);
  applyTheme(nextTheme);
}

onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  applyTheme(savedTheme || systemTheme);
});
</script>
