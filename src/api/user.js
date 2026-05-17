// import request from '@/utiles/request'

// export function login(data) {
//   return request({
//     url: '/user/login',
//     method: 'post',
//     data
//   })
// }

// export function register(data) {
//   return request({
//     url: '/user/register',
//     method: 'post',
//     data
//   })
// }

// ========== Mock 登录（现在用,假登录）==========
import { findUser, addUser } from "@/mock/users";

export async function login(form) {
  await new Promise((r) => setTimeout(r, 500));

  const res = await loginAPI(data);

  // 看后端/ mock 返回的是 code，不是直接返回 user！
  if (res.code !== 0) {
    throw new Error(res.message || "邮箱或密码错误");
  }

  // 真正的用户信息在 res.data 里
  const user = res.data;

  return {
    data: {
      token: "fake-token-" + Date.now(),
      user: { name: user.name, email: user.email },
    },
  };
}

export async function register(form) {
  await new Promise((r) => setTimeout(r, 500));

  const result = addUser({
    name: form.name,
    email: form.email,
    password: form.password,
  });

  if (!result.success) {
    throw new Error(result.message);
  }

  return { data: { success: true } };
}
