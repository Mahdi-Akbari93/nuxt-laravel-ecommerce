<template>
  <div class="table-responsive">
    <table class="table align-middle">
      <thead>
        <tr>
          <th>نام</th>
          <th>ایمیل</th>
          <th>شماره تلفن</th>
          <th>سطح دسترسی</th>
          <th>تاریخ عضویت</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in props.users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.cellphone }}</td>
          <td>
            <span class="status-pill" :class="user.is_admin == 1 ? 'success' : 'pending'">
              {{ user.is_admin == 1 ? 'ادمین' : 'عادی' }}
            </span>
          </td>
          <td>{{ user.created_at }}</td>
          <td>
            <div class="d-flex">
              <NuxtLink :to="`/users/${user.id}`" class="btn btn-sm btn-outline-dark me-2">نمایش</NuxtLink>
              <NuxtLink :to="`/users/edit/${user.id}`" class="btn btn-sm btn-dark">ویرایش</NuxtLink>
              <button
                @click="deleteUser(user.id)"
                :disabled="deletingId === user.id"
                class="btn btn-sm btn-delete ms-2"
                type="button"
              >
                <span v-if="deletingId === user.id" class="spinner-border spinner-border-sm"></span>
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

const props = defineProps(['users'])

const toast = useToast();
const deletingId = ref(null);

async function deleteUser(id) {
  if (!confirm("آیا از حذف این کاربر مطمئن هستید؟")) return;

  try {
    deletingId.value = id;

    await $fetch('/api/global', {
      method: 'DELETE',
      query: { url: `/users/${id}` },
    });

    toast.warning("حذف کاربر باموفقیت انجام شد");
    await refreshNuxtData();
  } catch (error) {
    toast.error(errorText(error) ?? "حذف کاربر با خطا مواجه شد");
  } finally {
    deletingId.value = null;
  }
}
</script>