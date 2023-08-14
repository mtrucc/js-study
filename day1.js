// 手写new方法

function myNew() {
  // 第一步新建一个对象
  let obj = new Object();
  // 第二部获取构造函数
  let constructor = [].shift.call(arguments);
  // 第三步将obj的原型指向构造函数的原型
  obj.__proto__ = constructor.prototype;
  // 第四步执行构造函数
  let result = constructor.apply(obj, arguments);
  // 第五步返回结果
  return typeof result === 'object' ? result : obj;
}

function myNewStudy() {
  let obj = {};

}