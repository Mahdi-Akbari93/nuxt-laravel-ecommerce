export default defineEventHandler(async (event) => {
  const {
    public: { apiBase },
  } = useRuntimeConfig();

  const token = getCookie(event, "token");
  const query = getQuery(event);

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  const url = String(query.url ?? "");
  if (!/^\/[A-Za-z0-9/_-]+$/.test(url)) {
    throw createError({ statusCode: 400, statusMessage: "Bad Request" });
  }

  try {
    const data = await $fetch(`${apiBase}${url}`, {
      method: 'DELETE',
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  } catch (error) {
    throw createError({
      statusCode: error?.response?.status ?? 502,
      statusMessage: "Upstream Error",
      data: error?.data ?? null,
    });
  }
});
