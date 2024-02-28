# HIIT UP2109969

## Key features

### Quick Start

The quick start feature allows a user to quickly start a preset workout of just time. The user can adjust the default activity and rest time using the "advanced options" tab as well as adjusting the amount of sets.

### Visual Cues

The application features a visual background change to differentiate between "Activity" and "Rest" as well as giving an update on the amount of sets remaining

### Final Key Feature Name/Description.

Words.

## AI

### Idea generation for Record keeping and Storing Workouts

to help me generate ideas for how to achieve the feature for record keeping and saving workouts WITHOUT a login and sign up feature I asked ChatGPT for suggestions

_I used this prompt:_

> I have an application that users can design workouts. i want them to be able to save their workouts and be able to use them across sessions. I DO NOT want a login/sign up system. i want the user to be able to leave the website and still be able to access their history so no local storage.
> How could I achieve this?

_The response:_

> To achieve this without requiring users to sign up or log in, and without relying on local storage, you can implement a solution using browser cookies or browser-based storage mechanisms. Here's how you could approach it:
>
> - **Generate a Unique Identifier**: When a user creates a workout, generate a unique identifier (such as a UUID or a random string) for that workout.
>
> - **Store Workout Data on the Server**: Whenever a user designs a workout, send the workout data to your server and associate it with the unique identifier. You can use a simple backend system to handle this, even something as lightweight as a serverless function.
>
> - **Set a Cookie**: After the workout is saved on the server, set a cookie in the user's browser containing the unique identifier for that workout.
>
> - **Retrieve Workout Data**: When the user returns to your website, check for the presence of the cookie. If the cookie exists, retrieve the unique identifier from it. Then, use this identifier to fetch the corresponding workout data from your server and populate the user's workout history.
>
> - **Display and Manage Workouts**: Display the user's saved workouts in the interface, allowing them to edit, delete, or create new workouts as desired. Whenever a change is made, update the data on the server and potentially update the cookie if needed.
>
> - **Expiration and Clean up**: You may want to implement mechanisms for cookie expiration or clean up of old workout data on the server to manage the user's workout history over time.
>
> By implementing this approach, users can access their workout history across sessions without needing to log in or rely on local storage. However, it's important to consider privacy and security implications, such as ensuring that workout data is stored securely on your server and that the cookie mechanism complies with relevant regulations and best practices.
