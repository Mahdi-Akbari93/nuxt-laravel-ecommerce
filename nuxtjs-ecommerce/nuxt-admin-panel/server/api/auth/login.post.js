export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const {
    public: { apiBase },
  } = useRuntimeConfig();

  try {
    const data = await $fetch(`${apiBase}/auth/login`, {
      method: "POST",
      body: body,
      headers: {
        Accept: "application/json",
      },
    });

    setCookie(event, "token", data.data.token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return data.data.user;
  } catch (error) {
    throw createError({
      statusCode: error?.response?.status ?? 502,
      statusMessage: "Upstream Error",
      data: error?.data ?? null,
    });
  }
});
