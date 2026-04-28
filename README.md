# OVERHEAT TCG ONLINE

## Web 开发

```bash
npm install
npm run init
npm run dev
```

前端默认运行在 `http://localhost:3000`，后端默认运行在 `http://localhost:3001`。

## Android 打包

本项目已接入 Capacitor，Android 原生工程位于 `android/`。

1. 准备移动端后端地址：

```bash
copy .env.android.example .env.android
```

然后编辑 `.env.android` 里的 `VITE_BACKEND_URL`。

- Android 模拟器访问本机后端：`http://10.0.2.2:3001`
- 真机访问同一 Wi-Fi 下电脑后端：`http://你的电脑局域网IP:3001`
- 正式发布建议使用 HTTPS 域名

2. 构建并同步 Android 资源：

```bash
npm run build:android
```

3. 用 Android Studio 打开工程：

```bash
npm run android:open
```

也可以直接运行到已连接设备：

```bash
npm run android:run
```

> Android 本地构建需要安装 Android Studio、Android SDK 和 JDK。
