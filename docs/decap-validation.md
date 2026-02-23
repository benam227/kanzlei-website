# Decap CMS Validation Checklist

- Open `/admin/#/` in browser
- Login with Netlify Identity
- Verify each collection shows existing content:
  - Seiten → Homepage (shows title "Willkommen")
  - Seiten → Leistungen (shows services list)
  - Seiten → Impressum
  - Seiten → Datenschutz
  - Daten → FAQ (shows 10 questions)
  - Daten → Downloads (shows 3 files)
- Edit homepage title and publish
- Check GitHub commit appears on main
- Check Netlify deploy runs
- Verify changes on live site
