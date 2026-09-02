export default defineEventHandler(async (event) => {
  const {
    public: { apiBase },
  } = useRuntimeConfig();
  const token = getCookie(event, "token");
  const query = getQuery(event)

  try {
    const data = await $fetch(`${apiBase}/profile/orders`, {
      query : query,
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
