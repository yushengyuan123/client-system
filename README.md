# 项目运行

需要安装三个目录的node_modules：

1. 根目录

2. egg目录

3. src/render目录

进入这个三个目录

```
yarn install
```

依赖安装完之后，在根目录执行

```
yarn run dev
```

自动启动所有进程

# 代码所在目录

1. egg目录：是egg http server所在目录

2. src/render目录，页面逻辑所在目录

3. src/main目录，electron主进程运行目录（可以不用管）

# 代码规范

eslint，规定两个空格缩进，没有分号

全部使用typscript书写，使用类型，尽量避免出现any，除非逻辑中确实是any

使用yarn，不要使用npm


