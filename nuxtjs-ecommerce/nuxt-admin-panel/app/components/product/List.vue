<template>
  <div class="table-responsive">
    <table class="table align-middle">
      <thead>
        <tr>
          <th>تصویر</th>
          <th>نام</th>
          <th>دسته بندی</th>
          <th>قیمت</th>
          <th>تعداد</th>
          <th>وضعیت</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in props.products" :key="product.id">
          <th>
            <img
              src="/images/preloader.png"
              width="80"
              height="53"
              v-img="product.primary_image"
            />
          </th>
          <td>{{ product.name }}</td>
          <td>{{ product.category }}</td>
          <td>{{ numberFormat(product.price) }}</td>
          <td>{{ product.quantity }}</td>
          <td><span class="status-pill" :class="statusClass(product.status)">{{ product.status }}</span></td>
          <td>
            <div class="d-flex">
              <nuxt-link class="btn btn-sm btn-outline-dark me-2" :to="`/products/${product.id}`">
                نمایش
              </nuxt-link>
              <nuxt-link class="btn btn-sm btn-dark" :to="`/products/edit/${product.id}`">
                ویرایش
              </nuxt-link>
              <button
                @click="deleteProduct(product.id)"
                :disabled="deletingId === product.id"
                class="btn btn-sm btn-delete ms-2"
                type="button"
              >
                <span v-if="deletingId === product.id" class="spinner-border spinner-border-sm"></span>
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

const props = defineProps(["products"]);

const toast = useToast();
const deletingId = ref(null);

async function deleteProduct(id) {
  if (!confirm("آیا از حذف این محصول مطمئن هستید؟")) return;

  try {
    deletingId.value = id;

    await $fetch('/api/global', {
      method: 'DELETE',
      query: { url: `/products/${id}` },
    });

    toast.warning("حذف محصول باموفقیت انجام شد");
    await refreshNuxtData();
  } catch (error) {
    toast.error(errorText(error) ?? "حذف محصول با خطا مواجه شد");
  } finally {
    deletingId.value = null;
  }
}
</script>
