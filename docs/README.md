# Socialorm

## Idea
Social + Dorm = Socialorm!

It's an app that allows students to create a community within their residence! It gives an opportunity to get to know your fellow neighbour and possibly spark interest and curiousity to meet and create events.

It's a bit of a mash up of Tinder & Facebook but for dorms. The educating body like Make School would provide pre-aggregated data of the students, and thats how students can know about each other.

## Data Structure
So let's just down what we know about reality:
- An institution can have many residences
- A residence can have many students
- A student can create many events
- A student can attend many events
- An event can have many students attending

Just from the looks of it we essentially have:
- One-to-Many relation (Institutions & Residences)
- One-to-Many relation (Residences & Users)
- One to Many relation (Users & Events)
- Many to Many relation (Users & Events)

All of these relations can be found at `app/models/index.js`