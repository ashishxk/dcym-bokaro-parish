# DCYM Bokaro Parish website

A static website (HTML, CSS, JavaScript). No build step or installs are needed.

## Open it in Visual Studio Code
1. Unzip the folder and open it in VS Code (File > Open Folder).
2. Install the **Live Server** extension, right-click `index.html` and choose **Open with Live Server**.
   (You can also double-click `index.html` to open it in a browser.)
3. An internet connection is needed to load the Google Fonts. Without it the site falls back to system fonts.

## Folder structure
- `index.html`: the page structure and text
- `css/style.css`: colours (see the `:root` variables at the top), layout, animations, responsive rules
- `js/main.js`: the `SITE` object at the top holds the editable content, followed by menu, gallery, form and animation code
- `images/`: `logo.png` and `logo-small.png` (the emblem), `emblem-original.png` (full-size original)

## What to replace
Everything marked "Placeholder" is sample content:
- Contact email, social links, leader roles, activities, events, gallery items and notices: edit the `SITE` object in `js/main.js`
- Address, phone number and map note: edit the Contact section and footer in `index.html`
- About Us wording: edit the About section in `index.html`
- Photos: the gallery and leadership cards show placeholders. Add images to `images/` and change the tiles and avatars to use them. The hero has a comment marking where a background photo can go.
- Verse: Psalm 133:1 (KJV). Check it against the translation you prefer.

## Contact form
It validates the fields, then opens the visitor's email app with the message filled in. To send messages from the site itself, connect a form service such as Formspree or Netlify Forms at the marked comment in `js/main.js`.

## Updating content without code
For parish members to edit events, notices and photos themselves, a content tool such as Decap CMS or Sanity can feed the same data into the `SITE` object.

## Colours (from the emblem)
Blue `#0178FE`, deep blue `#05367A`, red `#D92B26`, gold `#C39E4E`, text grey `#33373D`.
