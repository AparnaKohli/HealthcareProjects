# Kanban Project

## Business Requirements

An MVP of keeping a track of all the medications for all family members with the time of ingestion. 
The board should take the names of the family memberss. No two names should be alike. 
For each family member, there should be a column with the given medications , their dose, the frequency of the medication and the number of days the medication is to be given.
The name of the medication can include alphabets and numbers. No special characters are allowed.
The dose can be specified in tsp, mg, ml and tablets. The units should be available in a dial.
The frequency can be of 4 types: 1. Once a day 2. Twice a day 3. Thrice a day 4. As and when required 5. Four times a day. 
The user should then be asked the time at which the medication is to be taken. 
If the medication is to be taken once a day, the user should be asked the time at which the medication is to be taken. 
If the medication is to be taken twice a day, the user should be asked the time at which the medication is to be taken. The same time should be selected 12 hours later, but no later than 10 PM. 
If the medication is to be taken thrice a day, the user should be asked the time at which the first dose of the medication is to be taken. The next dose should be 6 hours later and the third dose should be 6 hours later.
The user should also be able to edit or delete a medication or family member.
The scheduled time of the medication, the system should give a notification to the user. The notification should be in Google Calendar/ Apple Calendar and take the form of a task. The duration of the task should be 1 hour. The reminder should be sent 30 minutes before the scheduled time of the medication. 
Optionally, the user should be able to specify whether medication or not

## Technical Details

- Implemented as a modern NextJS app, client rendered
- The NextJS app should be created in a subdirectory `frontend`
- No persistence
- No user management for the MVP
- Use popular libraries
- As simple as possible but with an elegant UI


## Strategy

1. Complete the tasks like a senior engineer would.
2. Before starting, write a small task list of the tasks you plan to do and get it approved before starting the coding.
3. Keep it simple
4. Use popular libraries.
5. Ensure rigorous testing and publish the test results. 
6. For every feature, write edge cases given different segments of users (infants to geriatric population)

## Coding standards

1. Use latest versions of libraries and idiomatic approaches as of today
2. Keep it simple 
3. No over engineering. Keep the README.md file minimal. 