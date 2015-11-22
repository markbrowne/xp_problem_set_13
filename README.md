# Requiring authentication

## Introduction

Most applications have these pesky, ill-intentioned creatures known as users. Users, while the life blood of your application, can also be the source of [many troubles](https://xkcd.com/327/). In this application we won't worry so much about security concerns like SQLi - in part because there is no chance of one (we aren't using SQL) - and will instead just focus on registering users and giving them access to a profile page.

***This application should use TDD from start to finish.*** From an architecture standpoint, this application should use Express and [Mongoose](http://mongoosejs.com/).

## The Work

For this exercise, we will build authentication and then CRUD a full resource that lives behind the authentication.

Suppose we wanted to build an internal management tool for the proprietor of multiple hotels (think [Hilton](http://static1.businessinsider.com/image/54416fcb69bedd9208b79130/how-the-hilton-family-built-an-international-hotel-brand-and-got-super-rich.jpg) if need be). In this application, which will be run behind a firewall on premise, users may come and register, then begin to add additional hotels to the application. Once a large enough database of existing hotels has been built up, another team will come and build a few applications to surface this data to customers.

### Story 0

_Users see a homepage_

As a guest user, I should see a home page that includes two links, "Sign Up" and "Sign In", so that I can register as a user of the application.

The following wireframe is provided as a reference:

![Hotel List Home Page](https://galvanize.mybalsamiq.com/mockups/3832977.png?key=673f6a624bf4225c722b895eb88891d24cf0da26)

When you finish your work, make a commit and push it to the remote repository using `git push origin master`.

_Acceptance Criteria_

1. A guest who clicks on "Sign Up" is taken to a page with the path `/sign-up`
1. A guest who clicks on "Sign In" is taken to a page with the path `/sign-in`

### Story 1

_Guest user can register_

As a guest user, after clicking the "Sign Up" link from the home page, I should see a registration form at `/sign-up`, so that I may supply the application with the requisite information and create a user.

_Acceptance Criteria_

1. A guest who successfully registers is taken to the Hotels index view
1. A guest cannot register without an email or password
1. A record of the user should be stored in the database
1. A guest who does not enter a matching password and password confirmation is not registered

The following wireframe is provided as a reference:

![Hotel List Registration Page](https://galvanize.mybalsamiq.com/mockups/3832979.png?key=b3fc5d929b84a00bee69b74904efd449080ee704)

### Story 2

_Authenticated user sees a hotel index view_

As an authenticated user, after signing in, I should see a list of all hotels currently stored in the database, so that I can see if the hotel I am interested in exists already or needs to be created.

_Acceptance Criteria_

1. When an authenticated user visits `/hotels` they should see a lot of all hotels in the database
1. When an unauthenticated user visits `/hotels` they should get a 404 HTTP Status Code as the response

The following wireframe is provided as a reference:

![Hotel List Index](https://galvanize.mybalsamiq.com/mockups/3833092.png?key=065cd8e029a37424fe37c92ac3cea3a77bf4b202)

### Story 3

_Hotel index view links to new hotel page_

As an authenticated user, when looking at the hotel index page, there should be a link to the "New Hotel" page, so that I may create a hotel that I notice is missing from the list.

_Acceptance Criteria_

1. From hotels index (`/hotels`) the user should have a link to `/hotels/new` with the text "New Hotel".

The design for this may be found on the Wireframe for the hotels index (previous story).

### Story 4

_New hotel page_

As an authenticated user, I should be able to create a new hotel, so that I can continue to help our company build up our hotel inventory list.

_Acceptance Criteria_

1. From new hotel page (`/hotels/new`) the user should be able to fill in a form for the hotel's data. The fields for a hotel are `name`, `address`, `city`, `stateOrProvince`, `country`, `franchiseNumber`, `website`, and `emergencyContactEmail`.
1. Validations rules:

  1. Every field is required
  1. `franchiseNumber` must be unique
  1. `website` must be unique
  1. `emergencyContactEmail` must be unique
1. When a user submits the New Hotel page form successfully (e.g. with no validation errors), they are redirected to the hotels index (`/hotels`).
1. When a user submits the New Hotel form with validation errors, the Hotel is not persisted and instead a list of errors is shown.

The following wireframe is provided as a reference:

![Hotel List New](https://galvanize.mybalsamiq.com/mockups/3833109.png?key=f983799fcabd3cfa489595efaafd78e4274783f4)

### Story 5

_Hotel show view_

As an authenticated user, I should be able to click on the name of any hotel listed on the hotels index (`/hotels`) and be taken to a specific show page for that hotel, so that I can see more details about that hotel.

_Acceptance Criteria_

1. The show view for a hotel should statically render all information about a given hotel.
1. Show view should contain a link to edit the hotel with the text "Edit this hotel", that links to `/hotels/{this hotel's id}/edit`.

### Story 6

_Hotel edit view_

As an authenticated user, I should be able to click on the "Edit this hotel" link and be taken to a form that allows me to edit the hotel, so that I can make sure the information is up to date.

_Acceptance Criteria_

1. When a user submits the Edit Hotel form with validation errors (as described in the story for a new hotel), the Hotel is not persisted and instead a list of errors is shown.
1. When a user successfully submits a valid update, they are redirected to the hotels index (`/hotels`).

The design for this page should be similar to the wireframe used for the new hotel page.

### Story 7

_Authenticated users can sign out_

As an authenticated user, I should be able to click a "Sign Out" link on any page and be returned to the Hotel List home page (`/`).

_Acceptance Criteria_

1. From any page that requires authentication (aka anything related to Hotel CRUD), a user is able to sign out.
1. The user should no longer be authenticated and receives a 404 trying to visit `/hotels`.

The Sign Out link has been included in all wireframes that assume an authenticated user.

### Story 8

_Existing users can sign in_

As an existing user of the application, when I return to it I should be able to sign in, so that I can continue doing my job inventorying hotels.

_Acceptance Critera_

1. An existing user is able to sign in by clicking the "Sign In" link from the home page and then filling in the Sign In form.

Use the wireframe for user registration as a guideline for what the sign in form should look like

The design for this should be similar to the registration form, but without password confirmation.

### Story 9

_Unauthenticated users cannot see Hotel CRUD pages_

As an authenticated user, I should not be able to go around authentication by simply visiting `/hotels` in the browser, so that the listing of Hotels remains only in the hands of registered users. Instead I should be returned a 404 HTTP Status Code.

_Acceptance Criteria_

1. If an unathenticated user hits `/hotels` in their browser, they are returned a response with an HTTP status code of404.

## Setup

Fork and clone this repository; the fork button lives in the top right corner of this page, after clicking it you will be taken to your own copy of this repository: that is where you will find the appropriate clone URL.

Set up an Express application in this directory so that you may push it up as you make commits for each body of work.

## Stretch Goals

1. Improve the UX of this application.
1. Create a fun 404 page.
1. [Epic] Refactor entire application beyond authentication (e.g. CRUD of Hotels) to be a Single Page Application (SPA) using React.
