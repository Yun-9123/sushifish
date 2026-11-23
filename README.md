# Sushi Fish

A responsive website for the sushi restaurant **Sushi Fish**. It presents opening hours, the menu, restaurant information, and a form that prepares a table request in Gmail.

## Preview

The website includes:

- A home section with restaurant and sushi imagery
- A clear, responsive menu
- Opening hours and location information
- A table request form with date, time, and guest count
- Automatic preparation of a prefilled Gmail draft
- Desktop, tablet, and mobile layouts
- Improved keyboard navigation, reduced-motion support, and a skip link

## Menu

| Category | Options | Price |
| --- | --- | ---: |
| Phillas | Avocado, Mango, Cucumber | EUR 4.00 |
| Fish Rolls | Salmon Avocado, Tuna Mango | EUR 7.00 |
| Duck Roll | Duck Roll | EUR 7.00 |

## Local Preview

The website is built with static HTML, CSS, and JavaScript and can be opened directly in a browser:

```text
index.html
```

For a more reliable local preview, start a simple web server:

```powershell
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Reservation Form

The form validates the date and time locally. Requests must be made during **10:00 AM–9:00 PM**, and the selected time cannot be in the past.

On submission, the page opens a Gmail link with the recipient, subject, and message prefilled. No data is sent automatically to a server; the email must be sent manually in Gmail.

## Technologies

- HTML5
- CSS3
- JavaScript
- Bootstrap 4
- jQuery
- Parallax.js

The page uses embedded SVG symbols and does not require a Font Awesome icon font.

## 🌐 Live Website

[Visit SushiFish](https://your-project.vercel.app)

## 🚀 Deployment

This website is deployed on Vercel and connected
to GitHub for automatic deployments.

## Project Structure

```text
.
├── index.html
├── README.md
├── css/
│   ├── bootstrap.min.css
│   └── templatemo-style.css
├── img/
│   ├── bg-01.jpg
│   ├── sushi-platter.jpg
│   └── sushi-rolls.jpg
├── js/
│   ├── bootstrap.min.js
│   ├── jquery.min.js
│   ├── parallax.min.js
│   └── restaurant.js
└── fontawesome-LICENSE.txt
```

## Customization

- Page text and menu: `index.html`
- Colors, spacing, and responsive layouts: `css/templatemo-style.css`
- Opening hours, Gmail link, and form logic: `js/restaurant.js`
- Images: `img/`

## Notes

- The restaurant is open daily from **10:00 AM to 9:00 PM**.
- The listed location is **Bahnhof Pfarrkirchen**.
- The existing site uses the parallax structure and base layout of the **TemplateMo Parallo template**.
- Some embedded SVG icons and design elements are adapted for this project.
- Serving suggestion images link to Unsplash and include attribution in the page footer.
