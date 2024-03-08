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
## Use Of AI

### Idea generation for Record keeping and Storing Workouts (chatGPT 3.5)

to help me generate ideas for how to achieve the feature for record keeping and saving workouts WITHOUT a login and sign up feature I asked ChatGPT for suggestions

_I used this prompt:_

> I have an application that users can design workouts. i want them to be able to save their workouts and be able to use them across sessions. I DO NOT want a login/sign up system. i want the user to be able to leave the website and still be able to access their history.
> How could I achieve this?

_The response:_

> To achieve this without requiring users to sign up or log in, you can implement a solution using browser cookies or browser-based storage mechanisms. Here's how you could approach it:
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
> By implementing this approach, users can access their workout history across sessions without needing to log in. However, it's important to consider privacy and security implications, such as ensuring that workout data is stored securely on your server and that the cookie mechanism complies with relevant regulations and best practices.

This prompt proved to be pretty useless, cookies are the wrong approach in my opinion (and i just couldn't understand the documentation at all)

This did give me good ideas with how i may be able to keep track of users however, I instead started to develop a system to assign a user a Unique ID and store that information in local storage, this will the be stored with the users workout details to the database (CURRENTLY WORK IN PROGRESS)

### Help in recommending changes to colour choices (chatGPT 3.5)

I found my choice in colours for my activity and rest to be a bit oppressive and could be quite hard on the eyes, i also wanted to implement a warm up and cool down section (as a tick box) for the user to toggle and wanted some recommendations for colours i could use

_this is the prompt i used:_

> I'm currently using #ff5722 as my activity colour, and #007bff as my rest colour, i'm finding them a bit offensive to look at, and can make it hard to read the black text explaining the routine, can you recommend any other colours for me to use instead that will contrast well with black text. And can you also recommend another colour for "Warm up" and "cool down" it can be the same colour.

_the response:_

> Sure, I can suggest some alternative colors for your activity and rest colors, as well as a color for "Warm up" and "Cool down" that will contrast well with black text.
>
> For your activity color, you might want to try a softer shade that is still distinct but less harsh on the eyes. Consider using a light orange such as #ff8c00 or #ff9900.
>
> For your rest color, a lighter shade of blue could be less offensive and easier to read. You might try #66b3ff or #3399ff.
>
> As for the "Warm up" and "Cool down" colors, you can opt for a calming color that complements both the activity and rest colors. A light green like #66ff66 or #99ff99 could work well for this purpose.
>
> Here's a summary of the recommended colors:
>
> - Activity Color: #ff8c00 or #ff9900 (light orange)
> - Rest Color: #66b3ff or #3399ff (light blue)
> - Warm up/Cool down Color: #66ff66 or #99ff99 (light green)
>
> These colors should provide good contrast with black text and be easier on the eyes while still maintaining clarity and distinction. Feel free to adjust the shades if needed to better suit your preferences.

I liked these recommendations and implemented the new colour scheme using #ff9900 and #66b3ff as I found them to be the easiest to look at
