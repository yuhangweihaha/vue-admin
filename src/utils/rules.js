// 数字型
export function rule1(rule, value, callback) {
    const reg = /[\D]/g;
    if (reg.test(value)) {
        return callback(new Error('仅支持数字'))
    }else {
        callback()
    }
}

// 数字型，特殊符号：_
export function rule2(rule, value, callback) {
    const reg = /[^\d_]/g;
    if (reg.test(value)) {
        return callback(new Error('仅支持数字和特殊符号：_'))
    } else {
        callback()
    }
}

// 数值型，特殊符号：-
export function rule2_1(rule, value, callback) {
    const reg = /[^\d-]/g;
    if (reg.test(value)) {
        return callback(new Error('仅支持数字和特殊符号：-'))
    } else {
        callback()
    }
}

// 数字型，特殊符号：.
export function rule3(rule, value, callback) {
    const reg = /[^\d\.]/g;
    if (reg.test(value)) {
        return callback(new Error('仅支持数字和特殊符号：.'))
    } else {
        callback()
    }
}

// 数字型，特殊符号：1、- 2、_
export function rule4(rule, value, callback) {
    const reg = /[^\d-_]/g;
    if (reg.test(value)) {
        return callback(new Error('仅支持数字和特殊符号：1、_ 2、-'))
    } else {
        callback()
    }
}

// 中英文，区分大小写，数字型，特殊符号：1、_2、-
export function rule5(rule, value, callback) {
    const reg = /[^\u4e00-\u9fa5a-zA-Z\d-_]/g;
    if (reg.test(value)) {
        return callback(new Error('仅支持中英文,数字和特殊符号：1、_2、-'))
    } else {
        callback()
    }
}

// 中英文，区分大小写，数字型，特殊符号：1、_2、- 3、/
export function rule5_1(rule, value, callback) {
    const reg = /[^\u4e00-\u9fa5a-zA-Z\d-_/]/g;
    if (reg.test(value)) {
        return callback(new Error('仅支持中英文,数字和特殊符号：1、_2、-3、/'))
    } else {
        callback()
    }
}

// 中英文，区分大小写，数字型，特殊符号：1、/ 2、-
export function rule6(rule, value, callback) {
    const reg = /[^\u4e00-\u9fa5a-zA-Z\d-\/]/g;
    if (reg.test(value)) {
        return callback(new Error('仅支持中英文,数字和特殊符号：1、/2、-'))
    } else {
        callback()
    }
}

// 中英文，区分大小写，数字型，特殊符号：1、：2、//3、/4、？5、&6、-7、_8、%9、+10、空格11、#12、.
export function rule7(rule, value, callback) {
    const reg = /[^\u4e00-\u9fa5a-zA-Z\d\:\-_%+#\.\/? \&]/g;
    if (reg.test(value)) {
        return callback(new Error('仅支持中英文,数字和特殊符号：1、. 2、：3、/ 4、? 5、& 6、- 7、_ 8、% 9、+ 10、空格 11、#'))
    } else {
        callback()
    }
}

// 英文，区分大小写，数字型，特殊符号：1、-
export function rule8(rule, value, callback) {
    const reg = /[^a-zA-Z\d-]/g;
    if (reg.test(value)) {
        return callback(new Error('仅支持英文,数字和特殊符号：-'))
    } else {
        callback()
    }
}

// 英文，区分大小写，数字型，特殊符号：_
export function rule9(rule, value, callback) {
    const reg = /[^a-zA-Z\d_]/g;
    if (reg.test(value)) {
        return callback(new Error('仅支持英文,数字和特殊符号：_'))
    } else {
        callback()
    }
}

// 英文，区分大小写，数字型，特殊符号：_ -
export function rule10(rule, value, callback) {
    const reg = /[^a-zA-Z\d_-]/g;
    if (reg.test(value)) {
        return callback(new Error('仅支持英文,数字和特殊符号：1、_2、-'))
    } else {
        callback()
    }
}

//英文，区分大小写，数值型
export function rule11(rule, value, callback) {
    const reg = /[^a-zA-Z\d]/g;
    if (reg.test(value)) {
        return callback(new Error('仅支持英文,数字'))
    } else {
        callback()
    }
}

// 英文，区分大小写，数值型，特殊符号：1、- 2、/
export function rule12(rule, value, callback) {
    const reg = /[^a-zA-Z\d-\/]/g;
    if (reg.test(value)) {
        return callback(new Error('仅支持英文,数字和特殊符号：1、-2、/'))
    } else {
        callback()
    }
}

// 手机号
 export function phoneNumber(rule, value, callback) {
    const reg = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/g;
    if (!reg.test(value)) {
        return callback(new Error('请检查手机号是否正确'))
    } else {
        callback()
    }
}

export function rule30(rule, value, callback) {
  const reg = /[^\d\.-]/g;
  if (reg.test(value)) {
    return callback(new Error('仅支持数字和特殊符号：. -'))
  } else {
    callback()
  }
}

