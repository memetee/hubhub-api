import crypto from "crypto";
const md5Password = (password: string) => {
  const md5 = crypto.createHash("md5");
  const result = md5.update(password).digest("hex");
  return result;
};
export default md5Password;
