# Twittagram

<details>
  <summary>Content 📝</summary>
  <ol>
    <li><a href="#about-the-project">About the project</a></li>
    <li><a href="#goal">Goal</a></li>
    <li><a href="#deployment-🚀">Deployment</a></li>
    <li><a href="#stack">Stack</a></li>
    <li><a href="#local-installation">Installation</a></li>
    <li><a href="#views">Views</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#decisions">Decisions</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#known-issues">Known Issues</a></li>
    <li><a href="#author">Authort</a></li>
  </ol>
</details>

## About the project
This was the seventh project for an FSD bootcamp at GeeksHubs Academy. The project consisted in making a front-end with react and redux for project 5 (a social media REST API using js and mongoose).    

## Goal
The project required us to make a front-end application in reactjs and redux. It also required the following views and features:

- Home view
- Register view
- Login view
- Editable profile
- Own posts view
- Edit posts
- Delete posts
- Post detail
- Toggle likes on posts
- Admin view that allows to see posts and users.


## Deployment 🚀
<div align="center">
    comming soon
</div>

## Stack
Technologies employed:
<div align="center">
<a href="https://es.react.dev/">
    <img src= "https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
</a>
<a href="">
    <img src= "https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
</a>
<a href="https://nodejs.org/es/">
    <img src= "https://img.shields.io/badge/node.js-026E00?style=for-the-badge&logo=node.js&logoColor=white"/>
</a>
<a href="https://developer.mozilla.org/es/docs/Web/JavaScript">
    <img src= "https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
</a>
<a href="https://redux.js.org/">
    <img src= "https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white"/>
</a>
 </div>


## Installation
1. Clone the repo: ` $ git clone https://github.com/Eryhnar/twittagram-front.git`
2. ` $ npm install `
3. Clone the back-end `$ git clone https://github.com/Eryhnar/twittagram.git`
4. Create a mongodb database (docker recommended for this)
5. Connect the back to the database. If the .env is set properly, executing the following command within the ide console will connect to the database ``` $ npm run dev ```
6. In the front project (this one) adjust the route (root) in apiCalls to the address of your api (the repo from step 3)
7. Execute `$ npm run dev` in the front end app and open the address in the browser

## Views
comming soon

## Features

- Virtualized timeline: The home/timeline view is virtualized and auto-fetches more results when needed it. 

- Sticky header for easy navigation in at all times. In mobile the header disapears when scrolling down but reapears as soon as you scroll up slightly.

- Responsive design

- Redirects: There is a system to redirect users from routes that don't exist or the do not have access to.

- User uploaded pictures: Users can upload their own pictures both for their profile picture and for posts using cloudinary's widget.


## Credentials
    These are some of the credentials provided in the seeder.
    - user@user.com password: Aa123456 (user)
    - superadmin@superadmin.com password: Aa123456 (super_admin)

## Decisions

- The visual design has been left behind in favor of features temporarily.
- The views where a fetch is made as soon as they are accessed, count with retries on the initial fetch to try and prevent the user from getting no good response.
- Input is checked before making any request to avoid unnecesary calls.
- The design tries to minimize calls to the api.

## Roadmap
- Add users crud to admin view
- Add posts crud to admin view
- Add comments crud to admin view
- Improve the visuals of all views.
- Clean up code.
- Implement search feature to home/timeline
- Reimplement ability to see, create and edit comments in posts.
- Implement following and followers views.
- Implement multi-picture posts.
- Implement character limiter and indicator to create post (caption), create tag, and profile bio.
- Force logout when an invalid token response is received.
- Dynamic and shareable routes for profiles.
- Change the way posts are received for profile/posts

## Known issues
- Pictures upload to the db even if the post is never published or the profile is edited.
- Info buttons on Register do not work on mobile devices.

## Author 

- **Pedro Fernández** - Project Developer
  - [GitHub](https://github.com/Eryhnar) - [LinkedIn](https://www.linkedin.com/in/pedro-fernandez-bel-68a2b9155/)
