import { readFiles } from "h3-formidable";
// 1. ❌ خط import FormData from "form-data" را کاملاً پاک کن.
// نیازی به پکیج فرم‌دیتا نیست، از نسخه نیتیو استفاده می‌کنیم.
import fs from "fs";

export default defineEventHandler(async (event) => {
  const {
    public: { apiBase },
  } = useRuntimeConfig();
  const token = getCookie(event, "token");

  const { fields, files } = await readFiles(event, {
    includeFields: true,
  });

  // 2. این همان FormData پیش‌فرض و نیتیو جاوااسکریپت خواهد بود
  let formData = new FormData();

  try {
    // 3. تبدیل فایل‌ها به Blob تا لاراول پسوند و نوع فایل را تشخیص دهد
    for (let index = 0; index < files.images.length; index++) {
      const fileBuffer = fs.readFileSync(files.images[index].filepath);
      const blob = new Blob([fileBuffer], {
        type: files.images[index].mimetype,
      });

      formData.append("images[]", blob, files.images[index].originalFilename);
    }

    const primaryBuffer = fs.readFileSync(files.primary_image[0].filepath);
    const primaryBlob = new Blob([primaryBuffer], {
      type: files.primary_image[0].mimetype,
    });

    formData.append(
      "primary_image",
      primaryBlob,
      files.primary_image[0].originalFilename,
    );

    formData.append("name", fields.name[0]);
    formData.append("category_id", fields.category_id[0]);
    formData.append("status", fields.status[0]);
    formData.append("price", fields.price[0]);
    formData.append("quantity", fields.quantity[0]);
    formData.append("sale_price", fields.sale_price[0]);
    formData.append("date_on_sale_from", fields.date_on_sale_from[0]);
    formData.append("date_on_sale_to", fields.date_on_sale_to[0]);
    formData.append("description", fields.description[0]);

    const data = await $fetch(`${apiBase}/products`, {
      method: "POST",
      body: formData, // 4. وقتی فرم‌دیتای نیتیو پاس داده شود، $fetch خودش هدر Content-Type و Boundary را ست می‌کند.
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        // ❌ به هیچ عنوان هیچ هدر Content-Type یا فرم‌دیتایی اینجا دستی ننویس.
      },
    });

    return data.data;
  } catch (error) {
    throw createError({
      statusCode: error?.response?.status ?? 502,
      statusMessage: "Upstream Error",
      data: error?.data ?? null,
    });
  } finally {
    console.log(formData);
  }
});
