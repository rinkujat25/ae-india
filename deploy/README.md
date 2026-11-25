# AE India Docker deployment

The app runs in one container, `ae-india-nextjs`, on `127.0.0.1:4020`. nginx
terminates HTTPS and proxies to it. Run everything below on the server.

It can share a server with the Wingback store: the Compose project, container,
image and port are all different from that store's.

HTTPS is required. The app sends `upgrade-insecure-requests` and secure login
cookies, so opening it as `http://<server-ip>` shows an unstyled page and
sign-in does not stick.

## 1. Get the code and fill in `.env`

Build on the server. An image built on an Apple Silicon Mac is arm64 and will
not run on an ordinary amd64 server.

`.env` is not in git; create it from the example, or copy yours over.

```bash
cp .env.example .env
chmod 600 .env
```

Set at least `NEXT_PUBLIC_SITE_URL` (`https://aeindia.co`, no trailing slash) and the `HYPERINVENTORY_*` values. The deploy stops with a message when
a required one is empty.

Leave `NEXT_PUBLIC_GA_MEASUREMENT_ID` empty unless AE India has its own
property. If a value contains a `$`, put it in single quotes.

## 2. Build and start

```bash
./deploy.sh
```

It builds first and swaps the container only once the build succeeds.

## 3. Install the bootstrap nginx config

Port 80 only, so `nginx -t` passes before the certificate exists. DNS for
`aeindia.co` and `www.aeindia.co` must point at this server first. Run these
from the project folder.

Check that no other config already answers for the domain; nginx ignores the
second one it loads.

```bash
sudo grep -rln "aeindia.co" /etc/nginx/sites-enabled/ /etc/nginx/conf.d/
```

```bash
sudo mkdir -p /var/www/html
```

```bash
sudo cp deploy/nginx/aeindia.co.bootstrap.conf /etc/nginx/sites-available/aeindia.co.conf
```

```bash
sudo ln -sf /etc/nginx/sites-available/aeindia.co.conf /etc/nginx/sites-enabled/aeindia.co.conf
```

```bash
sudo nginx -t && sudo systemctl reload nginx
```

## 4. Issue the certificate

One certificate for both names. The hook reloads nginx after each renewal.

```bash
sudo certbot certonly --webroot -w /var/www/html --cert-name aeindia.co -d aeindia.co -d www.aeindia.co --deploy-hook "systemctl reload nginx"
```

## 5. Install the HTTPS nginx config

```bash
sudo cp deploy/nginx/aeindia.co.ssl.conf /etc/nginx/sites-available/aeindia.co.conf
```

```bash
sudo nginx -t && sudo systemctl reload nginx
```

`APP_PORT` in `.env` moves the container off 4020; change `proxy_pass` in the
installed nginx config to match.

## 6. Verify

```bash
curl -I https://aeindia.co
```

```bash
curl -s https://aeindia.co/ | grep -o '<link rel="canonical"[^>]*>'
```

```bash
curl -I https://www.aeindia.co
```

The last one must answer 301 to `https://aeindia.co/`. The canonical must show
the domain. It and the company details on static pages
are fixed at **build** time, so after changing `NEXT_PUBLIC_*` or `COMPANY_*` in
`.env`, run `./deploy.sh` again; a restart is not enough. The site is meant to
be out of search, so `robots.txt` answering `Disallow: /` is correct.

## Day to day

```bash
docker compose logs -f --tail=100 ae-india-nextjs
```

```bash
docker compose ps
```

```bash
docker compose down
```
