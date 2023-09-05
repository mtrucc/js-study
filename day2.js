Array.from({ length: 100 }, function (_, i) {
  const fizz = (++i % 3) + "Fizz";
  const buzz = (i % 5) + "Buzz";
  return fizz || buzz ? fizz + buzz : i;
});

// 函数防抖的实现
function debounce(fn, wait) {
  let timer = null;

  return function () {
    let context = this,
      args = arguments;

    // 如果此时存在定时器的话，则取消之前的定时器重新记时
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    // 设置定时器，使事件间隔指定事件后执行
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}

let test = (a) => console.log(a);

let newTest = debounce(test, 1000);

newTest(1);
newTest(2);
newTest(3);

// 函数节流的实现;
function throttle(fn, delay) {
  let curTime = Date.now();

  return function () {
    let context = this,
      args = arguments,
      nowTime = Date.now();

    // 如果两次时间间隔超过了指定时间，则执行函数。
    if (nowTime - curTime >= delay) {
      curTime = Date.now();
      return fn.apply(context, args);
    }
  };
}

function debounce(fn, time) {
  let timer;

  return function () {
    let that = this;
    let args = arguments;

    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    timer = setTimeout(() => {
      fn.apply(that, args);
    }, time);
  };
}

function throttle(fn, time) {
  let currentTime = Date.now();

  return function () {
    let that = this;
    let arg = arguments;
    let newTime = Date.now();

    if (newTime - currentTime >= time) {
      return fn.apply(that, arg);
    }
  };
}

let test2 = (a) => console.log(a);

let testFun = throttle(test2, 111);

testFun(1);
testFun(2);
testFun(3);

// 下面的这个代码，刷新了我的认知
// 函数防抖的实现
function debounce(fn, wait) {
  let timer = null;

  return () => {
    let context = this,
      args = arguments;

    // 如果此时存在定时器的话，则取消之前的定时器重新记时
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    // 设置定时器，使事件间隔指定事件后执行
    timer = setTimeout(() => {
      return fn.apply(context, args);
    }, wait);
  };
}

// let test = (a) => console.log("test", a);

// let newTest = debounce(test, 1000);

newTest(1);
newTest(2);
newTest(3);

// 简单的深拷贝
function deepClone() {
  let arg = arguments;
  return JSON.parse(JSON.stringify(arg));
}

// Object.assign({}, testObj)
function deepClone2(obj) {
  return Object.assign({}, obj);
}

let testObj = {
  a: 1,
  b: 2,
  c: function () {
    console.log("c");
  },
  d: function () {
    return this;
  },
  e: {
    e: 1,
    f: {
      f() {
        console.log(this);
        return this;
      },
      g: () => {
        console.log(this);
        return this;
      },
    },
  },
  [Symbol("h")]: 1,
  [Symbol("h")]: 2,
};

testObj.pro = testObj;

// 测试的obj对象
const obj = {
  // =========== 1.基础数据类型 ===========
  num: 0, // number
  str: "", // string
  bool: true, // boolean
  unf: undefined, // undefined
  nul: null, // null
  sym: Symbol("sym"), // symbol
  bign: BigInt(1n), // bigint

  // =========== 2.Object类型 ===========
  // 普通对象
  obj: {
    name: "我是一个对象",
    id: 1,
  },
  // 数组
  arr: [0, 1, 2],
  // 函数
  func: function () {
    console.log("我是一个函数");
  },
  // 日期
  date: new Date(0),
  // 正则
  reg: new RegExp("/我是一个正则/ig"),
  // Map
  map: new Map().set("mapKey", 1),
  // Set
  set: new Set().add("set"),
  // =========== 3.其他 ===========
  [Symbol("1")]: 1, // Symbol作为key
};

// 4.添加不可枚举属性
Object.defineProperty(obj, "innumerable", {
  enumerable: false,
  value: "不可枚举属性",
});

// 5.设置原型对象
Object.setPrototypeOf(obj, {
  proto: "proto",
});

// 6.设置loop成循环引用的属性
obj.loop = obj;

// 简单的深拷贝
function deepClone(target) {
  if (typeof target === "object" && target) {
    let cloneObj = {};
    for (const key in target) {
      // 遍历
      const val = target[key];
      if (typeof val === "object" && val) {
        cloneObj[key] = deepClone(val); // 是对象就再次调用该函数递归
      } else {
        cloneObj[key] = val; // 基本类型的话直接复制值
      }
    }
    return cloneObj;
  } else {
    return target;
  }
}

// // 开头的测试obj存在循环引用，除去这个条件进行测试
// const clonedObj = deepClone(obj);

// // 测试
// clonedObj === obj; // false，返回的是一个新对象
// clonedObj.arr === obj.arr; // false，说明拷贝的不是引用

function deepCloneStudy(obj) {
  if (typeof obj == "object" && obj) {
    let cloneObj = {};
    for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        const element = object[key];
        if (typeof obj == "object" && obj) {
          cloneObj[key] = deepCloneStudy(element);
        } else {
          cloneObj[key] = element;
        }
      }
    }
  } else {
    return obj;
  }
}

function deepClone(target) {
  // WeakMap作为记录对象Hash表（用于防止循环引用）
  const map = new WeakMap();

  // 判断是否为object类型的辅助函数，减少重复代码
  function isObject(target) {
    return (
      (typeof target === "object" && target) || typeof target === "function"
    );
  }

  function clone(data) {
    // 基础类型直接返回值
    if (!isObject(data)) {
      return data;
    }

    // 日期或者正则对象则直接构造一个新的对象返回
    if ([Date, RegExp].includes(data.constructor)) {
      return new data.constructor(data);
    }

    // 处理函数对象
    if (typeof data === "function") {
      return new Function("return " + data.toString())();
    }

    // 如果该对象已存在，则直接返回该对象
    const exist = map.get(data);
    if (exist) {
      return exist;
    }

    // 处理Map对象
    if (data instanceof Map) {
      const result = new Map();
      map.set(data, result);
      data.forEach((val, key) => {
        // 注意：map中的值为object的话也得深拷贝
        if (isObject(val)) {
          result.set(key, clone(val));
        } else {
          result.set(key, val);
        }
      });
      return result;
    }

    // 处理Set对象
    if (data instanceof Set) {
      const result = new Set();
      map.set(data, result);
      data.forEach((val) => {
        // 注意：set中的值为object的话也得深拷贝
        if (isObject(val)) {
          result.add(clone(val));
        } else {
          result.add(val);
        }
      });
      return result;
    }

    // 收集键名（考虑了以Symbol作为key以及不可枚举的属性）
    const keys = Reflect.ownKeys(data);
    // 利用 Object 的 getOwnPropertyDescriptors 方法可以获得对象的所有属性以及对应的属性描述
    const allDesc = Object.getOwnPropertyDescriptors(data);
    // 结合 Object 的 create 方法创建一个新对象，并继承传入原对象的原型链， 这里得到的result是对data的浅拷贝
    const result = Object.create(Object.getPrototypeOf(data), allDesc);

    // 新对象加入到map中，进行记录
    map.set(data, result);

    // Object.create()是浅拷贝，所以要判断并递归执行深拷贝
    keys.forEach((key) => {
      const val = data[key];
      if (isObject(val)) {
        // 属性值为 对象类型 或 函数对象 的话也需要进行深拷贝
        result[key] = clone(val);
      } else {
        result[key] = val;
      }
    });
    return result;
  }

  return clone(target);
}

// 测试
const clonedObj = deepClone(obj);
clonedObj === obj; // false，返回的是一个新对象
clonedObj.arr === obj.arr; // false，说明拷贝的不是引用
clonedObj.func === obj.func; // false，说明function也复制了一份
clonedObj.proto; // proto，可以取到原型的属性


let arrTest = [
  {
    a: {
      b: 123
    }
  }
]

function myInstanceof(obj, constructor) {
  // obj的隐式原型
  let implicitPrototype = obj?.__proto__;
  // 构造函数的原型
  const displayPrototype = constructor.prototype;
  // 遍历原型链
  while (implicitPrototype) {
      // 找到，返回true
      if (implicitPrototype === displayPrototype) return true;
      implicitPrototype = implicitPrototype.__proto__;
  }
  // 遍历结束还没找到，返回false
  return false;
}


function myInstanceOf (obj, constructor) {
  let getPrototype = obj?.__proto__
  const right = constructor.prototype

  while(getPrototype) {
    if(getPrototype === right) {
      return true
    }
    getPrototype = getPrototype.__proto__
  }
}

function stusyNew() {
  let obj = {}
  let constructor = [].shift.call(arguments)
  obj.__proto__ = constructor.prototype
  let result = constructor.apply(obj, arguments)
  return typeof result === 'object' ? result : obj
}

/**
 * 自定义call实现
 * @param context   上下文this对象
 * @param args      动态参数
 */
Function.prototype.ownCall = function(context, ...args) {
  context = (typeof context === 'object' ? context : window)
  // 防止覆盖掉原有属性
  const key = Symbol()
  // 这里的this为需要执行的方法
  context[key] = this
  // 方法执行
  const result = context[key](...args)
  delete context[key]
  return result
}

Function.prototype.studyCall = function(context, ...args) {
  context = (typeof context === 'object' ? context : window)
  const key = Symbol()

  context[key] = this

  const result = context[key](...args)
  delete context[key]
  return result
}

Function.prototype.studyApply = function(context, ...args) {
  context = (typeof context === 'object' ? context : window)
  const key = Symbol()

  context[key] = this

  const result = context[key](...args)
  delete context[key]
  return result
}

/**
 * 自定义bind实现
 * @param context     上下文
 * @returns {Function}
 */
Function.prototype.ownBind = function(context) {
  context = (typeof context === 'object' ? context : window)
  return (...args)=>{
    this.call(context, ...args)
  }
}

// 作者：knag
// 链接：https://juejin.cn/post/6844904008386084878
// 来源：稀土掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

Function.prototype.myBind = function (context) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  var _this = this;
  var args = [...arguments].slice(1);
  // 返回一个函数
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments);
    }
    return _this.apply(context, args.concat(...arguments));
  };
};

Function.prototype.studyBind = function (context) {
  if (typeof this !== "function") {
    console.error("Error")
  }
  let that = this
  let args = [...arguments].slice(1);
  return function F() {
    if (this instanceof F) {
      return new that(...args, ...arguments);
    }
    return that.apply(context, args.concat(...arguments))
  }
}