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
        v-if="data.transactions.length == 0"
        class="empty-state"
      >
        <i class="bi bi-credit-card-2-front"></i>
        <h5>تراکنشی یافت نشد!</h5>
        <p>هنوز تراکنشی برای حساب شما ثبت نشده است.</p>
      </div>

      <div v-else>
        <div class="table-responsive cart-table-wrapper">
          <table class="table align-middle">
            <thead>
              <tr>
                <th>شماره سفارش</th>
                <th>مبلغ</th>
                <th>وضعیت</th>
                <th>شماره پیگیری</th>
                <th>تاریخ</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="transaction in data.transactions"
                :key="transaction.id"
              >
                <th>#{{ transaction.id }}</th>
                <td class="fw-bold">{{ numberFormat(transaction.amount) }} تومان</td>
                <td>
                  <span
                    class="status-pill"
                    :class="{
                      success: transaction.status == 'موفق',
                      failed: transaction.status == 'ناموفق',
                    }"
                    >{{ transaction.status }}</span
                  >
                </td>
                <td style="direction: ltr">{{transaction.trans_id}}</td>
                <td>{{ transaction.created_at }}</td>
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
const { data, refresh, pending } = await useFetch(
  () => "/api/profile/transactions",
  {
    query: { page: page },
    headers: useRequestHeaders(["cookie"]),
  },
);

function paginate(number) {
  page.value = number;
  refresh();
}

console.log(data.value);
</script>
