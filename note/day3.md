手写ajax


- 什么是变量提升，有什么好处

```js
var tmp = new Date();

function fn(){
	console.log(tmp);
	if(false){
		var tmp = 'hello world';
	}
}

fn();  // undefined

```

- 什么是函数式编程
- 什么是高阶函数
- 什么是闭包
- 什么是柯里化
- amd umd cmd 都是什么 有什么区别

```js
let test = {
  a: 2,
  child: {
    a: [1, 2, 3],
    b: {
      c: 2
    }
  }
}

// 找出父级的key value

function findFather(data) {
}

findFather(test.child.a[1]) // {a: [1, 2, 3]}
findFather(test.child.b.c) // {b: {c: 2}}

// 找出同级的key value
function findBrother(data) {
}

findBrother(test.child.a[1]) // {a: [1, 2, 3]}
findBrother(test.child.b.c) // {b: {c: 2}}
```

```js
let test = {
  a: 2,
  child: {
    a: [1, 2, 3, findFather], // {a: [1, 2, 3]}
    b: {
      c: 2
      findFather // {b: {c: 2}}
    }
  }
}

// 找出父级的key value
function findFather() {
}

test.child.a[3]() // {a: [1, 2, 3]}
test.child.b.findFather() // {b: {c: 2}}

```


```js
let test = {
  a: 2,
  child: {
    a: [1, 2, 3],
    b: {
      c: 2
    }
  }
}

// 找出父级的key value

function findFather(data, value) {
}

findFather(test, test.child.a[1]) // {a: [1, 2, 3]}
findFather(test, test.child.b.c) // {b: {c: 2}}

// 找出同级的key value
function findBrother(data, value) {
}

findBrother(test, test.child.a[1]) // {a: [1, 2, 3]}
findBrother(test, test.child.b.c) // {b: {c: 2}}
```

- 21. use strict是什么意思 ? 使用它区别是什么？
- parent


```js

// 正常的原始数据
let test = {
  a: 2,
  child: {
    a: [1, 2, 3],
    b: {
      c: 2
    }
  }
}

// 被我改成这样找爹找爷爷的
let test = {
  id: 0,
  a: 2,
  child: {
    id: 1,
    parentId: 0,
    a: [1, 2, 3, {
      parentId: 1,
    }],
    b: {
      c: 2
      parentId: 1,
    }
  }
}
```


- 27. ajax、axios、fetch的区别
- 真的理解promise吗
- 