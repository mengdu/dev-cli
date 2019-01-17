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
 + `-w, --watch` 开启监听文件变化，刷新页面，默认 false
 + `--ui` 开启 ，默认 `Browsersync` ui 页面 ，默认false
 + `--ui` 开启 ，默认 `Browsersync` ui 页面 ，默认false
 + `--ui-port <port>` Browsersync ui 服务端口 (default: 3001)
 + `-c, --config <config>` 指定 [Browsersync 配置文件](https://browsersync.io/docs/options)
