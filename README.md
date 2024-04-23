# UP2109969

## HIIT Coursework

### How to Start/Install

To start the application, follow these steps:

**Requirements**

- Node.js
- npm (Node Package Manager)

If you don't have Node.js and npm installed, you can download them from the official Node.js website: [https://nodejs.org](https://nodejs.org)

1. Clone the repository to your local machine using the following command:

   ```bash
   git clone https://github.com/RubenTanner/HIIT-Workout-Coursework.git
   ```

2. Navigate to the project directory:

   ```bash
   cd HIIT-Workout-Coursework
   ```

3. Install the dependencies by running the following command:

   ```bash
   npm i
   ```

4. Once the dependencies are installed, you can start the application with the following command:

   ```bash
   npm start
   ```

5. Open your web browser and navigate to `http://localhost:8080`

That's it!

## Key feature

### Quick Start

The quick start feature allows a user to quickly start a preset workout of just time. The user can adjust the default activity and rest time using the "Options" tab as well as adjusting the amount of sets.

There is also a count in of 3 seconds to allow the user to get ready when the timer first starts OR when it is started after a pause.

### Visual Cues

The application features a visual background change to differentiate between "Activity" and "Rest" as well as giving an update on the amount of sets remaining

The Visual queues also indicate warm up/cool down times at the end of a complete workout

### Custom HIIT Workout

I have also created another page, with the same styling as the **Quick Start** feature. This allows the user to create their own workouts, including a custom title (to replace "Activity" which would normally display), a description of the workout, the ability to adjust individual workouts activity and rest time, the ability to adjust how many sets are there for each individual workout.

This can be found by pressing the "Custom" button on the **Quick Start** page found below the Options button

### View Workout History

I have also made on the custom page the ability for the user to see their workout history, this includes the name, description and timings in seconds for the workout. I have also included the ability for the user to see the ID for a potential other feature (the code is already in the start timer i just need to add the ui elements and work some more on logic) where the user can add previous workouts to the queue

This can be found by navigating to the custom page and clicking the **View Workout History**

### Upcoming Workout

The user can see the next workout coming up on the last set of their current workout. This is displayed below the set countdown and gives the Name and Description of the workout.

This can be found after a multi-workout event is made AND the user is on their final set.

### Responsive design

I have tried (and semi succeeded) to make the application as accessible as possible, using larger buttons so its easier to press on phones, and using c
CSS FlexBox so styles are consistent on phone and pc. Using FireFox's Responsive Design Mode, I have tested my **Quick Start** section and its proved to be displaying well

![Quick Start](/README-images/Screenshot%202024-03-11%20at%2016.54.37.png "Quick Start")

### Source Control

While not a key feature per say, it has been incredibly important during the development to know what im focused on, and if I hit a wall on one area it means I can go to a separate development area without effecting the working branch.

I'm using GitHub to host my work, its a private repo so if you do want access please message me on discord -> phatyikes

The link to the repo -> **[here](https://github.com/RubenTanner/HIIT-Workout-Coursework)**

1. All Commits are named
   ![Commits](/README-images/Screenshot%202024-03-12%20at%2009.16.58.png "Commits")

2. I use github issues to track things not working
   ![Issues](/README-images/Screenshot%202024-03-25%20at%2011.28.07.png "Issues")

3. I even PR my work to review what ive done
   ![Pull Requests](/README-images/Screenshot%202024-03-25%20at%2011.30.41.png "Pull Requests")
   _I even denied this Pull request due to an issue i found (and raised in issues)_

4. Use of rules
   I make use of the rules that can be setup on github to maintain security of branches. With me inviting collaborators (the moderators) to my project i wanted to ensure that any changes would have to be reviewed by me, and that force pushing to the main branch wasn't possible
   ![Rules](/README-images/Screenshot%202024-04-02%20at%2012.00.53.png "Rules")
   You can see by the image below that when i try and commit to main it doesn't actually let me!
   ![Rules In Effect](/README-images/Screenshot%202024-04-02%20at%2012.32.30.png "Rules In Effect")

## Future Plans

### github actions

I started experimenting with the idea of using github actions during the coursework (and still may) but i just don't know enough about them to be fully confident with my ability to implement them to the best of my ability.

### full database

I could achieve what i wanted too without needing a database for this coursework, and while not ideal, id much rather use a framework to help with the schema and implementation of the database as im just not as confident in my ability to keep it secure and efficient.

Anyway, i want to in future add a database so that users can move devices and not have to know their user ID

### Sharing/Social media implementation

I would love to implement social media sharing for this application, however i struggled to find an easy way to do it, and really, i think i just ran out of time :(

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

I liked these recommendations and implemented the new colour scheme using #ff9900 and #66b3ff as I found them to be the easiest to look at _(see this commit https://github.com/RubenTanner/HIIT-Workout-Coursework/commit/78f2c90dadc56922637a244b7f15ffa2eb9eeafa)_

### Use of copilot to assist in documentation

i have written my own documentation for the majority of the project, however i struggled explaining functions fully, i ran copilot in an inline chat at the top of each function and used the /doc command.

most functions (such as on main.js) didn't update from what i had already written, but most got extra detail that will aid external users understanding of the source code

This has allowed functions to have more context when hovered over making my code more maintainable on a whole.

_(you can see the commit with all the changes here https://github.com/RubenTanner/HIIT-Workout-Coursework/commit/5fca8ac149c11fad134ae9b0acc4fcaeedd1a80d)_

##### _(the repo is currently private if you wish to gain access please message me on Discord -> phatyikes)_
