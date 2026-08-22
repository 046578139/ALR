# Aiden's Lawn Repair — Website

A fast, responsive, one-page site for a small lawn-care business. Cartoon theme
— thick outlines, hard drop shadows, bright turf greens — with copy that leans
into the joke in the name while keeping the actual services clear.

Plain HTML, CSS and JavaScript. No build step, no frameworks, no dependencies.

## Files

```
index.html          All page content
css/styles.css      Styles (palette and cartoon outlines taken from the logo)
js/main.js          Mobile nav, form validation, form submission
assets/logo.svg     Logo wordmark
assets/favicon.svg  Browser tab icon
```

## Running it

Open `index.html` in a browser, or serve it locally:

```bash
python3 -m http.server 8000     # then visit http://localhost:8000
```

## Before going live — things to replace

These are placeholders, and most appear in more than one spot, so search and
replace across the whole project:

| Placeholder | Where | Replace with |
|---|---|---|
| `(555) 010-2345` and `tel:+15550102345` | `index.html`, `js/main.js` | Real phone number |
| `hello@aidenslawnrepair.com` | `index.html`, `js/main.js` | Real email address |
| `Mon–Sat, 7am–7pm` | `index.html` | Real hours |
| City names in the **Service Area** list, and "15-mile radius" | `index.html` | Real towns and radius |
| Reviews (Dana R., Marcus T., Priya S.) | `index.html` | Real customer reviews |
| `<p class="placeholder-note">` under the Reviews heading | `index.html` | Delete it once the reviews are real |
| `https://formspree.io/f/your-form-id` | `index.html` | Real form endpoint (see below) |

Quick way to find the contact details:

```bash
grep -rn "555) 010-2345\|aidenslawnrepair.com" index.html js/main.js
```

The three reviews are written-in examples, not real customers, so the page
labels them "Sample reviews — swap in real ones before launch." Replace them
with real quotes and delete that label. Publishing invented testimonials as
though they were genuine is worth avoiding on a real business site.

The strip under the hero ("one very green mower", "0 lawns lost so far") is
deliberately a joke rather than real statistics, so there's nothing to verify or
substantiate there. Swap it for real numbers only if you have them.

## Connecting the estimate form

The form posts with `fetch` and expects a JSON response. Until it's connected,
submitting shows a message pointing visitors to the phone and email instead of
silently pretending the message was sent.

To connect it with [Formspree](https://formspree.io) (free tier is fine):

1. Create a form and copy its endpoint.
2. In `index.html`, replace the `action` on `<form id="quoteForm">`.

Any endpoint that accepts a `POST` of form data and returns a 2xx works —
Formspree, Netlify Forms, Basin, or your own handler.

The form also validates before sending: required fields, a real-looking email,
and a 10-digit phone number, with inline messages under each field.

## Adding the cartoon illustration

The hero is already built around the full illustration (Aiden on the mower). It
just needs the file:

1. Save the image as `assets/hero-logo.png`.
2. Reload the page. That's it — no code changes.

Until that file exists, the hero falls back to the vector wordmark
automatically, so the page never shows a broken image. The swap is handled by
`js/main.js`; the fallback also drops the inner photo frame, since a wordmark
isn't a photo.

A square image (roughly 1:1, like the original) fits the slot best. Anything
from about 800×800 up to 1200×1200 is plenty — bigger just costs load time.

Once the PNG is in place, it's also a better social-share image than the current
SVG. Point `og:image` at it in `index.html`:

```html
<meta property="og:image" content="assets/hero-logo.png">
```

## The wordmark

`assets/logo.svg` is a vector rebuild of the wordmark used in the header and
footer, so it stays sharp at any size and loads fast. It's text only — it
doesn't include the mower illustration. To swap in raster artwork there too,
drop it in and update the `<img src="assets/logo.svg">` references in
`index.html`.

## Hosting

Static files, so anything works. Free options that deploy straight from this
repo: GitHub Pages (Settings → Pages → deploy from branch), Netlify, Cloudflare
Pages, or Vercel.
