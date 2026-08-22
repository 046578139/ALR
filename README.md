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
| `https://formspree.io/f/your-form-id` | `index.html` | Real form endpoint (see below) |

Quick way to find the contact details:

```bash
grep -rn "555) 010-2345\|aidenslawnrepair.com" index.html js/main.js
```

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

## The logo

`assets/logo.svg` is a vector rebuild of the wordmark, so it stays sharp at any
size and loads fast. To use the original cartoon artwork instead, drop the file
in as `assets/logo.png` and update the three `<img src="assets/logo.svg">`
references in `index.html` (header, hero card, footer).

## Hosting

Static files, so anything works. Free options that deploy straight from this
repo: GitHub Pages (Settings → Pages → deploy from branch), Netlify, Cloudflare
Pages, or Vercel.
