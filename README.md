# `README.md`

  

# Quick Compo

  

## Description

This is an app to manage your daily tasks and activities. The app helps the user to organize, manage and assemble your tasks.

## []User Stories

* **404:** As a user I get to see a 404 page with a feedback message if I try to reach a page that does not exist so that I know it's my fault.

* **Signup:** As an anonymous user I can sign up on the platform so that I can start creating and managing your schedule and tasks.

* **Login:** As a user I can login to the platform so that I can access my profile and start creating and managing tasks.

* **Logout:** As a logged in user I can logout from the platform so no one else can use it.

* **Profile Page**: As a logged in user I can visit my profile page so that I can access the edit page.

* **Add Categories:** As a logged in user I can access the add categories so that I can create a new task.

* **Delete Categories:** As a logged in user I can delete the categories and the tasks inside of each category that I created.

* **Add Tasks:** As a user I can add tasks to a category.

* **Edit Tasks:** As a logged in user I can access the edit tasks so that I can edit the task name and details that I created, besides that the user can set progress status to each task.* 

* **Delete Tasks:** As a logged in user I can delete the tasks inside of each category.

* **View Tasks:** As a user I can see the tasks list for the categories.

  

## Backlog

* Add weather widget
* lottie interactions
* users can bet
* add geolocation to events when creating

  

# Client / Frontend

## React Router Routes (React App)

| Path                         | Component            | Permissions                | Behavior                                                  |
|------------------------------|----------------------|----------------------------|-----------------------------------------------------------|
| `/login`                     | LoginPage            | anon only `<AnonRoute>`    | Login form, navigates to home page after login.           |
| `/signup`                    | SignupPage           | anon only `<AnonRoute>`    | Signup form, navigates to home page after signup.         |
| `/`                          | HomePage             | public `<Route>`           | Home page.                                                |
| `/user-profile`              | ProfilePage          | user only `<PrivateRoute>` | User and player profile for the current user.             |
| `/user-profile/edit`         | EditProfilePage      | user only `<PrivateRoute>` | Edit user profile form.                                   |
| `/categories/add`            | CreateTournamentPage | user only `<PrivateRoute>` | Create new tournament form.                               |
| `/categories`                | TournamentListPage   | user only `<PrivateRoute>` | Tournaments list.                                         |
| `/categories/:taskId`        | TournamentDetailPage | user only `<PrivateRoute>` | Tournament details. Shows players list and other details. |
| `/categories/public/:taskId` | PlayerDetailsPage    | user only `<PrivateRoute>` | Single player details.                                    |
| `/categories/:taskId`        | RankingsPage         | user only `<PrivateRoute>` | Tournament rankings list.                                 |

## Components

Pages:

* LoginPage
  
* SignupPage
  
* HomePage
  
* ProfilePage
  
* EditProfilePage
  
* CreateTournamentPage
  
* TournamentListPage
  
* TournamentDetailsPage
  
* PlayerDetailsPage
  
* RankingsPage
  

Components:

* PlayerCard
* TournamentCard
* Navbar

## Services

* **Auth Service**
  
    * `auth.routes` :
        * `.login(user)`
        * `.signup(user)`
        * `.logout()`
        * `.validate()`
* **User Service**
  
    * `user.routes` :
        * `.updateCurrentUser(id, userData)`
        * `.getCurrentUser()`
* **Category Service**
  * `category.routes` :
        * `.addCategory(tournamentData)`
        * `.getCategories()`
        * `.getOneCategory(id)`
        * `.deleteCategory(id)`
* **Task Service**
  * `task.routes` :
        * `.createTask(id)`
        * `.getTaskDetails(id)`

  

# Server / Backend

## Models

**User model**

```js
{
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
	playerProfile: { type: Schema.Types.ObjectId, ref:'Player' },
  createdTournaments: [ { type: Schema.Types.ObjectId, ref:'Tournament' } ]
}
```

**Tournament model**

```js
 {
   name: { type: String, required: true },
   img: { type: String },
   players: [ { type: Schema.Types.ObjectId, ref:'Player' } ],
   games: [],
   rankings: []
 }
```

**Player model**

```js
{
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  taskName: { type: String },
  status: {
    type: String,
    enum: ["In progress", "Done", "Canceled"],
    default: "In progress",
  },
  deadLine: { type: Date },
  description: { type: String },
}
```

  

## API Endpoints (backend routes)

| HTTP Method | URL                           | Request Body            | Success status | Error Status | Description                                                  |
| ----------- | ----------------------------- | ----------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/profile`               | Saved session           | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup`                | {name, email, password} | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`                 | {username, password}    | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`                |                         | 204            | 400          | Logs out the user                                            |
| GET         | `/api/categories`             |                         |                | 400          | Show all category                                            |
| GET         | `/api/categories/:idCategory` |                         |                |              | Show specific category                                       |
| POST        | `/api/categories`             |                         | 201            | 400          | Create and save a new category                               |
| DELETE      | `/api/categories/:idCategory` |                         | 201            | 400          | delete category                                              |
| GET         | `/api/tasks/:idTask`          |                         |                |              | show specific player                                         |
| POST        | `/api/tasks`                  |                         | 200            | 404          | add task                                                     |
| PUT         | `/api/tasks/:idTask`          |                         | 201            | 400          | edit task                                                    |
| DELETE      | `/api/tasks/:idTask`          |                         | 200            | 400          | delete task                                                  |

  

## Links

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/MaximilianHM/organizer-client)

[Server repository Link](https://github.com/MaximilianHM/organizer-server)

[Deployed App Link](https://timexapp.netlify.app/)

