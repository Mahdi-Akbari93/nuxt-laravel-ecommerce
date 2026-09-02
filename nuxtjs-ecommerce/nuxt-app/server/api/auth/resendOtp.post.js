export default defineEventHandler(async (event) => {
  const {
    public: { apiBase },
  } = useRuntimeConfig();

  const loginToken = getCookie(event, "login_token");

  try {
    const data = await $fetch(`${apiBase}/auth/resend-otp`, {
      method: "POST",
      body: {login_token: loginToken},
      headers: {
        Accept: "application/json",
      },
    });

    setCookie(event, "login_token", data.data.login_token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return "Otp Resend";
  } catch (error) {
    throw createError({
      statusCode: error?.response?.status ?? 502,
      statusMessage: "Upstream Error",
      data: error?.data ?? null,
    });
  }
});
