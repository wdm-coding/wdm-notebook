# JS 基础

## 1.变量类型

1. 值类型 (基本类型) 包括：undefined, null, boolean, number, string, symbol (ES6 新增), bigint(ES10新增)
2. 引用类型 包括：Object, Array, Function, Date, RegExp 等

## 2.区别
1. 存储位置不同
值类型直接存储在栈（stack）中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储；
引用类型存储在堆（heap）中的对象，占据空间大、大小不固定。如果栈中保存了引用类型的变量，那么在栈中就保存了第一层指向堆的有效
地址（画外音：理解为指针即可），便于访问、修改堆中存储的对象数据。
2. 栈和堆的区别：
栈由于数据的存取遵循先进后出原则，适合存储运行时的数据和运算的中间结果。而堆用于存放复杂数据结构，适用于需要动态分配内存、且内存使用大小不确定的场景，如动态数组、优先队列等。

<h4>值类型</h4>
<img src="/assets/jsBase/1.png" style="margin-top:15px">
<h4>引用类型</h4>
<img src="/assets/jsBase/2.png" style="margin-top:15px">

::: warning
  1. undefined：这个值表示一个变量已被声明，但尚未被赋值。
  2. null：这个值表示一个空对象指针。它是有意为之的“无”，用来表示一个变量应该指向一个对象，但目前还没有指向任何对象。
  3. Symbol 是 ECMAScript 6 (ES6) 引入的一种新的原始数据类型，表示独一无二的值。每个 Symbol 值都是唯一的，即使它们是由相同参数的 Symbol 函数创建的。Symbol 主要用于创建对象的唯一属性键，以避免属性名冲突。
:::

## 3.typeof 运算符
<img src="/assets/jsBase/3.png" style="margin-top:15px">
<img src="/assets/jsBase/4.png">

## 4.JS深拷贝
  1. 浅拷贝：只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存。
  2. 深拷贝：会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象。

::: warning
+ JSON.parse(JSON.stringify()) 
  只能用于可序列化的对象（即不包含函数、undefined、Symbol 等无法被 JSON.stringify 处理的值的对象）。
+ Object.assign()
  可以实现浅拷贝，但对于对象嵌套的对象，只能实现第一层对象的深拷贝。
+ 扩展运算符(...)
  可以实现浅拷贝，但对于对象嵌套的对象，只能实现第一层对象的深拷贝。
+ 手动实现
  通过递归的方式，可以实现深拷贝。这种方法可以复制对象中的所有层级和属性，包括嵌套的对象和数组等复杂数据结构。
:::

```js
    const initObj = {
    name:'xxx',
    age: 18,
    feature: { 
      height: 180,  
      weight: 60,
      hobbies: ['football', 'basketball']
    },
    like: ['football', 'basketball', { name: 'xxx'}],
    fun: function() { console.log('function'); }
  }
  function deepClone(obj) { 
    // null 或者 非对象 直接返回 
    if (obj === null || typeof obj !== 'object') return obj; 
    // 数组 或者 对象 直接递归复制
    let result = Array.isArray(obj) ? [] : {}; 
    for (let key in obj) { 
      if (obj.hasOwnProperty(key)) {  // 判断是不是自身的属性，防止原型链上的属性被复制过来
        if (typeof obj[key] === 'object') { // 判断值是不是对象或者数组 
          result[key] = deepClone(obj[key]); // 对象或者数组赋值进行递归调用
        } else { 
          result[key] = obj[key];  // 非对象 直接赋值
        }
      } 
    } 
    return result; 
  }

  const newObj = deepClone(initObj);

  newObj.name = 'yyy';
  newObj.feature.height = 190;
  console.log('oldObj', initObj);
  console.log('newObj', newObj);
```
## 5.变量计算-类型转换

1. 字符串拼接：当使用加号（+）运算符连接不同类型的值时，JavaScript 会尝试将它们转换为字符串。
2. 数字运算：当使用加号（+）运算符进行数值计算时，JavaScript 会尝试将非数值转换为数值。
3. 关系运算符：当使用大于（>）、小于（<）等关系运算符比较不同类型的值时，JavaScript 会尝试将它们转换为数值。
4. == 运算符：会先尝试将两边的值转换为相同的类型，然后再进行比较。这种类型转换可能会导致一些不直观的结果。(只会在判断属性值是否为null时使用==来判断，其他情况都推荐用===来比较)
::: warning
obj.a == null
等价于
obj.a === null || obj.a === undefined
:::
5. === 运算符：不会进行类型转换，只有在两边的值和类型都相等时才返回 true。

## 6.原型和原型链

<h4>Class 类</h4>

1. JavaScript 中的类（Class）是基于原型链的语法糖。在 ES6 中，可以使用 class 关键字来定义一个类，它本质上是一个特殊的函数对象，用于创建具有特定属性和方法的对象。
2. 原型 (prototype)：每个 JavaScript 对象都有一个内部属性 [[Prototype]]，指向其原型。这个原型也是一个对象，它包含了可以被继承的属性和方法。
3. 原型链：当访问一个对象的属性或方法时，如果该对象自身没有这个属性或方法，JavaScript 会沿着其 [[Prototype]] 指向的原型链向上查找。原型链的末端是 null，表示查找结束。
4. 构造函数：在 JavaScript 中，可以使用函数来创建对象。当使用 new 关键字调用一个函数时，该函数的内部会创建一个新的空对象，并将这个新对象的 [[Prototype]] 指向构造函数的 prototype 属性。
5. 继承：通过原型链，JavaScript 支持基于原型的继承。一个对象可以继承另一个对象的属性和方法。
6. 原型链的末端是 Object.prototype，它包含了所有对象共有的属性和方法，如 toString()。

<h4>继承</h4>

1. extends关键字：在ES6中，可以使用extends关键字来实现类的继承。
2. super关键字：在子类中使用super可以调用父类的构造函数和方法。

<h4>原型</h4>

1. instanceof 运算符：用于判断一个对象是否属于某个构造函数所创建的实例。
2. 显式原型：每个class或函数都有一个prototype属性，指向它的原型对象。
3. 隐式原型：每个实例对象都有一个内部属性 _proto_，指向它的构造函数的prototype。
4. 实例的隐式原型指向其class的显式原型。
5. 基于原型的执行规则：获取属性或者方法时，会先在当前对象上查找，如果找不到，则沿着隐式原型_proto_查找。
<img src="/assets/jsBase/5.png" style="margin-top:15px">
<img src="/assets/jsBase/6.png" style="margin-top:15px">

<h4>原型链</h4>

<div style="color:red;font-weight:600;margin-top:15px">
  子类的显示原型也是一个对象，它的隐式原型指向父类的显示原型.
</div>
<img src="/assets/jsBase/7.png" style="margin-top:15px">

::: warning
  1. 判断是否为自己的属性，可以使用hasOwnProperty方法。该方法会检查给定的属性是否存在于对象自身上，而不是其原型链中。obj.hasOwnProperty('key')
  2. 用于判断一个对象是否属于某个构造函数所创建的实例，可以使用instanceof运算符。例如：obj instanceof Constructor
  instanceof运算符的工作原理是基于原型链的查找机制。当使用obj instanceof Constructor时，JavaScript会检查obj的内部属性_proto_是否指向Constructor.prototype或其原型链上的某个位置。
:::
<div style="color:red;font-weight:600;margin-top:15px">
  hasOwnProperty方法来自于Object.prototype，因此所有对象都继承了这个方法。
</div>
<img src="/assets/jsBase/8.png" style="margin-top:15px">

```js
// 父类
  class Peoson {
    constructor(name) {
      this.name = name;
    }
    introduce() {
      return `I'm ${this.name}`;
    }
  }
  // 子类1
  class Student extends Peoson {
    constructor(name, number) {
      super(name); // 调用父类的构造函数
      this.number = number;
    }
    say(){
      return `${this.name} is ${this.number} say`
    }
  }

  const xialuo1 = new Student('xialuo', 18);
  // console.log(xialuo1.introduce());
  // console.log(xialuo1.say());

  // 子类2
  class Teacher extends Peoson {
    constructor(name, subject) {
      super(name); // 调用父类的构造函数
      this.subject = subject;
    }
    teach(){
      return `${this.name} is ${this.subject} teacher`
    }
  }

  const xialuo2 = new Teacher('xialuo', 'math');
  // console.log(xialuo2.introduce());
  // console.log(xialuo2.teach());
  // console.log('xialuo1',xialuo1)
  const proto = xialuo1.__proto__
  const prototype = Student.prototype
  console.log('实例对象的隐式原型', xialuo1.__proto__)
  console.log('类对象的显式原型', Student.prototype)
  console.log('显式原型 === 隐式原型', proto === prototype)
  // 子类的显示原型也是一个对象，它的隐式原型指向父类的显示原型
  const sonProto = Student.prototype.__proto__
  const fatherProto = Peoson.prototype
  console.log('子类的显示原型的隐式原型===父类的显示原型', sonProto === fatherProto)
```
## 7.作用域和闭包

<h4>作用域</h4>

1. 全局作用域：在代码的最外层定义的变量和函数，它们可以在任何地方被访问。
2. 函数作用域：在函数内部定义的变量和函数，它们只能在当前函数的代码块中被访问。
3. 块级作用域：在 ES6 中，使用 let 和 const 声明的变量具有块级作用域。
<img src="/assets/jsBase/9.png" style="margin-top:15px">

<h4>自由变量</h4>

1. 一个变量在当前的局部作用域中没有定义，但是被引用了。
2. 向外层作用域查找变量值的过程，称为作用域链。
3. 如果到全局作用域还没有找到，就会报错 xx is not defined。

<h4>闭包</h4>

1. 作用域应用的特殊场景：函数作为参数传递，函数作为返回值被返回
2. 闭包的定义：当一个函数可以访问到其外部作用域中的变量时，这个函数就是一个闭包。
<div style="color:red;font-weight:600;margin-top:15px">
  自由变量寻找时在函数定义的上级作用域中寻找，不是在函数调用的上级作用域中查找
</div>
<div style="color:red;font-weight:600;margin-top:15px">
  自由变量的作用域在函数定义时就确定了，不是在调用时确定的。
</div>

```js
  // 闭包
  // 1. 函数作为参数传递
  function outer1(fn){
    let a = 200
    fn()
  }

  let a = 100;
  function inner(){
    console.log('函数作为参数传递',a)
  }
  outer1(inner) // 100
  
  // 2.函数作为返回值
  function outer2(){
    let b = 100
    return function inner() {
      console.log('函数作为返回值',b)
    }
  }
  const fn = outer2();
  const b = 200;
  fn() // 100

  // 自由变量寻找时在函数定义的上级作用域中寻找，不是在函数调用的上级作用域中查找
```

<script setup>
  const initObj = {
    name:'xxx',
    age: 18,
    feature: { 
      height: 180,  
      weight: 60,
      hobbies: ['football', 'basketball']
    },
    like: ['football', 'basketball', { name: 'xxx'}],
    fun: function() { console.log('function'); }
  }
  function deepClone(obj) { 
    // null 或者 非对象 直接返回 
    if (obj === null || typeof obj !== 'object') return obj; 
    // 数组 或者 对象 直接递归复制
    let result = Array.isArray(obj) ? [] : {}; 
    for (let key in obj) { 
      if (obj.hasOwnProperty(key)) {  // 判断是不是自身的属性，防止原型链上的属性被复制过来
        if (typeof obj[key] === 'object') { // 判断值是不是对象或者数组 
          result[key] = deepClone(obj[key]); // 对象或者数组赋值进行递归调用
        } else { 
          result[key] = obj[key];  // 非对象 直接赋值
        }
      } 
    } 
    return result; 
  }
  // const newObj = deepClone(initObj);
  // newObj.name = 'yyy';
  // newObj.feature.height = 190;
  // console.log('oldObj', initObj);
  // console.log('newObj', newObj);
  // 父类
  // class Peoson {
  //   constructor(name) {
  //     this.name = name;
  //   }
  //   introduce() {
  //     return `I'm ${this.name}`;
  //   }
  // }
  // // 子类1
  // class Student extends Peoson {
  //   constructor(name, number) {
  //     super(name); // 调用父类的构造函数
  //     this.number = number;
  //   }
  //   say(){
  //     return `${this.name} is ${this.number} say`
  //   }
  // }

  // const xialuo1 = new Student('xialuo', 18);
  // // console.log(xialuo1.introduce());
  // // console.log(xialuo1.say());

  // // 子类2
  // class Teacher extends Peoson {
  //   constructor(name, subject) {
  //     super(name); // 调用父类的构造函数
  //     this.subject = subject;
  //   }
  //   teach(){
  //     return `${this.name} is ${this.subject} teacher`
  //   }
  // }

  // const xialuo2 = new Teacher('xialuo', 'math');
  // // console.log(xialuo2.introduce());
  // // console.log(xialuo2.teach());
  // // console.log('xialuo1',xialuo1)
  // const proto = xialuo1.__proto__
  // const prototype = Student.prototype
  // console.log('实例对象的隐式原型', xialuo1.__proto__)
  // console.log('类对象的显式原型', Student.prototype)
  // console.log('显式原型 === 隐式原型', proto === prototype)
  // // 子类的显示原型也是一个对象，它的隐式原型指向父类的显示原型
  // const sonProto = Student.prototype.__proto__
  // const fatherProto = Peoson.prototype
  // console.log('子类的显示原型的隐式原型===父类的显示原型', sonProto === fatherProto)

  // 作用域
  // let a = 10;
  // function fn1(){
  //   let a1 = 100
  //   function fn2(){
  //     let a2 = 200
  //     function fn3(){
  //       let a3 = 300
  //       return `${a}- ${a1}- ${a2}- ${a3}`
  //     }
  //     return fn3()
  //   }
  //   return fn2()
  // }
  // console.log(fn1())

  // 闭包
  // 1. 函数作为参数传递
  function outer1(fn){
    let a = 200
    fn()
  }

  let a = 100;
  function inner(){
    console.log('函数作为参数传递',a)
  }
  outer1(inner) // 100
  
  // 2.函数作为返回值
  function outer2(){
    let b = 100
    return function inner() {
      console.log('函数作为返回值',b)
    }
  }
  const fn = outer2();
  const b = 200;
  fn() // 100

  // 自由变量寻找时在函数定义的上级作用域中寻找，不是在函数调用的上级作用域中查找

</script>