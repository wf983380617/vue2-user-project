/**
 * @param {string} value
 * @returns {Boolean}
 * 字母或数字
 */
export function validateLettersOrNum(rule, value, callback) {
  const reg = /^[0-9A-Za-z]+$/;
  if (value === "" || value === undefined || value == null) {
    callback();
  } else {
    if (!reg.test(value) && value !== "") {
      callback(new Error("请输入字母或数字"));
    } else {
      callback();
    }
  }
}

/**
 * @param {string} value
 * @returns {Boolean}
 * 正整数
 */
export function validateInteger(rule, value, callback) {
  const reg = /^\+?[1-9]\d*$/;
  if (value === "" || value === undefined || value == null) {
    callback();
  } else {
    if (!reg.test(value) && value !== "") {
      callback(new Error("请输入正整数"));
    } else {
      callback();
    }
  }
}
/**
 * @param {string} value
 * @returns {Boolean}
 * 校验邮箱
 */
export function validateEMail(rule, value, callback) {
  const reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!value) {
    callback(new Error("邮箱不能为空"));
  } else {
    if (!reg.test(value)) {
      callback(new Error("请输入正确的邮箱"));
    } else {
      callback();
    }
  }
}

/**
 * @param {string} value
 * @returns {Boolean}
 * 手机号
 */
export function validatePhone(rule, value, callback) {
  const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
  if (!reg.test(value) && value) {
    callback(new Error("请输入正确的手机号"));
  } else {
    callback();
  }
}
/**
 * @param {string} value
 * @returns {Boolean}
 * 身份证
 */
export function validateIdNo(rule, value, callback) {
  const reg =
    /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/;
  if (value === "" || value === undefined || value == null) {
    callback();
  } else {
    if (!reg.test(value) && value !== "") {
      callback(new Error("请输入正确的身份证号码"));
    } else {
      callback();
    }
  }
}

/**
 * @param {string} value
 * @returns {Boolean}
 * 数字
 */
export function validatenum(rule, value, callback) {
  const reg = /^-?\d*\.?\d+$/;
  if (value === "" || value === undefined || value == null) {
    callback();
  } else {
    if (!reg.test(value) && value !== "") {
      callback(new Error("请输入数字"));
    } else {
      callback();
    }
  }
}
