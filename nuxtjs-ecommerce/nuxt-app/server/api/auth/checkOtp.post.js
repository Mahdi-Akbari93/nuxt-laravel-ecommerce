export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const {
    public: { apiBase },
  } = useRuntimeConfig();
  const loginToken = getCookie(event , 'login_token')

  try {
    const data = await $fetch(`${apiBase}/auth/check-otp`, {
      method: "POST",
      body: {...body , login_token: loginToken},
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


    setCookie(event, "login_token", '', {
      httpOnly: true,
      secure: true,
      maxAge: 0,
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
