# Netlify Debug Checklist

## 1. Build Settings
- [ ] Publish directory: `dist` (or `kanzlei-website/dist` if using subdirectory)
- [ ] Build command: `npm run build`
- [ ] Base directory: (empty) OR `kanzlei-website` if repo has subfolder

## 2. Required Environment Variables
Set in Netlify UI → Site settings → Environment variables:
- `VITE_SITE_URL` = https://your-domain.netlify.app
- `VITE_ACUITY_EMBED_URL` = https://your-acuity-url (optional)
- `VITE_MATOMO_URL` = (optional)
- `VITE_MATOMO_SITE_ID` = (optional)

## 3. Files Check
- [ ] `public/_redirects` exists in dist output
- [ ] `public/robots.txt` exists in dist output
- [ ] `public/sitemap.xml` exists in dist output
- [ ] `public/admin/` folder exists in dist

## 4. Common Issues

### White Screen
- Check browser console for JavaScript errors
- Verify VITE_SITE_URL is set (affects canonical URLs)
- Check that all imports resolve correctly

### 404 on refresh (SPA)
- Verify `_redirects` file contains: `/* /index.html 200`

### CMS not loading
- Check that `config.yml` is valid YAML
- Verify `media_folder` and `public_folder` paths are correct
