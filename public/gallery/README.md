# Gallery photos

The gallery on the website is built from the folders inside this directory.
Each subfolder is one section on the gallery page. The site reads whatever
images it finds, in alphabetical order, so you do not need to touch any
code to add or remove photos.

## Folders that become sections

- `ewb/` shown as **With EWB**
- `engineering/` shown as **Engineering Projects**
- `survey-camp/` shown as **Survey Camp 2081**
- `convocation/` shown as **Convocation and Graduation**

Section titles and descriptions are set in
`app/gallery/galleryData.ts`. If you only want to add or remove photos
inside the existing four sections, you do not need to edit that file.

## Add photos to an existing section

1. Open the matching folder, for example `public/gallery/ewb/`.
2. Drop in any number of `.jpg`, `.jpeg`, `.png`, or `.webp` files.
3. Save and refresh the website. The new photos appear automatically.

Tip: filenames are sorted alphabetically, so if you want a specific photo
to appear first in the slideshow, name it with a smaller number or letter
(for example `01-first.jpg`, `02-second.jpg`).

## Remove photos

Delete the file from the folder. That is all. The website rebuilds the
slideshow without it.

## Add a brand new section (new folder)

1. Create a new folder inside `public/gallery/`, for example
   `public/gallery/workshops/`.
2. Drop the photos into that folder.
3. Open `app/gallery/galleryData.ts` and add an entry to the
   `categoryConfig` list:

   ```ts
   {
     key: "workshops",
     folder: "workshops",
     label: "Workshops",
     description: "Short description shown under the heading.",
   },
   ```

4. Save the file. The new section now shows up on the gallery page.

## Delete a whole section

Either delete the folder (the site automatically hides any section that
has no images) or remove its entry from `categoryConfig` in
`app/gallery/galleryData.ts`.

## Notes

- Keep images under about 2 MB each so the page loads fast. If a photo
  is larger, the Next.js image pipeline still optimises it, but the
  initial download is slower.
- Supported formats: JPG, JPEG, PNG, WEBP, GIF.
- Files starting with a dot (like `.DS_Store`) are ignored.
- After adding or removing photos in production, run `npm run build`
  again so the new file list is included in the static build.
