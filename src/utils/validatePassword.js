export function validatePassword(password) {
  if (password.length < 8) {
    return { valid: false, msg: "8자 이상 입력해주세요." };
  }
  if (!/[!@#$%^&*]/.test(password)) {
    return { valid: false, msg: "특수문자를 1자 이상 입력해주세요." };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, msg: "대문자를 1자 이상 입력해주세요." };
  }
  return { valid: true, msg: "사용가능한 비밀번호입니다." };
}