class Person {
  private name = "John";
  public getName(){
    return this.name
  }
}
const person = new Person()

class Student extends Person {
  private studentId = 10;
  constructor() {
    super(); // 调用父类的 constructor(constructor 方法是类的构造函数，通过 new 实例化类的时候自动调用的)
    console.log(super.getName());
    console.log(this.getName());
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

