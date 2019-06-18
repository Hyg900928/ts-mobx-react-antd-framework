## 使用步骤

### 开发
```
  npm i
  npm start
```

### 构建
```
  npm run build
```

## 注意事项
由于Antd的按需加载用到babel-plugin-import

babel-plugin-import 只支持es6 module写法的代码
tsconfig中必须指定module为ES
所以为webpack的配置文件专门写了一个tsconifg-for-webapck-config-json文件
将里面的module设置为commonjs

```
参考链接
https://webpack.js.org/configuration/configuration-languages/#typescript
