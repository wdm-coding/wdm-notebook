# class类

## 修饰符

1. public 公共属性 类外可以访问
2. private 私有属性 类内可以访问
3. protected 受保护属性 类内或者子类可以访问

<div>
  <p>获取姓名:{{name}}</p>
</div>

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
    public getStudentId(){
      return this.studentId
    }
  }
  const s1 = new Student();
  s1.getName();
  s1.getStudentId();
```

<script lang="ts" setup>
  class Person {
    private name = "John";
    public getName(){
      return this.name
    }
  }
  const person = new Person()
  const name = person.getName()

  class Student extends Person {
    private studentId = 10;
    public getStudentId(){
      return this.studentId
    }
  }
  const s1 = new Student();
  s1.getName();
  s1.getStudentId();
</script>

