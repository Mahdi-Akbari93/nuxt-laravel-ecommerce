<template>
  <!-- hero slider section -->
  <section class="hero_section">
    <div class="hero-bg">
      <img src="/images/hero-bg.jpg" alt="" />
    </div>
    <span class="hero-blob b1"></span>
    <span class="hero-blob b2"></span>

    <div id="customCarousel1" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="container">
            <div class="row">
              <div class="col-md-10 col-lg-8">
                <div class="hero-content">
                  <span class="hero-badge">
                    <i class="bi bi-stars"></i>
                    پیشنهاد ویژه امروز
                  </span>
                  <h1 class="hero-title">
                    غذای گرم و خوش‌طعم،
                    <span class="text-grad">با تجربه‌ای متفاوت</span>
                  </h1>
                  <p class="hero-text">
                    با انتخاب محصولات تازه و اصل، در کمترین زمان ممکن سفارش خود را
                    درب منزل یا محل کارتان تحویل بگیرید. کیفیت بالا، قیمت مناسب و
                    ارسال سریع، تجربه‌ای که شما را به خرید دوباره دعوت می‌کند.
                  </p>
                  <div class="hero-cta">
                    <NuxtLink to="/menu" class="btn-hero">
                      <i class="bi bi-bag-heart-fill"></i>
                      سفارش غذا
                    </NuxtLink>
                    <NuxtLink to="/about-us" class="btn-hero-ghost">
                      بیشتر درباره ما
                      <i class="bi bi-arrow-left"></i>
                    </NuxtLink>
                  </div>
                  <div class="hero-stats">
                    <div class="stat-item">
                      <div class="stat-num">+۲۵۰</div>
                      <div class="stat-label">محصول متنوع</div>
                    </div>
                    <div class="stat-item">
                      <div class="stat-num">+۱۲هزار</div>
                      <div class="stat-label">سفارش موفق</div>
                    </div>
                    <div class="stat-item">
                      <div class="stat-num">۳۰ دقیقه</div>
                      <div class="stat-label">میانگین ارسال</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="container">
            <div class="row">
              <div class="col-md-10 col-lg-8">
                <div class="hero-content">
                  <span class="hero-badge">
                    <i class="bi bi-lightning-charge-fill"></i>
                    ارسال سریع
                  </span>
                  <h1 class="hero-title">
                    بهترین تجربه‌ی سفارش
                    <span class="text-grad">با تحویل سریع</span>
                  </h1>
                  <p class="hero-text">
                    تیم ما با استفاده از سیستم ارسال حرفه‌ای، سفارش‌های شما را در
                    کوتاه‌ترین زمان ممکن به مقصد می‌رساند تا در هر زمان از شبانه‌روز
                    با آرامش سفارش خود را دریافت کنید.
                  </p>
                  <div class="hero-cta">
                    <NuxtLink to="/contact-us" class="btn-hero">
                      <i class="bi bi-chat-dots-fill"></i>
                      تماس با ما
                    </NuxtLink>
                    <NuxtLink to="/menu" class="btn-hero-ghost">
                      مشاهده منو
                      <i class="bi bi-arrow-left"></i>
                    </NuxtLink>
                  </div>
                  <div class="hero-stats">
                    <div class="stat-item">
                      <div class="stat-num">۲۴/۷</div>
                      <div class="stat-label">پشتیبانی آنلاین</div>
                    </div>
                    <div class="stat-item">
                      <div class="stat-num">+۹۸٪</div>
                      <div class="stat-label">رضایت مشتریان</div>
                    </div>
                    <div class="stat-item">
                      <div class="stat-num">رایگان</div>
                      <div class="stat-label">ارسال سفارش‌های ویژه</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="container">
            <div class="row">
              <div class="col-md-10 col-lg-8">
                <div class="hero-content">
                  <span class="hero-badge">
                    <i class="bi bi-emoji-heart-eyes-fill"></i>
                    طعم بی‌نظیر
                  </span>
                  <h1 class="hero-title">
                    مجموعه‌ای از غذاهای
                    <span class="text-grad">محبوب و خانگی</span>
                  </h1>
                  <p class="hero-text">
                    از پیتزا و ساندویچ گرفته تا دسرها و نوشیدنی‌های تازه، همه‌چیز با
                    ذائقه‌ی شما طراحی شده تا یک تجربه‌ی سفارش دلنشین و خوش‌مزه داشته
                    باشید.
                  </p>
                  <div class="hero-cta">
                    <NuxtLink to="/menu" class="btn-hero">
                      <i class="bi bi-menu-button-wide-fill"></i>
                      مشاهده منو
                    </NuxtLink>
                    <NuxtLink to="/contact-us" class="btn-hero-ghost">
                      تماس با ما
                      <i class="bi bi-arrow-left"></i>
                    </NuxtLink>
                  </div>
                  <div class="hero-stats">
                    <div class="stat-item">
                      <div class="stat-num">تازه</div>
                      <div class="stat-label">مواد اولیه روزانه</div>
                    </div>
                    <div class="stat-item">
                      <div class="stat-num">اصیل</div>
                      <div class="stat-label">دستور پخت خانگی</div>
                    </div>
                    <div class="stat-item">
                      <div class="stat-num">گرم</div>
                      <div class="stat-label">تحویل در لحظه</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <ol class="carousel-indicators">
          <li
            data-bs-target="#customCarousel1"
            data-bs-slide-to="0"
            class="active"
          ></li>
          <li data-bs-target="#customCarousel1" data-bs-slide-to="1"></li>
          <li data-bs-target="#customCarousel1" data-bs-slide-to="2"></li>
        </ol>
      </div>
    </div>
  </section>
  <!-- end hero slider section -->
</template>
