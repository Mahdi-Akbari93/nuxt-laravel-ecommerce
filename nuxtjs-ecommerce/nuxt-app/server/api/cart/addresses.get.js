export default defineEventHandler(async (event) => {

  const {
    public: { apiBase },
  } = useRuntimeConfig();

  const token = getCookie(event, "token");

  try {
    const data = await $fetch(`${apiBase}/user/addresses`, {
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
