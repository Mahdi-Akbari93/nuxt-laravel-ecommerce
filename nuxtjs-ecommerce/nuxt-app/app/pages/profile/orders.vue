<template>
  <div class="page-card">
    <div
      v-if="pending"
      class="d-flex justify-content-center align-items-center py-5"
    >
      <div v-if="loading" class="spinner-border" style="color: var(--brand)"></div>
    </div>

    <template v-else>
      <div
        v-if="data.orders.length == 0"
        class="empty-state"
      >
        <i class="bi bi-bag-x"></i>
        <h5>سفارشی یافت نشد!</h5>
        <p>هنوز سفارشی ثبت نکرده‌اید.</p>
      </div>

      <div v-else>
        <div class="table-responsive cart-table-wrapper">
          <table class="table align-middle">
            <thead>
              <tr>
                <th>شماره سفارش</th>
                <th>آدرس</th>
                <th>وضعیت</th>
                <th>وضعیت پرداخت</th>
                <th>قیمت کل</th>
                <th>تاریخ</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in data.orders" :key="order.id">
                <th>#{{ order.id }}</th>
                <td>{{ order.address_title }}</td>
                <td>
                  <span class="status-pill pending">{{ order.status }}</span>
                </td>
                <td>
                  <span
                    class="status-pill"
                    :class="{
                      success: order.payment_status == 'موفق',
                      failed: order.payment_status == 'ناموفق',
                    }"
                    >{{ order.payment_status }}</span
                  >
                </td>
                <td class="fw-bold">{{ numberFormat(order.paying_amount) }} تومان</td>
                <td>{{ order.created_at }}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-outline-brand btn-sm"
                    data-bs-toggle="modal"
                    :data-bs-target="`#modal-${order.id}`"
                  >
                    <i class="bi bi-box-seam ms-1"></i>
                    محصولات
                  </button>
                  <div class="modal fade" :id="`modal-${order.id}`">
                    <div class="modal-dialog modal-lg">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h6 class="modal-title fw-bold">
                            <i class="bi bi-box-seam ms-1" style="color: var(--brand)"></i>
                            محصولات سفارش شماره {{ order.id }}
                          </h6>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body">
                          <table class="table align-middle">
                            <thead>
                              <tr>
                                <th>محصول</th>
                                <th>نام</th>
                                <th>قیمت</th>
                                <th>تعداد</th>
                                <th>قیمت کل</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="product in order.order_items"
                                :key="product.id"
                              >
                                <th>
                                  <img
                                    src="/images/preloader.png"
                                    width="80"
                                    class="cart-item-img"
                                    v-img="product.product_primary_image"
                                    alt=""
                                  />
                                </th>
                                <td class="fw-bold">
                                  {{ product.product_name }}
                                </td>
                                <td>{{ numberFormat(product.price) }}</td>
                                <td>{{ product.quantity }}</td>
                                <td>{{ numberFormat(product.subtotal) }}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <nav class="d-flex justify-content-center mt-5">
          <ul class="pagination">
            <li
              v-for="(link, index) in data.meta.links.slice(1, -1)"
              :key="index"
              class="page-item"
              :class="{ active: link.active }"
            >
              <button @click="paginate(link.label)" class="page-link">
                {{ link.label }}
              </button>
            </li>
          </ul>
        </nav>
      </div>
      
    </template>
    
  </div>
</template>

<script setup>
const page = ref(0);
const { data, refresh, pending } = await useFetch(() => "/api/profile/orders", {
  query: { page: page },
  headers: useRequestHeaders(["cookie"]),
});


function paginate(number) {
  page.value = number;
  refresh();
}

console.log(data.value);
</script>
