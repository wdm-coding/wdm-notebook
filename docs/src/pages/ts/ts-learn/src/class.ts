class Person {
  private name = "John";
  protected age = 20; // protected 受保护的
  public getName(){
    return this.name
  }
}
const person = new Person()

class Student extends Person {
  private studentId = 10;
  constructor() {
    super(); // 调用父类的 constructor(constructor 方法是类的构造函数，通过 new 实例化类的时候自动调用的)
    // console.log(super.getName());
    // console.log(this.getName());
  }
  public getStudentId(){
    return this.studentId
  }
  // 扩展方法
  getName(){
    return 'stu'
  }
}
const s1 = new Student();
s1.getName();
s1.getStudentId();


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

interface I extends Person {}
// C 必须是 Person 的子类，并且实现了 I 接口
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
