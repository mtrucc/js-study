Array.from({ length: 100 }, function (_, i) {
  const fizz = (++i % 3) + 'Fizz';
  const buzz = (i % 5) + 'Buzz';
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

    if ((newTime - currentTime >= time)) {
      return fn.apply(that, arg);
    }
  };
}

let test2 = (a) => console.log(a)

let testFun = throttle(test2, 111)

testFun(1)
testFun(2)
testFun(3)


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

let test = (a) => console.log("test", a);

let newTest = debounce(test, 1000);

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
    return this
  },
  e: {
    e: 1,
    f: {
      f() {
        console.log(this)
        return this
      },
      g: () => {
        console.log(this)
        return this
      }
    }
  },
  [Symbol('h')]: 1,
  [Symbol('h')]: 2
};

testObj.pro = testObj;