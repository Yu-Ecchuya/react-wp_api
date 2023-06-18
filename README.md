# Docker + React + WP REST API
OS: Mac<br>
Environment: Docker<br>
Frontend: React<br>
Backend: WordPress(PHP)

# Overview
ReactとWP REST APIを使用したブログサイトの構築

---

#  WordPress設定
1. JWT Authentication for WP REST API インストール

---

#  Backend側 設定
## JWT Authentication for WP REST API 設定
1. .htaccess 下記を追加
```.htaccess
# JWT Authentication for WP REST API
<IfModule mod_rewrite.c>
RewriteEngine on
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%1]
</IfModule>
SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
```

2. wp-config.php 下記を追加
※ シークレットキーに 'https://api.wordpress.org/secret-key/1.1/salt/' で生成したキーを設定
▼ 参考URL
[https://api.wordpress.org/secret-key/1.1/salt/](https://api.wordpress.org/secret-key/1.1/salt/)

```wp-config.php
# 秘密鍵の生成に用いる文字列をセット
define('JWT_AUTH_SECRET_KEY', 'シークレットキー');
# CORS を有効にする
define('JWT_AUTH_CORS_ENABLE', true);
```

---

#  Frontend側 設定


#  .env 設定
REACT_APP_API_URL=WP側のURL
REACT_APP_WP_USER_NAME=WPのユーザーネーム
REACT_APP_WP_PASSWORD=WPのパスワード