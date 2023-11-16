+++
title = "Low Gear Thinking"
date = 2023-10-19
draft = false

[taxonomies]
categories = ["work"]
tags = ["solutions architecture", "twilio", "SIP", "problem solving"]

[extra]
lang = "en"
copy = true
math = false
mermaid = false
display_tags = true
truncate_summary = false
+++

If you’re any good, at some point in your career you’ll be asked to solve an annoying, soul-crushing, complex problem. The problem itself is unlikely to be glamorous or involve any kind of mental trickery. In my career, the truly difficult problems have involved a few common elements:

- Legacy systems
- Multiple integrations
- Disparate teams
- Expiring data

# First, a Story
At one point, I was asked to help a Twilio customer obtain telephone numbers in South Sudan for a hotline. Twilio itself didn’t have numbers in South Sudan – it’s a relatively small market and likely not worth the complexity to onboard. However, we were able to integrate with other carriers that did have a presence via Session Initial Protocol (SIP).

SIP is a standardized protocol, but there are nuances to what features are supported depending on the underlying hardware. One of the major issues we encountered was that Twilio’s platform uses a highly dynamic IP range and relies on SIP authentication to prove that we’re the ones placing the call. In contrast, some of the infrastructure we were working with expected a static IP address and didn’t work with the authentication method we could provide.

Calls quickly spiraled in complexity. For one, it was difficult to find someone who knew how the carrier’s IP-PBX configuration worked. Details were to be submitted in a spreadsheet and would be configured several weeks later. Then, there was the matter of testing. We needed to have someone on-the-ground in South Sudan (a relief worker) actually place test calls. Every call we wanted to test relied on scheduling 6 people across 4 timezones, nearly at 90 degree angles to one another around the earth.

# So what did we learn?
The first thing is to break down the problem. I call this low-gear thinking. Like riding a bike up a steep hill with small easy pedal strokes, you will sometimes need to break down complex problems. I’d recommend two specific ways to do this.

First, build a ladder diagram for yourself:
* Label each system involved
* Document each system’s respective inputs and outputs
* Create connections that show what is communicated between each system
* If relevant, note the timings between each action within the system

LucidChart has a good explainer on how to use a ladder diagram. My preference is to actually write one in UML rather than build one graphically. At first, don’t worry about grouping the systems or legibility. Just document everything.

There’s an emotional reason to do a ladder diagram first. Complex problems spark fear and anxiety, and completing a wrote task up front will build confidence. It’s also a great way to get your brain passively thinking about the problem. Once you feel you have a solid foundation representing, you can start cleaning things up. In some cases it makes sense to split a ladder diagram across multiple diagrams, particularly if there are more than 4 systems involved. At that point, you could be doing a lot of horizontal scrolling.

The next step is to actually make a public-facing version of your ladder diagram, most likely a process map. Your process map should be simple enough that it can be explained in 3-5 minutes. You may need multiple depending on your audience. The purpose of the process map is to create clarity for the different teams involved in solving your problem. When you think about a problem for hours at a time, it is extremely easy to leave others behind. A good process diagram will help everyone involved understand at a glance how their system relates to the problem you’re solving for.

# Speed Solves All Problems
So, you think you have an understanding of the systems involved – what next? Run a test and see if you’re able to solve the problem. It probably won’t work out the first time. There are then two improvements to make: figure out what things can be run in parallel, and figure out how to make test tasks faster.

Coordinating a team of 5+ people to meet and test a system is frankly difficult to do more than once a week. Of course, if all parties are highly motivated you can stay on a conference bridge for as long as it takes to solve the problem. But most of the time coordination will be difficult. As a result, you’ll need to look at ways to keep the number of people down. In South Sudan, we were able to find a way to test an incoming call without having a person on-the-ground call-in. One less timezone!

Isolating system components is also a great path to increasing testing speed. To do this successfully however, you’ll need to know precisely what you need to get out of tests for each system. Again in South Sudan, we ended up adding a SIP proxy middleware layer that connected calls to the contact center using the authentication that Twilio required. This part we were able to test on its own, while call-path testing from South Sudan remained a separate setup process.

Last, pay attention to what’s working for communication between the parties involved. Some people thrive on calls while others write well. Still others simply might not be good communicators. A team’s ability to solve a problem frequently comes down to the collective data transfer bandwidth (written, verbal) that can be attained. If someone doesn’t speak your language, find a translator. That may seem like a tall order, but it’s going to be far easier than struggling through repetitive two-ships-passing-in-the-night meetings.

