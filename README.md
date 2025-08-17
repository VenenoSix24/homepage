# 个人主页 - Mod by Ivyris

这是基于 [ZYYO/homepage](https://github.com/ZYYO666/homepage) 项目修改的个人主页。

首先，非常感谢原作者 ZYYO 创造出如此简洁美观的模板。我在保留其核心设计理念的基础上，进行了一系列的修改，使其更易于配置和维护。

> **我的演示站**：[https://m.776624.xyz](https://m.776624.xyz)

![主页截图](https://s2.loli.net/2025/08/17/Ugae6m5EkQCDt4V.jpg)

---

## ✨ ZYYO PHP 后台版

如果你需要一个功能更强大的后台来管理主页内容，原作者 **ZYYO** 开发了一个 PHP 后台版。

**后台版特色功能**：

- **在线管理**：通过后台方便地对图标、项目、标签、主题样式等所有内容进行增删改查。
- **功能开关**：可自由控制贪吃蛇、侧边栏、技能墙等模块的显示与隐藏。
- **主题细化**：支持在后台进行多主题切换，并细致修改所有主题细节。

这是一个增值版本，如果你认为这些功能对你有帮助，请考虑赞助并支持原作者 ZYYO 的辛勤劳动。

- **演示站** ：[https://zyyo.cc](https://zyyo.cc/)
- **后台演示地址**：[https://zyyo.cc/admin](https://zyyo.cc/admin)
- **账号**: `admin` / **密码**: `123456`
- **联系作者 QQ**: `3509679579`

---

## 🚀 我的主要修改

与原版相比，此版本主要有以下修改：

- **数据重构**:

  - 我将原版 HTML 中硬编码的所有个人信息、项目列表、时间线、技能图标等内容，全部抽离到了 `/static/js/data.js` 文件中。
  - 现在，你几乎可以通过修改这一个文件来定制整个网站，无需再改动 HTML 结构，极大地提升了可维护性。

- **图片压缩体积:**

  - 对项目中图片资源进行压缩，改用体积更小的 webp 格式

- **UI/UX 动画优化**:

  - 我重写了项目卡片的 CSS 悬浮动画，解决了在部分浏览器（尤其是 Safari）上出现的动画“跳动”和“割裂感”问题，使其过渡效果更加平滑和优雅。
  - 调整了卡片内容显示逻辑，改善了信息呈现方式。

- **代码现代化与健壮性**:

  - 增加了对数据有效性的检查，确保即使 `data.js` 中部分数据缺失，页面也不会因此崩溃。

---

## 🛠️ 如何配置

1. **核心配置**：**打开 `/static/js/data.js` 文件**。这里是你的“控制中心”，修改 `siteConfig` 对象中的内容即可定制你的全站信息。
2. **主题与样式**:
   - 主题切换与模糊效果调整，请修改 `/static/css/root.css`。
   - 字体等核心样式，请修改 `/static/css/style.css`。
3. **图片资源**:
   - 头像: `/static/img/logo.webp`
   - 背景: `/static/img/background.webp`
   - 网站图标: `/static/img/favicon.ico`
4. **技能图标**:
   - 前往 [skill-icons](https://github.com/tandpfun/skill-icons) 项目，挑选你需要的图标。
   - 构建你的图标 URL (例如: `https://skillicons.dev/icons?i=js,html,css`)。
   - 将此 URL 填入 `data.js` 文件的 `skills` 部分。

---

## 部署

本项目已配置好 Docker，可实现一键部署。

1. 确保你已安装 `docker` 和 `docker-compose`。
2. 修改 `Caddyfile` 中的域名为你的域名。
3. 在项目根目录下运行命令：
   ```bash
   docker compose up -d
   ```

Caddy 将会自动为你申请 SSL 证书并开启 HTTPS。

---

## 🙏 鸣谢

- **原项目作者**: [ZYYO](https://github.com/ZYYO666)
- **灵感来源**: xhofe, ddiu
- **技能图标**: [skill-icons](https://github.com/tandpfun/skill-icons)

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=VenenoSix24/homepage&type=Date)](https://www.star-history.com/#VenenoSix24/homepage&Date)
