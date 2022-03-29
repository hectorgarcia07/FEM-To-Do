# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- Drag and drop to reorder items on the list

### Screenshot

![Dark Desktop View](./screenshots/DarkDesktop.png)
![Light Desktop View](./screenshots/LightDesktop.png)
![Dark Mobile View](./screenshots/DarkMobile.png)
![Light Mobile View](./screenshots/LightMobile.png)

### Links

- Solution URL: [GitHub](https://github.com/hectorgarcia07/FEM-To-Do)
- Live Site URL: [GitHub Pages](https://hectorgarcia07.github.io/FEM-To-Do/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow

### What I learned

This project was quite interesting since it required me to learn a few interesting css tricks such as making custom checkbox buttons that should also be accessible for those who rely on keyboard navigation. I also managed to learn how to incorporate a theme switcher that can be toggled by a button and display a default theme based on users' system settings.
Another challenge was incorporating a drag and drop feature where it should rearrange the list items.
The interesting part of this challenge was saving the users ‘todos’ via localstorage. The user can see their ‘todos’, mark them as complete, delete them, rearrange them, and if they close the browser and reopen it, it will still be visible and will be in the order that the user left it.

### Continued development

For future development, I would like to transform this into a full stack application. I will rework the front end and add React.js to it. I will also use Express.js to handle routing and MongoDB to save users and their ‘todo’ data.

### Useful resources

- [Theme switcher](https://medium.com/swlh/dark-mode-using-css-variables-cf065a7fa133) - A pretty good resource that shows how to create a theme switcher.
- [How to use gradients as a border](https://codyhouse.co/nuggets/css-gradient-borders) - A challenge that I had was using gradients as a border color. This blog helped me acheive that goal.
- [Drag and drop functionality](https://webdevtrick.com/html-drag-and-drop-list/) - A great source that shows how to create a drag and drop feature using HTML5 Drag and drop API
- [Custom Checkbox](https://www.leenix.co.uk/news-css-tricks-using-images-as-checkboxes-in-your-html-forms-19) - This was useful in creating a custom checkbox that acts and responds to a users check toggle
- [Custom Checkbox that are accessible](https://codyhouse.co/blog/post/custom-accessible-radio-checkbox-buttons-vertical-alignment) - Another good source but goes into depty in how to make your custom checkbox accessible for those who rely on keyboard navigation.

## Author

- GitHub - [Hector's GitHub](https://github.com/hectorgarcia07)
- Frontend Mentor - [@hectorgarcia07](https://www.frontendmentor.io/profile/hectorgarcia07)
- Twitter - [@jdbjfl](https://www.twitter.com/jdbjfl)
