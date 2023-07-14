# Training 5 - Advanced React: Redux and React Redux

## Overview

- Introduction to fundamental of functional programming
  - Immutable
  - What is a side effect?
  - Benefit of functional programming
  - The role of functional programming in Redux architecture
  - Using JS functional functions: `map`, `filter`, `reduce`, `some`, `every`
- Introduction to Redux architecture
- Understanding Redux architecture data flow (Uni-directional data flow)
  - What is a redux action?
  - What is a reducer?
  - What is a action dispatcher?
- Why do we need to use Redux?
- Connecting Redux with React using React Redux
- Redux state vs React state

## Goal

- Understanding basic of functional programming
- Why do reducer in redux is a pure function?
- The important of pure function
- Fluently using `map`, `filter`, `reduce`, `some`, `every`
- Understanding the Redux architecture
- Building an application using mixed React state and Redux state

## Plan

- One Redux training section with fundamental functional programming concept
- One pair programming section about Redux

## Reading (Optional)

- Fullstack React - Part 2
- From Redux (p.452) to Asynchronicity and server communication (p.568)
- Lecture notes

## Tasks and Requimenets

Task 1:

- Building a to-do management application using Redux, Backend mock API `../templates/todos-mock-api`
- Implement CRUD todo
- Implement search by name
- Implement add filter Show Completed? to turn on/off load completed todos or not
- Reducer, actions must be designed well

Task 2:

- Building a simple dashboard using Redux, Backend mock API `../templates/login-mock-api`
- Please review the dashboard layout:

![dashboard-layout](https://user-images.githubusercontent.com/47735787/122709801-32d36780-d289-11eb-88e0-2aa479a98485.jpg)

- Requirements:
  - Using react-router config routes like that
  - You must reuse stucture routes & layout components if these pages have the same layout
  - You must reuse the user detail component
  - If the user logged -> `/login` -> redirect to `/app`
  - If the user have not logged -> `/app/*` -> redirect to `/login`
  - If the user go to the url path which != `/login` or != `/app/*` then check user logged or not, logged redirect to `/app`, not logged redirect to `/login`
  - Whenever call to backend API and get the 403 status, we should add notification "You have not permission to do it" and redirect to `/app` (You can login with User role andcall **GET** `/users` to get this status)
  - If user go to `/app/users/:id` by enter url into browser address and the id is invalid, add notification "User is not found" and redirect to "/app/users"
  - Nice to use redux saga in task
  - Reducer, actions must be designed well

## Test

- Popup test with 10-15 questions about React and Redux
- You will need to achieve at least 70% of total score to pass this test
