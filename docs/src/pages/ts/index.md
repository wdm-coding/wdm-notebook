## ts
 
<div>count: {{ count }}</div>
<div>person: {{ person }}</div>

<script setup lang="ts">
  const count: number = 10;
  interface Person {
    name: string;
    age: number;
  }
  const person: Person = {
    name: "tom",
    age: 18,
    sex: "man"
  }
</script>