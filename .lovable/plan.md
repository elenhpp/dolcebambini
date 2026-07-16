## Goal

Every product in every category (boys, girls, accessories, silk, communion) opens a detail page with a multi-photo gallery, and the admin page lets you upload additional photos from your computer instead of only pasting URLs.

## 1. Detail pages for all categories

Create three new route files that mirror the existing `boys.$code.tsx` / `girls.$code.tsx`:

- `src/routes/accessories.$code.tsx`
- `src/routes/silk.$code.tsx`
- `src/routes/communion.$code.tsx`

Each renders `<ProductDetail category="accessories|silk|communion" code={code} />` with a proper `head()` title/description per category.

## 2. Make every category card clickable

In `src/components/ProductCard.tsx`, expand `DETAIL_CATEGORIES` from `{boys, girls}` to include `accessories`, `silk`, `communion` so all cards link to their detail page.

Confirm the category listing routes (`accessories.tsx`, `silk.tsx`, `communion.tsx`) pass `category=` into `CategoryPage` → `ProductCard` (accessories already does; verify silk/communion and add if missing).

## 3. Photo uploads in admin (from your computer)

Today `/admin` only accepts image URLs. Add real uploads:

- Create a public Cloud storage bucket `product-images` with RLS: public read; insert/update/delete restricted to admins (`has_role(auth.uid(), 'admin')`).
- In `src/routes/admin.tsx`, next to each image row and next to the "Add image" button, add an "Upload" button using `<input type="file" accept="image/*">`. On selection:
  1. Upload to `product-images/{category}/{code}/{uuid}-{filename}` via the browser Supabase client.
  2. Take the returned public URL and store it in the same `images` array that already syncs to `product_overrides` (so nothing downstream changes).
- Show upload progress / error state inline, and keep the existing "paste URL" input as a fallback.

## 4. Detail page gallery (already works — small polish)

`ProductDetail` already renders the main image plus a thumbnail strip when `gallery.length > 1`. Small tweaks:

- Show the gallery even when there's only the base image + uploads (already does).
- Ensure thumbnails wrap nicely on mobile (grid cols already responsive).

No other changes to `ProductDetail` are needed — as soon as admin saves more images, the detail page picks them up via `useOverrides()`.

## Technical notes

- Storage bucket creation uses the `supabase--storage_create_bucket` tool (public), plus a migration for `storage.objects` RLS policies scoped by `has_role`.
- Uploads use the existing browser `supabase` client; admin is already gated by the admin check on `/admin`, so only admins reach the upload UI.
- No schema change to `product_overrides` — the uploaded file's public URL is stored in the existing `images` text array.
- `resolveImage()` already passes through absolute URLs, so Storage URLs render without extra work.

## Out of scope

- Reordering/drag-and-drop of gallery images (can add later if you want).
- Deleting the underlying file from Storage when an image row is removed from the override (removing the row hides it from the site; the object stays in the bucket).
