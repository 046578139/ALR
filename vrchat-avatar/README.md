# Sable — a free VRChat avatar build

A complete, no-cost path to a cute kemonomimi (catgirl) VRChat avatar for PC/PCVR,
starting from zero — no Blender, no marketplace purchase, no ripped models.

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
7. **Upload.**

## The one real blocker

Every tool is free. The thing that stops people is the VRChat account: **Visitor
rank cannot upload avatars.** You need **New User**, which takes email
verification plus a few hours of actual playtime. Start that early — it runs in
the background while you build.

## Note on performance rank

VRoid models are heavy and usually import at **Poor** rank. The VRM Converter
ships a *Merge meshes and submeshes* tool that collapses material count, which is
normally the main offender.
