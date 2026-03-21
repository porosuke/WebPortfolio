日本語の説明は [README_JPN.md](./README_JPN.md) をご覧ください。

# Porosuke's Portfolio

## Site

https://porosuke-webportfolio.pages.dev/

## Screenshot

### Profile

![profile](/images/projects/PoroPF/PFProfile-1600.webp)

---

### Skills

![skills](/images/projects/PoroPF/PFSkills-1600.webp)

---

### Projects

![projects](/images/projects/PoroPF/PFProjects-1600.webp)

---

### My Journey

![journey](/images/projects/PoroPF/PFJourney-1600.webp)

---

### Modal

![modal](/images/projects/PoroPF/PFModal-1600.webp)

---

### Mobile

![mobile](/images/projects/PoroPF/PFMobile-1600.webp)

---

### Darkmode

![dark](/images/projects/PoroPF/PFDark-1600.webp)

## Overview

This repository contains the source code for a personal web portfolio site.\
It is implemented using only HTML, CSS, and JavaScript, and features a lightweight, framework-independent architecture.\
The site visualizes project and activity histories in chronological order, and users can dynamically filter the displayed content using tags.  \
Details for each project are displayed in a modal window, designed to allow for intuitive browsing of information, including image galleries. \
Additionally, the project list and event information are built as a data-driven UI dynamically generated from JSON data, featuring a flexible structure that allows the displayed content to be updated simply by modifying the data. \
In terms of design, based on the concept of “sharp and simple,” we aim to balance readability and usability through geometric layouts and a unified style.

## Features

* Timeline Filtering
    You can filter the displayed content by specifying tags. Additionally, the central timeline shaft changes based on the displayed data for Production or Event.
* Dark Mode Support
    Colors are managed using variables, allowing the assigned colors to change based on the selected color mode for easier management. Browser storage (localStorage) is used to remember the previously selected color mode.
* Responsive Design
    Content size, margins, and UI layout adjust to screen width, ensuring readability even on small screens. In particular, the fixed header, project modal, and journey timeline undergo significant visual changes.
* Refinement of Fine-Grained Interactions
    We’ve implemented various enhancements to improve the user experience, such as highlighting when a button is pressed (or has been pressed), increasing animation speed, and adjusting the position of interactive elements like buttons based on their display state to ensure they’re always accessible.
    For the email address copy button, we use JavaScript to change the button text when copying to provide feedback to the user.

## Architecture

This project employs a data-driven UI architecture.

---

### Data Management

Project data, event data, and skill information are defined as JSON data, separating the display content from the code.\
This structure allows the UI to be updated simply by adding or modifying data.\
Additionally, projects are assigned identifiers (slug), and the display content is controlled via lists.\
Similarly, by managing tag information in JSON, we prevent inconsistencies in terminology and input errors.

---

### UI Generation Flow

JSON Data
    ↓
UI Generation via JavaScript
    ↓
DOM Generation

This structure avoids redundant coding of static HTML and enables flexible UI generation.

---

### Component Design

We separate processing by function and manage each as an independent component.\
This preserves the independence of each function while improving maintainability and reusability.

* Project Modal
    Modals are defined as independent templates and displayed by populating them with data.  
    Opening and closing controls are handled entirely within the modal itself, preventing the mixing of different types of processing.

* Skill Badges
    Badges are dynamically generated and positioned to maintain an interlocking layout.  
    By controlling them with JavaScript, the alignment is maintained even when the screen width changes.

* Button Actions
    Buttons are classified into two types: “Content Buttons” and “Standard Buttons,”  
    and their behavior when hovered over or activated is standardized.

---

### Style Design

We define elements such as colors, margins, and animation durations as CSS variables to eliminate hard-coded values.\
Additionally, the UI is unified using a geometric design based on a 15° angle.\
We have encapsulated the polygons used in `clip-path` into functions to manage them in a reusable format.

## Technologies used

* HTML5
* CSS3
* JavaScript
* Cloudflare Pages
* GitHub

## Directory Structure

```
├── css/
│   ├── base.css
│   ├── fixedHeader.css
│   ├── icon.css
│   ├── journey.css
│   ├── journeySection.css
│   ├── journeyTab.css
│   ├── modal.css
│   ├── modalDescription.css
│   ├── modalGallery.css
│   ├── profile.css
│   ├── projects.css
│   ├── sectionHeader.css
│   └── skills.css
├── images/
│   ├── events/
│   ├── header/
│   ├── profile/
│   ├── projects/
│   ├── skills/
│   ├── favicon.ico
│   └── noImage.webp
├── js/
│   ├── dataManager.js
│   ├── eventData.js
│   ├── journey.js
│   ├── journeySection.js
│   ├── journeyTab.js
│   ├── main.js
│   ├── modal.js
│   ├── modalDescription.js
│   ├── modalGallery.js
│   ├── profile.js
│   ├── projectData.js
│   ├── projects.js
│   ├── skillData.js
│   ├── skills.js
│   └── tags.js
└── index.html
```

## Author

Porosuke

## Licence

This project is licensed under the MIT License, see the LICENSE file for details.
