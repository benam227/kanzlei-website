OPENCODE FIX — Page toggles defaults + remove required validation

GOAL:
Make page toggles usable:
- defaults should be enabled=true for core pages
- navLabel/navOrder should not block editing
- frontend should have sane fallbacks if CMS fields are empty

STEPS:
1) Open kanzlei-website/content/siteSettings.json
   - Set enabled=true for core pages (home, services, booking, faq, downloads)
   - Set navLabel and navOrder defaults for each.
2) Open kanzlei-website/public/admin/config.yml
   - For the siteSettings fields:
     - mark navLabel/navOrder as required: false
     - (optional) add default values if Decap supports it; otherwise required:false is enough
3) In Layout/Header where nav is built:
   - if navLabel missing => fallback to hardcoded label
   - if navOrder missing => fallback to a default order
4) Build + typecheck.
5) Commit: "fix: cms page toggles defaults and validation"

OUTPUT: changed file paths + build/typecheck pass.