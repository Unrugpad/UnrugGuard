# UnrugGuard — Deployment Guide
## Powered by Unrugpad

---

## Step 1 — Set Up Supabase (Free Backend)

1. Go to **supabase.com** on your phone
2. Sign up with your GitHub account (free)
3. Tap **New Project**
4. Fill in:
   - Project Name: `unrugguard`
   - Database Password: (create a strong password, save it)
   - Region: Choose closest to Nigeria → `West EU (Ireland)` or `US East`
5. Wait 2 minutes for project to create

### Create the Database Tables

Go to **SQL Editor** in your Supabase dashboard and run this SQL:

```sql
-- Users table
CREATE TABLE guard_users (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  guard_id   text UNIQUE NOT NULL,
  username   text NOT NULL,
  lat        float,
  lng        float,
  last_seen  timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Connections table
CREATE TABLE guard_connections (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  from_id    text NOT NULL,
  from_name  text,
  to_id      text NOT NULL,
  to_name    text,
  status     text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE guard_users       ENABLE ROW LEVEL SECURITY;
ALTER TABLE guard_connections ENABLE ROW LEVEL SECURITY;

-- Public read/write policies (adjust for production)
CREATE POLICY "Public access" ON guard_users       FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access" ON guard_connections FOR ALL USING (true) WITH CHECK (true);
```

### Get Your API Keys

1. Go to **Project Settings → API**
2. Copy **Project URL** → this is your `SUPABASE_URL`
3. Copy **anon/public key** → this is your `SUPABASE_KEY`
4. Open `js/network.js` and replace:
   - `YOUR_SUPABASE_URL` with your Project URL
   - `YOUR_SUPABASE_ANON_KEY` with your anon key

---

## Step 2 — Push to GitHub

1. Go to **github.com** on your phone
2. Create a new repository called `unrugguard`
3. Set it to **Public**
4. Upload all the project files:
   - `index.html`
   - `css/main.css`
   - `js/app.js`
   - `js/network.js`
   - `js/emergency-numbers.js`
   - `manifest.json`
   - `sw.js`
   - `vercel.json`
5. Commit with message: `Initial UnrugGuard v2.0`

---

## Step 3 — Deploy to Vercel (Free Hosting)

1. Go to **vercel.com** on your phone
2. Sign in with your GitHub account
3. Tap **Add New Project**
4. Select your `unrugguard` repository
5. Leave all settings as default
6. Tap **Deploy**
7. Wait 60 seconds
8. Your app is live at: `https://unrugguard.vercel.app`

Every time you push changes to GitHub, Vercel automatically updates the live site.

---

## Step 4 — Install as PWA on Your Phone

1. Open Chrome on your Android phone
2. Go to your Vercel URL
3. Tap the 3 dots menu (⋮)
4. Tap **Add to Home Screen**
5. Tap **Install**
6. UnrugGuard is now installed like a real app on your phone

---

## Step 5 — Enable Service Worker (Register in index.html)

Add this before `</body>` in `index.html`:

```html
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(() => console.log('UnrugGuard offline ready'))
      .catch(e => console.warn('SW failed:', e));
  }
</script>
```

---

## Step 6 — Custom Domain (Optional, Free)

1. Go to Vercel dashboard → your project → Settings → Domains
2. Add your domain (e.g. `unrugguard.com`)
3. Or use a free subdomain from Vercel: `unrugguard.vercel.app`

---

## Supabase Free Tier Limits

| Resource           | Free Limit      |
|--------------------|-----------------|
| Database size      | 500 MB          |
| Monthly active users| 50,000         |
| API requests       | Unlimited       |
| Realtime connections| 200 concurrent |
| Bandwidth          | 5 GB/month      |

When you exceed 50,000 active GuardNetwork users → upgrade to Pro ($25/month).
SOS and all Phase 1 features remain FREE forever regardless.

---

## Emergency Contact for Support

- WhatsApp: https://whatsapp.com/channel/0029VbCIn4GFsn0bZgzNXG2v
- Telegram: https://t.me/unrugpadofficial

---

*UnrugGuard v2.0 — Built to protect lives worldwide. Powered by Unrugpad.*
