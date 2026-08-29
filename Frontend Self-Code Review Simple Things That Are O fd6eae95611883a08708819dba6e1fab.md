# Frontend Self-Code Review: Simple Things That Are Often Overlooked Before Creating a Pull Request

# Frontend Self-Code Review: Simple Things Often Overlooked Before Creating a Pull Request

## Background

For over 3 years as a software developer, I’ve been fortunate to work in several environments that implement a *code review* process. At first, I didn’t really understand what exactly needed to be considered during that process.

I assumed that as long as a feature’s core functionality worked properly, the development work was complete.

I often received questions from reviewers that initially didn’t seem directly related to functionality. For example, why was the import order arranged that way, was the variable name clear enough, or:

> “Can this component be broken down?”
> 

At first, I thought questions like that were just about *coding style*. But the more I worked in a team and saw how the application actually ran in production, the more I began to understand the reasoning behind them.

The code we write isn’t just meant to be read by ourselves. It’s likely to be modified, fixed, expanded, or even analyzed by other developers months or years after we’ve written it.

From that point on, my perspective on *code reviews* began to change.

## Why Is Self-Code Review Important?

After gaining experience developing applications as part of a team and dealing directly with applications already running in production, I started asking myself a different question:

> “If other developers have to modify this code later, will they be able to understand it easily?”
> 

That’s when I started making it a habit to perform **a self-code review** before creating a Pull Request.

For me, *self-code review* isn’t a process for analyzing every line of code in as much detail as possible.

It’s an opportunity to pause for a moment after finishing a feature, then look back at the code we’ve just written from a different perspective.

Especially when chasing a deadline, it’s easy to think:

> “The important thing is to get it working first; the reviewer will check it later.”
> 

The problem is, that mindset becomes dangerous once the code goes into production. We can’t always rely on the assumption that another developer will fix it later if a problem arises.

That’s why, before the code reaches the reviewer, there are at least a few things I usually check myself.

## 1. It’s Not Done Just Because the Functionality Works

The first thing I do is step away from *the Happy Path* for a moment.

If the app runs normally, the data displays correctly, the buttons work, and the UI matches the requirements, the development might seem complete.

But the application doesn’t just run under normal conditions.

For example, when making an API request, there are at least a few conditions to consider:

- successful response
- failed response
- no response or the request takes too long
- received data is `undefined` or `null`
- the user performs the action repeatedly
- Conditions between states have become inconsistent

Therefore, in *my self-code review*, I ask:

> "How does it behave when something doesn’t go as expected?"
> 

This simple question often helps uncover issues that go unnoticed when we’re only testing the normal flow.

## 2. Clean Up Unnecessary Code

After making sure the flow is correct, I usually go back and review the code that was left behind during the development process.

For example:

- ``console.log()` ` for debugging
- imports that are no longer used
- variables that are no longer used
- functions or components that are no longer called
- duplicate code
- Workarounds that are no longer needed

Things like this don’t always cause bugs. But if left unchecked, the code becomes harder to read, and the next developer will have to spend time understanding something that’s actually no longer needed.

If I find duplicate code, I’ll also consider whether that section should be turned into a function, utility, or shared component.

But I don’t believe that all code that looks similar should be abstracted away immediately.

Creating too many abstractions can also make the code harder to understand.

So the question is:

> “Will maintenance really be easier if this code is turned into a shared component?”
> 

If the answer is no, it might be better to keep it simple.

## 3. Check the State

One of the mental models I use when developing is to think **of bugs as states that shouldn’t occur, but that can happen.**

For example, if an API call succeeds, the app should display the data or a success message. If the API call fails, the app should have a state that reflects that condition and provide appropriate feedback to the user.

The problem is, when developing a feature, we tend to focus on the normal conditions first.

API succeeds → data appears → done.

But there’s also the possibility:

```
Loading
   ↓
Success
```

but also:

```
Loading
   ↓
Error
```

or:

```
Loading
   ↓
Empty
```

It could even happen that:

```
Loading
   ↓
Request timeout
   ↓
User melakukan retry
```

That’s why, whenever I look at code that makes an API request, I don’t just look at the part where the request succeeds.

This way, I can view state as part of the application’s behavior, not just as a variable that stores data.

## 4. Check Asynchronous Operations and API Calls

After understanding the possible states that can occur, I usually continue by examining how those asynchronous operations are executed.

One thing that’s often overlooked is **duplicate API calls**.

For example, an API is called when the page first loads. Then there’s ``useEffect`` or a `watch` mechanism that also triggers the same request. After that, a user event calls the API again.

Each trigger might seem reasonable when viewed in isolation.

But when combined, a single API might be called multiple times for no apparent reason.

That’s why I usually ask:

> “Does this API really need to be called this many times?”
> 

That’s not to say every duplicate call is necessarily a bug. There are certain situations where the request is actually necessary.

What needs to be checked is whether the call was intentional and has a clear reason.

### Watch Out for Race Conditions

Another important consideration is the order in which asynchronous operations are completed.

For example, a user performs an action twice in quick succession.

The first request is sent, followed by the second request.

Logically, we might assume the second request is the most recent one.

However, asynchronous operations do not guarantee that the request sent last will complete first.

For example:

```
Request A ──────────────────────────> selesai
Request B ───────────────> selesai
```

Request B completes first and updates the state with the latest data.

A short time later, Request A completes and updates the state with older data.

As a result, the state—which should contain the latest data—is overwritten by the response from the previous request.

This is one form of **a race condition** that needs to be considered when an asynchronous operation can be triggered multiple times.

When conducting a self-review, I usually ask:

- What happens if a user performs an action twice in quick succession?
- Could the older response overwrite the latest state?
- Does the previous request need to be canceled?
- Will that response still be relevant by the time it finally completes?
- Do the loading and error states remain consistent when multiple requests run concurrently?

Not all cases require complex solutions. However, the potential for these issues must be acknowledged before the code is considered complete.

## 5. Check Consistency Between States

In addition to checking whether a state succeeds or fails, I also try to examine the relationships between states.

For example, could a situation like this occur?

```
isLoading = false
data = undefined
error = undefined
```

Or:

```
isLoading = true
data = undefined
error = "Something went wrong"
```

Of course, not all of these combinations are necessarily incorrect. It depends on how the states were actually designed.

But the question that needs to be answered is:

> “Which states are valid, and can this code produce state combinations that shouldn’t actually occur?”
> 

The more complex a component is, the easier it is for the state to become inconsistent.

That’s why I try to ensure that every state has a clear purpose and that transitions between states are understandable.

This also helps when other developers later need to add new conditions to that component.

## 6. Review from the User’s Perspective

After reviewing the code from a technical standpoint, I try to look at it again from the user’s perspective.

For example, when the API fails, does the user receive feedback?

When loading takes a while, does the user know that the app is processing something?

When there’s no data, does the app display an empty state or just a blank screen?

When a user clicks repeatedly, does the app exhibit strange behavior?

Questions like these help connect the technical implementation to the behavior that users actually experience.

After all, the code we write isn’t just about how developers interact with the codebase, but also about how users interact with the app.

## 7. Final Review from a Maintenance Perspective

Finally, I conduct a review as if I were a developer seeing the code for the very first time.

At this stage, I try to set aside the context I had when I wrote it.

I ask myself:

> “If I hadn’t worked on this feature, would I be able to understand this code without having to ask the person who wrote it?”
> 

### Naming and HTML Semantics

I started with the simplest thing: naming.

Names like:

```jsx
const temp = ...
const data = ...
const result = ...
```

are technically valid, but they don’t necessarily explain what’s actually stored.

If that variable stores a list of patients, `“patients` ” would be easier to understand than `“data`.”

Names should, as much as possible, indicate the role or purpose of something, not just its type or temporary value.

The same applies to HTML semantics.

If an element actually functions as a button and performs an action when clicked, use ``<button>` ` instead of ``<div>` ` with an ` `onClick`` attribute.

Semantic HTML also aids accessibility and provides the built-in behavior that the element inherently possesses.

### Don’t Leave Unused Code as Comments

I also check for any old code that’s simply been commented out.

For example:

```jsx
// const oldFunction = ...
// const oldData = ...
// function oldHandler() { ... }
```

I prefer to delete code that is no longer used rather than leaving it in the file.

Comments should be used when there is information that cannot be explained simply by reading the code.

For example:

- the reason a workaround is needed
- unusual behavior of a third-party library
- the reason an implementation was intentionally designed that way
- a section that requires special attention when modified

That way, comments explain **why**, rather than just repeating **what** the code does.

### Structural Consistency

Next, I check whether the structure of the code I just created differs too much from the rest of the code in the project.

For example:

- the order of imports
- props placement
- state
- methods
- handler
- helper function
- component structure

If a project already has a consistent pattern, following that pattern certainly makes the code easier for other developers to read.

But in my opinion, consistency doesn’t mean blindly following all the old patterns.

I still try to understand:

> “Why does this project use that approach?”
> 

Because it’s possible that the existing approach works well for most cases, but isn’t suitable for the code we’re currently working on.

### Don’t Reinvent the Wheel

The same applies when a project already has a specific way of handling APIs, utilities, or UI components.

Before creating a new implementation, I usually check first to see if there’s already an implementation I can use.

For example, if the project already has standards for API calls and error handling, I’ll review those implementations first.

It’s possible that we can simply use the existing approach without needing to create a new abstraction.

However, if that approach turns out to be suitable only for specific conditions, too limited, or has flaws that need to be fixed, adopting a new approach is also a valid option.

## Conclusion

The longer I work as a software developer, the more I realize that writing code isn’t just about making something work.

Before creating a Pull Request, I try to pause for a moment and review the code I’ve just written.

- Is there any unnecessary code?
- Have all possible states been considered?
- What happens if the API fails?
- What if a user performs an action twice?
- Is there a possibility of a *race condition*?
- Will other developers be able to understand the naming and structure of this code?
- Does the project actually already have a utility or component that can be used?

And most importantly:

> **“If I have to change this code six months from now, will I be grateful to the version of myself who wrote it today?”**
> 

For me, that’s one of the goals of a *self-code review*.

Not to make the code perfect, but to reduce the number of issues we can actually find on our own before the code reaches the reviewer.