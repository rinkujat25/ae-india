# Wingback Docker Deployment

Target domain: `wingback-giftverse.sampley.in`

The domain resolves to `72.60.204.113`. Run these commands on that server.

**Steps 2 to 4 have not been completed on the server yet.** DNS points at the
box and the container may well be running, but nginx has no `server` block for
this hostname, so both ports fall through to whatever vhost answers by default
— today that is an unrelated app, `admin.dealmints.in`. The symptoms are:

- `http://wingback-giftverse.sampley.in/` → **404 from nginx itself**
- `https://wingback-giftverse.sampley.in/` → **certificate for `admin.dealmints.in`**,
  and every path 307s to that app's `/login`

Nothing in this repository can fix that; it is the three steps below.

## 1. Start the Docker app

```bash
cd /path/to/Wingback
./deploy.sh
docker compose ps
curl -I http://127.0.0.1:4010
```

The Next.js app should stay available locally on port `4010`.

`deploy.sh` stops the old container, removes the old `wingback-nextjs:latest` image, rebuilds without cache, starts the new container, and verifies the app responds on port `4010`.

## 2. Install bootstrap Nginx site config

Use the bootstrap config first. It does not reference SSL files, so `nginx -t` can pass before the certificate exists.

```bash
sudo cp deploy/nginx/wingback-giftverse.sampley.in.bootstrap.conf /etc/nginx/sites-available/wingback-giftverse.sampley.in.conf
sudo ln -sf /etc/nginx/sites-available/wingback-giftverse.sampley.in.conf /etc/nginx/sites-enabled/wingback-giftverse.sampley.in.conf
sudo nginx -t
sudo systemctl reload nginx
```

## 3. Issue/repair SSL

HTTPS currently serves the default vhost's certificate, issued for
`admin.dealmints.in`, so it fails verification for this host. Certbot needs the
bootstrap config active first — it answers the ACME challenge over port 80,
which is the 404 above until step 2 is done:

```bash
sudo certbot certonly --webroot -w /var/www/html -d wingback-giftverse.sampley.in
```

## 4. Install final HTTPS Nginx config

After Certbot creates `/etc/letsencrypt/live/wingback-giftverse.sampley.in/fullchain.pem`, install the final SSL config:

```bash
sudo cp deploy/nginx/wingback-giftverse.sampley.in.ssl.conf /etc/nginx/sites-available/wingback-giftverse.sampley.in.conf
sudo nginx -t
sudo systemctl reload nginx
```

## 5. Verify

```bash
curl -I https://wingback-giftverse.sampley.in
curl -s https://wingback-giftverse.sampley.in/robots.txt
```

`/` should answer 200 with the storefront, and `robots.txt` should allow the
public routes while disallowing `/api/`, `/account`, `/cart`, `/checkout` and
`/auth/`. A blanket `Disallow: /` means the old development-time robots rule is
still in the image and it needs rebuilding.

Two things worth checking on the first deploy, because both are baked in at
**build** time and a wrong value is invisible until it is indexed:

```bash
# Must print https://wingback-giftverse.sampley.in -- not localhost:3000,
# and not the old wingback.sampley.in.
curl -s https://wingback-giftverse.sampley.in/robots.txt | grep -i host
curl -s https://wingback-giftverse.sampley.in/ | grep -o '<link rel="canonical"[^>]*>'
```

If either shows the wrong origin, `NEXT_PUBLIC_SITE_URL` was missing or stale
when the image was built. Re-run `./deploy.sh`, which rebuilds with
`--no-cache`; restarting the container alone will not change it.
