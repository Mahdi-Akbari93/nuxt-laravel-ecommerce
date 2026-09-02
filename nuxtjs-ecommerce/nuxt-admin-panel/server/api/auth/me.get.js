export default defineEventHandler(async (event) => {
  const {
    public: { apiBase },
  } = useRuntimeConfig();
  const token = getCookie(event, "token");

  try {
    const data = await $fetch(`${apiBase}/auth/me`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  } catch (error) {
    if (error?.response?.status == 401 || error?.statusCode == 401) {
      setCookie(event, "token", "", {
        httpOnly: true,
        secure: true,
        maxAge: 0,
        path: "/",
      });
    }

    throw createError({
      statusCode: error?.response?.status ?? 502,
      statusMessage: "Upstream Error",
      data: error?.data ?? null,
    });
  }
});
