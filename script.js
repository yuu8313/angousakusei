const descriptions = {
  "lz-string": "LZ-String - 高速な文字列圧縮ライブラリ。",
  base64: "Base64 - バイナリデータをテキストに変換する方法。",
  uri: "URI - URLエンコード方式で文字列を圧縮。",
  hex: "Hex - 文字列を16進数形式でエンコード。",
  rot13: "ROT13 - シーザー暗号の一種。",
  rle: "RLE (Run Length Encoding) - 繰り返し文字列の圧縮に適した方法。",
  huffman: "Huffman - 可変長の符号を使った効率的な圧縮アルゴリズム。",
  deflate: "Deflate - LZ77アルゴリズムとハフマン符号化を組み合わせた圧縮方法。",
  gzip: "Gzip - Deflateアルゴリズムを使ったファイル圧縮方法。",
  zlib: "Zlib - Deflateアルゴリズムを使用する一般的な圧縮ライブラリ。"
};

function updateCompressionDescription() {
  const compressionMethod = document.getElementById("compressionMethod").value;
  document.getElementById("compressionDescription").innerText =
    descriptions[compressionMethod];
}

function updateDecompressionDescription() {
  const decompressionMethod = document.getElementById("decompressionMethod")
    .value;
  document.getElementById("decompressionDescription").innerText =
    descriptions[decompressionMethod];
}

function reverseString(str) {
  return str.split("").reverse().join("");
}

function base64Encode(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

function base64Decode(str) {
  return decodeURIComponent(escape(atob(str)));
}

function shiftString(str, shift) {
  return str
    .split("")
    .map((char) => String.fromCharCode(char.charCodeAt(0) + shift))
    .join("");
}

function customCharMapping(str) {
  const map = { a: "1", e: "2", i: "3", o: "4", u: "5" };
  return str
    .split("")
    .map((char) => map[char] || char)
    .join("");
}

function undoCustomCharMapping(str) {
  const map = { 1: "a", 2: "e", 3: "i", 4: "o", 5: "u" };
  return str
    .split("")
    .map((char) => map[char] || char)
    .join("");
}

function escapeChars(str) {
  return str.replace(/[aeiou]/g, (char) => "\\" + char);
}

function unescapeChars(str) {
  return str.replace(/\\([aeiou])/g, "$1");
}

function unicodeTransform(str) {
  return str
    .split("")
    .map((char) => "\\u" + ("000" + char.charCodeAt(0).toString(16)).slice(-4))
    .join("");
}

function undoUnicodeTransform(str) {
  return str.replace(/\\u([\dA-Fa-f]{4})/g, (match, p1) =>
    String.fromCharCode(parseInt(p1, 16))
  );
}

function doubleEncode(str) {
  return base64Encode(base64Encode(str));
}

function doubleDecode(str) {
  return base64Decode(base64Decode(str));
}

function xorWithKey(str, key) {
  return str
    .split("")
    .map((char, i) =>
      String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length))
    )
    .join("");
}

// 圧縮と解凍の方法を追加
function compressLZString(str) {
  return LZString.compressToEncodedURIComponent(str);
}

function decompressLZString(str) {
  return LZString.decompressFromEncodedURIComponent(str);
}

function compressBase64(str) {
  return base64Encode(str);
}

function decompressBase64(str) {
  return base64Decode(str);
}

function compressURI(str) {
  return encodeURIComponent(str);
}

function decompressURI(str) {
  return decodeURIComponent(str);
}

// Hex
function compressHex(str) {
  return str
    .split("")
    .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
    .join("");
}

function decompressHex(str) {
  return str
    .match(/.{1,2}/g)
    .map((byte) => String.fromCharCode(parseInt(byte, 16)))
    .join("");
}

// ROT13
function compressROT13(str) {
  return str.replace(/[a-zA-Z]/g, (char) =>
    String.fromCharCode(
      char.charCodeAt(0) + (char.toLowerCase() < "n" ? 13 : -13)
    )
  );
}

function decompressROT13(str) {
  return compressROT13(str); // ROT13は同じ関数で復号化も可能
}

// RLE
function compressRLE(str) {
  return str.replace(/(.)\1*/g, (m, c) => c + m.length);
}

function decompressRLE(str) {
  return str.replace(/(.)(\d+)/g, (m, c, n) => c.repeat(n));
}

// Huffman
// (具体的な実装は省略)
function compressHuffman(str) {
  // Huffman圧縮アルゴリズムの実装
  return str; // 仮の返却値
}

function decompressHuffman(str) {
  // Huffman解凍アルゴリズムの実装
  return str; // 仮の返却値
}

// Deflate
function compressDeflate(str) {
  return pako.deflate(str, { to: "string" });
}

function decompressDeflate(str) {
  return pako.inflate(str, { to: "string" });
}

// Gzip
function compressGzip(str) {
  return pako.gzip(str, { to: "string" });
}

function decompressGzip(str) {
  return pako.ungzip(str, { to: "string" });
}

// Zlib
function compressZlib(str) {
  return pako.deflate(str, { to: "string" });
}

function decompressZlib(str) {
  return pako.inflate(str, { to: "string" });
}

// AES暗号化と復号化
function aesEncrypt(str, key) {
  return CryptoJS.AES.encrypt(str, key).toString();
}

function aesDecrypt(cipherText, key) {
  const bytes = CryptoJS.AES.decrypt(cipherText, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// 追加の変換
function replaceVowelsWithNumbers(str) {
  return str.replace(
    /[aeiou]/g,
    (char) => ({ a: "1", e: "2", i: "3", o: "4", u: "5" }[char])
  );
}

function restoreVowelsFromNumbers(str) {
  return str.replace(
    /[12345]/g,
    (num) => ({ 1: "a", 2: "e", 3: "i", 4: "o", 5: "u" }[num])
  );
}

function toUpperCase(str) {
  return str.toUpperCase();
}

function toLowerCase(str) {
  return str.toLowerCase();
}

function replaceSpacesWithUnderscores(str) {
  return str.replace(/ /g, "_");
}

function restoreSpacesFromUnderscores(str) {
  return str.replace(/_/g, " ");
}

function reverseWords(str) {
  return str.split(" ").reverse().join(" ");
}

function replaceConsonantsWithNumbers(str) {
  return str.replace(/[^aeiou\s]/g, (char) => char.charCodeAt(0) - 96);
}

function restoreConsonantsFromNumbers(str) {
  return str.replace(/\d+/g, (num) => String.fromCharCode(Number(num) + 96));
}

function insertDelimiter(str) {
  return str.split("").join("-");
}

function removeDelimiter(str) {
  return str.split("-").join("");
}

function encrypt() {
  const plainText = document.getElementById("plainText").value;
  const key = document.getElementById("encryptionKey").value;
  const compressionMethod = document.getElementById("compressionMethod").value;

  if (plainText && key) {
    let transformedText = plainText;
    transformedText = reverseString(transformedText);
    transformedText = shiftString(transformedText, 3);
    transformedText = customCharMapping(transformedText);
    transformedText = escapeChars(transformedText);
    transformedText = unicodeTransform(transformedText);
    transformedText = doubleEncode(transformedText);
    transformedText = xorWithKey(transformedText, key);
    transformedText = replaceVowelsWithNumbers(transformedText);
    transformedText = toUpperCase(transformedText);
    transformedText = replaceSpacesWithUnderscores(transformedText);
    transformedText = reverseWords(transformedText);
    transformedText = insertDelimiter(transformedText);
    transformedText = aesEncrypt(transformedText, key);

    let compressedCipherText;
    switch (compressionMethod) {
      case "lz-string":
        compressedCipherText = compressLZString(transformedText);
        break;
      case "base64":
        compressedCipherText = compressBase64(transformedText);
        break;
      case "uri":
        compressedCipherText = compressURI(transformedText);
        break;
      case "hex":
        compressedCipherText = compressHex(transformedText);
        break;
      case "rot13":
        compressedCipherText = compressROT13(transformedText);
        break;
      case "rle":
        compressedCipherText = compressRLE(transformedText);
        break;
      case "deflate":
        compressedCipherText = compressDeflate(transformedText);
        break;
      case "gzip":
        compressedCipherText = compressGzip(transformedText);
        break;
      case "zlib":
        compressedCipherText = compressZlib(transformedText);
        break;
      default:
        compressedCipherText = transformedText;
        break;
    }

    document.getElementById("cipherText").value = compressedCipherText;
  }
}

function decrypt() {
  const cipherText = document.getElementById("cipherTextToDecrypt").value;
  const key = document.getElementById("decryptionKey").value;
  const decompressionMethod = document.getElementById("decompressionMethod")
    .value;

  if (cipherText && key) {
    let decompressedCipherText;
    switch (decompressionMethod) {
      case "lz-string":
        decompressedCipherText = decompressLZString(cipherText);
        break;
      case "base64":
        decompressedCipherText = decompressBase64(cipherText);
        break;
      case "uri":
        decompressedCipherText = decompressURI(cipherText);
        break;
      case "hex":
        decompressedCipherText = decompressHex(cipherText);
        break;
      case "rot13":
        decompressedCipherText = decompressROT13(cipherText);
        break;
      case "rle":
        decompressedCipherText = decompressRLE(cipherText);
        break;
      case "deflate":
        decompressedCipherText = decompressDeflate(cipherText);
        break;
      case "gzip":
        decompressedCipherText = decompressGzip(cipherText);
        break;
      case "zlib":
        decompressedCipherText = decompressZlib(cipherText);
        break;
      default:
        decompressedCipherText = cipherText;
        break;
    }

    let decryptedText = aesDecrypt(decompressedCipherText, key);
    decryptedText = removeDelimiter(decryptedText);
    decryptedText = reverseWords(decryptedText);
    decryptedText = restoreSpacesFromUnderscores(decryptedText);
    decryptedText = toLowerCase(decryptedText);
    decryptedText = restoreVowelsFromNumbers(decryptedText);
    decryptedText = xorWithKey(decryptedText, key);
    decryptedText = doubleDecode(decryptedText);
    decryptedText = undoUnicodeTransform(decryptedText);
    decryptedText = unescapeChars(decryptedText);
    decryptedText = undoCustomCharMapping(decryptedText);
    decryptedText = shiftString(decryptedText, -3);
    decryptedText = reverseString(decryptedText);

    document.getElementById("decryptedText").value = decryptedText;
  }
}

updateCompressionDescription();
updateDecompressionDescription();
