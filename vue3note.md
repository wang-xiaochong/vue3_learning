# 遇到的问题

1. 组件传参：

   1. defineProps({propB: [String, Number]})表示是一个字符串或者是一个数字  类型检查

   2. defineProps<{propB: [String, Number]}>()表示是一个["string",number]  类型定义

      关于defineProps还不是特别的熟悉

2. 无法找到模块“./Person.js”的声明文件。“e:/personal/vue3_learning/src/Person.js”隐式拥有 "any" 类型。ts

   有几种方法可以解决这个问题：

   1. 将 `Person.js` 转换为 `Person.ts`

   2. 创建一个声明文件

      如果你不想或不能将 `Person.js` 转换为 TypeScript，你可以创建一个声明文件（比如 `Person.d.ts`），在这个文件中为 `Person.js` 提供类型声明。

   3. 允许导入任何模块

      另一个临时解决方法是在 TypeScript 的配置文件 `tsconfig.json` 中添加一些设置，允许 TypeScript 导入任何没有声明文件的模块。这样做虽然方便，但会失去 TypeScript 提供的类型检查的好处。

3. 



