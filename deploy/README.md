# Wingback Docker Deployment

Target domain: `wingback.sampley.in`

The domain currently resolves to `72.60.204.113`. Run these commands on that server.

## 1. Start the Docker app

```bash
cd /path/to/nextjsapp
./deploy.sh
docker compose ps
curl -I http://127.0.0.1:3081
```

The Next.js app should stay available locally on port `3081`.

`deploy.sh` stops the old container, removes the old `wingback-nextjs:latest` image, rebuilds without cache, starts the new container, and verifies the app responds on port `3081`.

## 2. Install bootstrap Nginx site config

Use the bootstrap config first. It does not reference SSL files, so `nginx -t` can pass before the certificate exists.

```bash
sudo cp deploy/nginx/wingback.sampley.in.bootstrap.conf /etc/nginx/sites-available/wingback.sampley.in.conf
sudo ln -sf /etc/nginx/sites-available/wingback.sampley.in.conf /etc/nginx/sites-enabled/wingback.sampley.in.conf
sudo nginx -t
sudo systemctl reload nginx
```

## 3. Issue/repair SSL

The public HTTPS endpoint currently has a certificate mismatch for `wingback.sampley.in`. Run Certbot after the bootstrap config is active:

```bash
sudo certbot certonly --webroot -w /var/www/html -d wingback.sampley.in
```

## 4. Install final HTTPS Nginx config

After Certbot creates `/etc/letsencrypt/live/wingback.sampley.in/fullchain.pem`, install the final SSL config:

```bash
sudo cp deploy/nginx/wingback.sampley.in.ssl.conf /etc/nginx/sites-available/wingback.sampley.in.conf
sudo nginx -t
sudo systemctl reload nginx
```

## 5. Verify

```bash
curl -I https://wingback.sampley.in
curl -s https://wingback.sampley.in/robots.txt
```

During development, `robots.txt` should return:

```txt
User-Agent: *
Disallow: /
```
