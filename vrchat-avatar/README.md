# Sable — a free VRChat avatar build

A no-cost path to a cute kemonomimi (catgirl) VRChat avatar for PC/PCVR, starting
from zero — then pushed as far as Poiyomi shading and world lighting will take it.
The model is free; the polish is where the hours go.

`building-sable.html` is the whole thing: the character design brief (palette,
features, the specific hex values to type into VRoid's color pickers) followed by
a phase-by-phase build checklist that ticks off as you go.

Open it in a browser, or serve it locally:

```bash
python3 -m http.server 8000     # then visit http://localhost:8000/vrchat-avatar/building-sable.html
```

## The route, in short

1. **VRoid Studio** (free) — design the character with sliders and presets.
2. **Free BOOTH cat-ear preset** + VRoid's built-in cat tail (v1.27.0+).
3. **Export VRM.**
4. **VRChat Creator Companion** (free) — installs Unity 2022.3.22f1 and the Avatar SDK.
5. **VRM Converter for VRChat** (¥0) — converts the VRM into a VRChat avatar and
   turns VRM spring bones into PhysBones.
6. **Poiyomi / VRCFury / Gesture Manager** (all free) — polish and test.
7. **Shading** — Anisotropics on hair, rim lighting, matcaps, specular. The
   highest-leverage step in the build.
8. **Upload.**
9. **Lighting and photos** — a lighting rig plus dark, high-contrast worlds. This
   happens in-game, so it comes after the upload and never really finishes. A
   large share of any good avatar photo is the room, not the mesh.

## The one real blocker

Every tool is free. The thing that stops people is the VRChat account: **Visitor
rank cannot upload avatars.** You need **New User**, which takes email
verification plus a few hours of actual playtime. Start that early — it runs in
the background while you build.

## What this does and doesn't achieve

A free VRoid base with serious shader and lighting work looks dramatically better
than the same base straight out of the converter. It will not match a bought or
commissioned model. Shading fixes flat lighting, dead hair, missing edge
separation and plastic skin. It does not fix mesh topology, hair card geometry,
face proportions or body sculpt — those are modeling.

## Note on performance rank

VRoid models are heavy and usually import at **Poor** rank. The VRM Converter
ships a *Merge meshes and submeshes* tool that collapses material count, which is
normally the main offender.
