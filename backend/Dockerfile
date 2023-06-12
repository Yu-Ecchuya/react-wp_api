FROM wordpress:latest

# ServerNameを設定する
RUN echo "ServerName localhost" | tee /etc/apache2/conf-available/fqdn.conf
RUN a2enconf fqdn

# 必要なパッケージをインストールする
RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends $PHPIZE_DEPS ca-certificates curl xz-utils; \
    rm -rf /var/lib/apt/lists/*

COPY . /var/www/html
