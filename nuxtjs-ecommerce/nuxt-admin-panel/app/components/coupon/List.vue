<template>
  <div class="table-responsive">
    <table class="table align-middle">
      <thead>
        <tr>
          <th>کد</th>
          <th>درصد</th>
          <th>تاریخ انقضا</th>
          <th>تاریخ ایجاد</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="coupon in props.coupons" :key="coupon.id">
          <td>{{ coupon.code }}</td>
          <td>{{ coupon.percentage }}</td>
          <td>{{ coupon.expired_at_jalali }}</td>
          <td>{{ coupon.created_at }}</td>
          <td>
            <div class="d-flex">
              <NuxtLink
                :to="`/coupons/${coupon.id}`"
                class="btn btn-sm btn-outline-dark me-2"
                >نمایش
              </NuxtLink>
              <NuxtLink
                :to="`/coupons/edit/${coupon.id}`"
                class="btn btn-sm btn-dark"
                >ویرایش</NuxtLink
              >
              <button
                @click="deleteCoupon(coupon.id)"
                :disabled="deletingId === coupon.id"
                class="btn btn-sm btn-delete ms-2"
                type="button"
              >
                <span v-if="deletingId === coupon.id" class="spinner-border spinner-border-sm"></span>
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

const props = defineProps(["coupons"]);

const toast = useToast();
const deletingId = ref(null);

async function deleteCoupon(id) {
  if (!confirm("آیا از حذف این کد تخفیف مطمئن هستید؟")) return;

  try {
    deletingId.value = id;

    await $fetch('/api/global', {
      method: 'DELETE',
      query: { url: `/coupons/${id}` },
    });

    toast.warning("حذف تخفیف باموفقیت انجام شد");
    await refreshNuxtData();
  } catch (error) {
    toast.error(errorText(error) ?? "حذف تخفیف با خطا مواجه شد");
  } finally {
    deletingId.value = null;
  }
}
</script>
