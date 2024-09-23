# class类

## 修饰符

1. public 公共属性 类外可以访问
2. private 私有属性 类内可以访问
3. protected 受保护属性 类内或者子类可以访问
4. readonly 在类里可以使用关键字将属性设置为只读。

```typescript
  class Person {
    private name = "John";
    public getName(){
      return this.name
    }
  }
  const person = new Person()
  const name = person.getName()
```
## 类的继承

```typescript
  class Student extends Person {
    private studentId = 10;
    constructor() {
      super(); // 调用父类的 constructor(constructor 方法是类的构造函数，通过 new 实例化类的时候自动调用的)
      super.getName() // 调用父类的方法 John
      this.getName() // 调用自身的方法 stu
    }
    public getStudentId(){
      return this.studentId
    }
    // 扩展方法
    getName(){
      return 'stu'
    }
  }
```
## 类类型接口

```typescript
interface FoodInterface{
  type:string
}

class FoodClass implements FoodInterface{
  // public type:string
  // constructor(arg:string){
  //   this.type = arg
  // }
  // 缩写
  constructor(public type:string){}
}
```
## 接口继承类

1. 接口可以继承类，当接口继承了类时，接口类型只继承类中定义好的属性和方法。
2. 接口继承类的私有或受保护的属性时，这个接口只能被这个类或它的子类实现。

<hr>

1. 类与类的继承使用extends关键字
2. 接口与接口的继承使用extends关键字
3. 类与接口的继承使用implements关键字


```typescript
interface I extends Person {}
// C 必须是 Person 的子类，并且继承了 I 接口
class C extends Person implements I {
  constructor() {
    super();
  }
  public getAge() {
    return this.age;
  }
}
const instance = new C();
instance.getAge()
```


<script setup lang="ts">
  class Person {
    private name = "John";
    public getName(){
      return this.name
    }
  }
  class Student extends Person {
    private studentId = 10;
    constructor() {
      super();
      console.log('super.getName',super.getName())
      console.log('this.getName',this.getName())
    }
    public getStudentId(){
      return this.studentId
    }
    // 扩展方法
    getName(){
      return 'stu'
    }
  }
  const student = new Student()
</script>
