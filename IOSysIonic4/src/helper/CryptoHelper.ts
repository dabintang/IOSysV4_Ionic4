import * as crypto from 'crypto-js';

//加解密帮助类
export class CryptoHelper {
  //IV
  private static _AES_IV: string = 'tangdabinjiushiw';
  //KEY
  private static _AES_KEY:string = 'wodemingzijiaozuotangdabintangdb';

  /**************************************************************
   * 字符串加密
   *   str：需要加密的字符串
   ****************************************************************/
  static encryptAES(str: string): string {
    let key = crypto.enc.Utf8.parse(this._AES_KEY);
    let iv = crypto.enc.Utf8.parse(this._AES_IV);

    let srcs = crypto.enc.Utf8.parse(str);
    let encrypted = crypto.AES.encrypt(srcs, key, {
      iv: iv,
      mode: crypto.mode.CBC,
      padding: crypto.pad.Pkcs7
    });
    
    return encrypted.ciphertext.toString();
  }

  /**************************************************************
   * 字符串解密
   *    str：需要解密的字符串
   ****************************************************************/
  static decryptAES(str: string): string {
    let key = crypto.enc.Utf8.parse(this._AES_KEY);
    let iv = crypto.enc.Utf8.parse(this._AES_IV);
    let encryptedHexStr = crypto.enc.Hex.parse(str);
    let srcs = crypto.enc.Base64.stringify(encryptedHexStr);
    let decrypt = crypto.AES.decrypt(srcs, key, {
      iv: iv,
      mode: crypto.mode.CBC,
      padding: crypto.pad.Pkcs7
    });
    let decryptedStr = decrypt.toString(crypto.enc.Utf8);
    return decryptedStr.toString();
  }
}