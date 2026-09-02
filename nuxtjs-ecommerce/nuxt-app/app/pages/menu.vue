<template>
  <section class="food_section menu_section layout_padding">
    <div class="container">
      <div class="heading_container mb-4">
        <span class="section-badge"><i class="bi bi-grid-3x3-gap-fill"></i> فروشگاه</span>
        <h2>منوی <span>محصولات</span></h2>
        <p>بر اساس دسته‌بندی و سلیقه‌ی خود، محصول مورد نظرتان را پیدا کنید.</p>
      </div>

      <div class="row">
        <div class="col-sm-12 col-lg-3 mb-4 mb-lg-0">
          <div class="filter-card">
          <div>
            <label class="form-label">جستجو</label>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="نام محصول ..."
                aria-label="جستجوی محصول"
                aria-describedby="basic-addon2"
                v-model="search"
                @input="checkSearchBox"
              />
              <button
                @click="search !== '' && handleFilter({ search: search })"
                class="input-group-text"
                id="basic-addon2"
                aria-label="جستجو"
              >
                <i class="bi bi-search"></i>
              </button>
            </div>
          </div>
          <hr />
          <div class="filter-list">
            <div class="form-label">دسته بندی</div>
            <ul>
              <li
                v-for="category in categories.data"
                :key="category.id"
                class="my-2 cursor-pointer"
                :class="{
                  'filter-list-active':
                    route.query.hasOwnProperty('category') &&
                    route.query.category == category.id,
                }"
                @click="handleFilter({ category: category.id })"
              >
                <i class="bi bi-tag ms-1"></i>
                {{ category.name }}
              </li>
            </ul>
          </div>
          <hr />
          <div>
            <label class="form-label">مرتب سازی</label>
            <div class="form-check my-2">
              <input
                class="form-check-input"
                type="radio"
                :checked="
                  route.query.hasOwnProperty('sortBy') &&
                  route.query.sortBy == 'max'
                "
                name="flexRadioDefault"
                id="flexRadioDefault1"
                @click="handleFilter({ sortBy: 'max' })"
              />
              <label
                class="form-check-label cursor-pointer"
                for="flexRadioDefault1"
              >
                بیشترین قیمت
              </label>
            </div>
            <div class="form-check my-2">
              <input
                class="form-check-input"
                type="radio"
                :checked="
                  route.query.hasOwnProperty('sortBy') &&
                  route.query.sortBy == 'min'
                "
                name="flexRadioDefault"
                id="flexRadioDefault2"
                @click="handleFilter({ sortBy: 'min' })"
              />
              <label
                class="form-check-label cursor-pointer"
                for="flexRadioDefault2"
              >
                کمترین قیمت
              </label>
            </div>
            <div class="form-check my-2">
              <input
                class="form-check-input"
                type="radio"
                :checked="
                  route.query.hasOwnProperty('sortBy') &&
                  route.query.sortBy == 'bestseller'
                "
                name="flexRadioDefault"
                id="flexRadioDefault3"
                @click="handleFilter({ sortBy: 'bestseller' })"
              />
              <label
                class="form-check-label cursor-pointer"
                for="flexRadioDefault3"
              >
                پرفروش ترین
              </label>
            </div>
            <div class="form-check my-2">
              <input
                class="form-check-input"
                type="radio"
                :checked="
                  route.query.hasOwnProperty('sortBy') &&
                  route.query.sortBy == 'sale'
                "
                name="flexRadioDefault"
                id="flexRadioDefault4"
                @click="handleFilter({ sortBy: 'sale' })"
              />
              <label
                class="form-check-label cursor-pointer"
                for="flexRadioDefault4"
              >
                با تخفیف
              </label>
            </div>
          </div>
          </div>
        </div>

        <div class="col-sm-12 col-lg-9">
          <div
            v-if="pending"
            class="d-flex justify-content-center align-items-center"
          >
            <div class="spinner-border" style="color: var(--brand)"></div>
          </div>

          <template v-else>
            <div
              v-if="data.data.products.length == 0"
              class="empty-state"
            >
              <i class="bi bi-search-heart"></i>
              <h5>محصولی یافت نشد!</h5>
              <p>فیلترها را تغییر دهید یا عبارت دیگری را جستجو کنید.</p>
            </div>

            <div v-else>
              <div class="row gx-3">
                <div
                  v-for="product in data.data.products"
                  :key="product.id"
                  class="col-sm-6 col-lg-4"
                >
                  <ProductCard :product="product"></ProductCard>
                </div>
              </div>

              <nav class="d-flex justify-content-center mt-5">
                <ul class="pagination">
                  <li
                    v-for="(link, index) in data.data.meta.links.slice(1, -1)"
                    :key="index"
                    class="page-item"
                    :class="{ active: link.active }"
                  >
                    <button
                      @click="handleFilter({ page: link.label })"
                      class="page-link"
                    >
                      {{ link.label }}
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const router = useRouter();
const route = useRoute();
const search = ref("");
const query = ref({});
const {
  public: { apiBase },
} = useRuntimeConfig();

const { data: categories } = await useFetch(`${apiBase}/categories`);

query.value = route.query;
const { data, refresh, pending } = await useFetch(() => `${apiBase}/menu`, {
  query: query,
});

watch(route, () => {
  if (Object.keys(route.query).length == 0) {
    query.value = {};
    refresh();
  }
});

function handleFilter(param) {
  query.value = { ...route.query, ...param };

  if (!param.hasOwnProperty("page")) {
    delete query.value.page;
  }
  router.push({
    path: "/menu",
    query: query.value,
  });
  // refresh();
}

function checkSearchBox(element) {
  if (element.target.value == "") {
    if (query.value.hasOwnProperty("search")) {
      delete query.value.search;

      router.push({
        path: "/menu",
        query: query.value,
      });
    }
  }
}
</script>
