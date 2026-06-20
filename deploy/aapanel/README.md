# Deploy `cms.wnskcex.com` on aaPanel

This guide keeps old sources (`admin.wnskcex.com` and `api.wnskcex.com`) alive while testing the new stack.

## 1) Server directories

```bash
mkdir -p /www/wwwroot/cms.wnskcex.com
mkdir -p /www/wwwroot/cms.wnskcex.com/admin
mkdir -p /www/wwwroot/cms.wnskcex.com/api
```

Put the new admin source in `/www/wwwroot/cms.wnskcex.com/admin` and the new API source in `/www/wwwroot/cms.wnskcex.com/api`.

## 2) Build and run both apps

Run these commands in each app folder:

```bash
npm install
npm run build
```

Then run with PM2:

```bash
pm2 start /www/wwwroot/cms.wnskcex.com/deploy/aapanel/ecosystem.config.cjs
pm2 save
pm2 status
```

If your API is Laravel/PHP-FPM instead of Node, do not run the `cms-api` PM2 app and proxy `/api` to the configured PHP/Nginx site instead.

## 3) aaPanel reverse proxy (Nginx)

1. Open website config for `cms.wnskcex.com`.
2. Paste `deploy/aapanel/cms.wnskcex.com.nginx.conf`.
3. Keep aaPanel SSL certificate lines.
4. Reload Nginx.

## 4) Frontend env for Vercel

Set this on Vercel (Production + Preview):

```env
NEXT_PUBLIC_API_URL=https://cms.wnskcex.com
```

Because API calls already include `/api/...`, this will target `https://cms.wnskcex.com/api/...` correctly.

## 5) Smoke test

- `https://cms.wnskcex.com/` should open admin.
- `https://cms.wnskcex.com/api/config` should return API data.
- Vercel preview should read/write against current production database through the new API.

Or run automated checks:

```bash
chmod +x /www/wwwroot/cms.wnskcex.com/deploy/aapanel/verify-deploy.sh
/www/wwwroot/cms.wnskcex.com/deploy/aapanel/verify-deploy.sh
```

If your ports or process names are different:

```bash
DOMAIN=cms.wnskcex.com ADMIN_PORT=3100 API_PORT=3200 PM2_ADMIN_NAME=cms-admin PM2_API_NAME=cms-api /www/wwwroot/cms.wnskcex.com/deploy/aapanel/verify-deploy.sh
```

## 6) Safe cutover

After validation:

1. Keep old sources running for rollback window (3-7 days).
2. Move production traffic to `cms.wnskcex.com`.
3. Delete old sources only when logs/errors are stable.

This deployment does not modify or stop old sources by default.
