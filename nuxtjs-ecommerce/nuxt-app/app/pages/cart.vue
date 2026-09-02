<template>
  <ClientOnly>
    <section v-if="countCart > 0" class="single_page_section layout_padding">
      <div class="container">
        <div class="row">
          <div class="col-md-10 offset-md-1">
            <div class="heading_container mb-4">
              <span class="section-badge"><i class="bi bi-cart-fill"></i> سبد خرید</span>
              <h2>سبد <span>خرید شما</span></h2>
              <p>اقلام سفارش را بررسی کنید و پرداخت نهایی را انجام دهید.</p>
            </div>
            <div class="row gy-4">
              <div class="col-12">
                <div class="table-responsive cart-table-wrapper">
                  <table class="table align-middle">
                    <thead>
                      <tr>
                        <th>محصول</th>
                        <th>نام</th>
                        <th>قیمت</th>
                        <th>تعداد</th>
                        <th>قیمت کل</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in cartItems" :key="item.id">
                        <th>
                          <img
                            src="/images/preloader.png"
                            v-img="item.primary_image"
                            class="cart-item-img"
                            width="100"
                            height="60"
                          />
                        </th>

                        <td class="fw-bold">{{ item.name }}</td>

                        <td>
                          <div>
                            <span v-if="item.is_sale">
                              {{ numberFormat(item.sale_price) }}
                              <del class="text-muted">{{ numberFormat(item.price) }}</del>
                            </span>

                            <span v-else>
                              {{ numberFormat(item.price) }}
                            </span>

                            <span class="ms-1">تومان</span>

                            <div v-if="item.is_sale">
                              <span class="discount-chip">
                                {{ salePercent(item.price, item.sale_price) }}% تخفیف
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="input-counter">
                            <span
                              class="plus-btn"
                              @click="
                                () =>
                                  item.qty < item.quantity &&
                                  cart.increment(item.id)
                              "
                            >
                              +
                            </span>

                            <div class="input-number">{{ item.qty }}</div>

                            <span
                              class="minus-btn"
                              @click="
                                () => item.qty > 1 && cart.decrement(item.id)
                              "
                            >
                              -
                            </span>
                          </div>
                        </td>
                        <td>
                          <span v-if="item.is_sale" class="fw-bold">
                            {{ numberFormat(item.sale_price * item.qty) }}
                          </span>

                          <span v-else class="fw-bold">
                            {{ numberFormat(item.price * item.qty) }}
                          </span>

                          <span class="ms-1">تومان</span>
                        </td>
                        <td>
                          <span
                            @click="removeFromCart(item.id)"
                            class="remove-btn"
                            aria-label="حذف از سبد"
                          >
                            <i class="bi bi-trash3-fill"></i>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button @click="cart.clear" class="btn btn-outline-brand mt-4">
                  <i class="bi bi-x-circle ms-1"></i>
                  پاک کردن سبد خرید
                </button>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-12 col-md-6">
                <CartCoupon :coupon="coupon"></CartCoupon>
              </div>

              <div
                class="col-12 col-md-6 d-flex justify-content-end align-items-baseline"
              >
                <CartAddress @set-address-id="(id)=> addressId = id"></CartAddress>

              </div>

            </div>
            <div class="row justify-content-center mt-5">
              <div class="col-12 col-md-6">
                <div class="summary-card">
                  <div class="summary-head">
                    <i class="bi bi-receipt-cutoff fs-5"></i>
                    مجموع سبد خرید
                  </div>
                  <ul class="list-group mt-0 p-0">
                    <li
                      class="list-group-item d-flex justify-content-between"
                    >
                      <div>مجموع قیمت :</div>
                      <div class="fw-bold">{{ numberFormat(totalAmount) }} تومان</div>
                    </li>
                    <li
                      class="list-group-item d-flex justify-content-between"
                    >
                      <div>
                        تخفیف :
                        <span class="text-danger ms-1"
                          >{{ coupon.percent }}%</span
                        >
                      </div>
                      <div class="text-danger fw-bold">
                        {{
                          numberFormat((totalAmount * coupon.percent) / 100)
                        }}
                        تومان
                      </div>
                    </li>
                    <li
                      class="list-group-item d-flex justify-content-between"
                    >
                      <div class="fw-bold">قیمت پرداختی :</div>
                      <div class="fw-bold text-grad" style="font-size: 1.15rem">
                        {{
                          numberFormat(
                            totalAmount -
                              (totalAmount * coupon.percent) / 100,
                          )
                        }}
                        تومان
                      </div>
                    </li>
                  </ul>
                  <div class="p-4 pt-2">
                    <CartPayment :coupon="coupon" :addressId="addressId" :cart="cartItems"></CartPayment>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div v-else class="cart-empty">
      <div class="text-center">
        <div>
          <span class="cart-empty-icon"><i class="bi bi-basket-fill"></i></span>
        </div>
        <h4 class="fw-bold">سبد خرید شما خالی است</h4>
        <p>هنوز چیزی انتخاب نکرده‌اید؛ از منو دیدن کنید.</p>

        <NuxtLink to="/menu" class="btn-add mt-3">
          <i class="bi bi-menu-button-wide"></i>
          مشاهده محصولات
        </NuxtLink>
      </div>
    </div>

    <template #fallback>
      <div class="cart-loadnig">
        <div class="spinner-border spinner-border-sm ms-2 cart-spiner"></div>
      </div>
    </template>
  </ClientOnly>
</template>

<script setup>
import { useToast } from "vue-toastification";
import { useCartStore } from "~/store/cart";

definePageMeta({
  middleware: "auth",
});

const cart = useCartStore();
const toast = useToast();
const addressId = ref(null)

const countCart = computed(() => cart.count);
const cartItems = computed(() => cart.allItems);
const totalAmount = computed(() => cart.totalAmount);

const coupon = reactive({
  code: "",
  percent: 0,
});

function removeFromCart(id) {
  cart.remove(id);
  toast.warning("محصول مورد نظر از سبد خرید پاک شد");
}
</script>
