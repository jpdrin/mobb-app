import { enc } from "crypto-js";
import AES from "crypto-js/aes";
const secretPass = '04c7c190538c56334d03fc298625697e1faf235c6fb68c9c3c606fafc9930cd0';

//Função para criptografar o ID do Anúncio ou qualquer outro
export const encryptId = (str) => {
  const ciphertext = AES.encrypt(str, secretPass);
  return encodeURIComponent(ciphertext.toString());
};

//Função para descriptografar o ID do Anúncio ou qualquer outro
export const decryptId = (str) => {
  const decodedStr = decodeURIComponent(str);
  return AES.decrypt(decodedStr, secretPass).toString(enc.Utf8);
};