# dev-cli

> 一个适合自己使用cli工具。

**install**

```ls
npm i -g git+https://github.com/mengdu/dev-cli.git
```

## TODO

 - [x] serve 静态服务器


## serve

创建一个静态文件服务器

```ls
dev serve [options] <dir> <port>
```

**options:**

 + `-p, --port <port>` 指定端口，默认 `8080`
 + `-d, --dir <dir>` 指定文件夹，默认 `.`
 + `-o, --open` 自动打开浏览器，默认 false

