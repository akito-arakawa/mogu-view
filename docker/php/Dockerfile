FROM php:8.3-fpm

RUN apt-get update && apt-get install -y \
    git \
    curl \
    libonig-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo_mysql \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY php.ini /usr/local/etc/php/conf.d/custom.ini

WORKDIR /var/www/html

EXPOSE 9000
