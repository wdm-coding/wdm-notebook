# Interface 接口

<div>
  <p>point  {{point}}</p>
</div>

```typescript
  interface Point {
    x: string
    y: number
  }

  const point: Point = {
    x: '123',
    y: 456
  }
```



<script lang="ts" setup>

  interface Point {
    x: string
    y: number,
    z?: number
  }

  // 可以进行属性的扩展
  interface Point {
    a: string
  }

  const point: Point = {
    x: '123',
    y: 456,
    a: '123'
  }
</script>