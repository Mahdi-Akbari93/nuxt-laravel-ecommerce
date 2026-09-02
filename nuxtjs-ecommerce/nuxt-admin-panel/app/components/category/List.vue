<template>
  <div class="table-responsive">
    <table class="table align-middle">
      <thead>
        <tr>
          <th>نام</th>
          <th>توضیحات</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in props.categories" :key="category.id">
          <td>{{ category.name }}</td>
          <td>{{ category.description }}</td>
          <td>
            <div class="d-flex">
              <NuxtLink
                :to="`/categories/${category.id}`"
                class="btn btn-sm btn-outline-dark me-2"
                >نمایش
              </NuxtLink>
              <NuxtLink
                :to="`/categories/edit/${category.id}`"
                class="btn btn-sm btn-dark"
                >ویرایش
              </NuxtLink>
              <button
                @click="deleteCategory(category.id)"
                :disabled="deletingId === category.id"
                class="btn btn-sm btn-delete ms-2"
                type="button"
              >
                <span v-if="deletingId === category.id" class="spinner-border spinner-border-sm"></span>
                <i v-else class="bi bi-trash3"></i>
                حذف
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";

const props = defineProps(["categories"]);

const toast = useToast();
const deletingId = ref(null);

async function deleteCategory(id) {
  if (!confirm("آیا از حذف این دسته بندی مطمئن هستید؟")) return;

  try {
    deletingId.value = id;

    await $fetch('/api/global', {
      method: 'DELETE',
      query: { url: `/categories/${id}` },
    });

    toast.warning("حذف دسته بندی باموفقیت انجام شد");
    await refreshNuxtData();
  } catch (error) {
    toast.error(errorText(error) ?? "حذف دسته بندی با خطا مواجه شد");
  } finally {
    deletingId.value = null;
  }
}
</script>
