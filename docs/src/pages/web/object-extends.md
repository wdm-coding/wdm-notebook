# 原型链继承的实现

## prototype与__proto__的关系
1. prototype是‌函数(构造函数)特有的属性‌，指向该函数的原型对象，用于存储实例共享的属性和方法
2. __proto__是‌对象实例的属性‌（包括函数对象），指向创建该实例的构造函数的prototype
3. 当通过构造函数创建实例时，实例的__proto__会自动指向构造函数的prototype。
4. prototype是构造函数的显式属性，用于配置实例继承的原型对象
5. __proto__是实例的隐式属性(`[[Prototype]]`)，用于访问原型对象上的属性和方法
6. 属性查找会沿__proto__链向上回溯，直到Object.prototype.__proto__（为null）

## 总结原型链继承
1. 一个实例的__proto__属性指向其构造函数的prototype
2. 构造函数的prototype 指向这个类的prototype对象，用于存储实例共享的属性和方法

## 1. 定义父类 和 父类的原型方法
```js
// 定义父类
function ParentClass(parentProp){
  this.parentProp = parentProp; // 父类属性
}
// 定义父类的原型方法
ParentClass.prototype.getProp = function(){
  console.log(`获取父类属性${this.parentProp}`);
};
// 父类的原型(也是一个对象)
ParentClass.prototype = {
  getProp: ƒ () // 父类原型方法
  constructor: ƒ ParentClass(parentProp) // 父类构造函数
  [[Prototype]]: Object // 父类原型的原型对象 指向Object.prototype
}
```

## 2. 定义子类，调用父类构造函数继承父类属性
```js
// 定义子类
function ChildClass(parentProp,childProp){
  ParentClass.call(this, parentProp); // 调用父类构造函数，继承父类的属性
  this.childProp = childProp; // 设置子类属性
}
```

## 3. 子类的原型对象指向父类的实例，从而继承父类的原型方法
```js
Bus.prototype = new Vechile();
```

## 4. 修正原型链上的constructor属性指向正确的构造函数
```js
Bus.prototype.constructor = Bus;
```

## 寄生式组合继承：解决子类原型对象上constructor属性和其他无关属性的问题
1. 定义中间构造函数 Middle
2. Middle 是一个构造函数，当它被实例化时，它的 constructor 属性被显式设置为 childClass
3. 设置 Middle 的原型为 parentClass 的原型对象，这样就可以继承 parentClass 上的方法和属性
4. 通过实例化 Middle 来创建 childClass 的原型对象。由于 Middle 的原型是 parentClass 的原型，因此 childClass 的原型现在间接地继承自 parentClass 的原型。
5. 由于 Middle 构造函数将 this.constructor 设置为 childClass，childClass.prototype.constructor 现在指向 childClass，保持了构造函数的正确引用。
```js
function extends(parentClass, childClass){
  function Middle(){
    //  Middle 是一个构造函数，当它被实例化时，它的 constructor 属性被显式设置为 childClass。
    // 这是为了确保通过 Middle 创建的对象在访问 constructor 属性时，能够正确地指向 childClass 而不是 Middle。
    this.constructor = childClass;
  }
  // 设置 Middle 的原型为 parentClass 的原型对象，这样就可以继承 parentClass 上的方法和属性。
  Middle.prototype = parentClass.prototype;
  // 这里，通过实例化 Middle 来创建 childClass 的原型对象。由于 Middle 的原型是 parentClass 的原型，因此 childClass 的原型现在间接地继承自 parentClass 的原型。
  childClass.prototype = new Middle();
}
//执行extends
extends(ParentClass, ChildClass);
```
6. 保持原型链的完整性：childClass 的原型间接继承自 parentClass 的原型。
7. 构造函数引用的正确性：确保 childClass.prototype.constructor 指向 childClass 而不是 Middle 或 parentClass。

## ES6 class 继承的实现
1. extends 关键字：用于创建一个子类，它继承了父类的属性和方法。
2. super 关键字：在子类中，super 可以用来调用父类的构造函数和方法。
```ts
// 支付的父类
class pay {
  bank_card_no: string; //  银行卡号
  balance: number; // 余额
  cost: number = 0; // 消费金额
  tokenid: string; // 支付令牌
  constructor(bank_card_no:string,balance:number,cost:number,tokenid:string) {
    this.bank_card_no = bank_card_no;
    this.balance = balance;
    this.cost = cost;
    this.tokenid = tokenid;
  }
  pay() {
    console.log('pay');
  }
}

enum PayType {
  WebChat = 1, // 微信支付
  Alipay = 2, // 支付宝支付
  UnionPay = 3, // 银联支付
}

// 银联支付
class ATMpay extends pay {}

// 移动支付
class MobliePay extends pay {
  pay_type: PayType; // 支付类型
  change:number; // 平台金额
  openid:number; // 用户识别身份id
  appid:string; // 微信应用标识
  // 重写父类的pay方法
  pay() {
    super.pay(); // 调用父类的pay方法
    console.log('MobliePay');
  }
  constructor(
    bank_card_no:string,
    balance:number,
    cost:number,
    tokenid:string,
    pay_type: PayType,
    change:number,
    openid:number,
    appid:string
  ) {
    super(bank_card_no,balance,cost,tokenid); // 调用父类的构造函数
    this.pay_type = pay_type;
    this.change = change;
    this.openid = openid;
    this.appid = appid;
  }
}
let webChatPay = new MobliePay(
  '1234567890', 100, 10, '1234567890', PayType.WebChat, 10, 12345678,'123456',  
)
webChatPay.pay();
```