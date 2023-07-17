# Training 6 - Advanced React: Redux Middleware

## Overview

- Setup a middleware for Redux
- Using Redux Saga middleware for side-effect handling, calling API, and background job\*
- Redux persist for persisting data
- Redux devtool extension middleware for debugging redux with Redux Devtools Ext
- Debugging Redux with Redux Devtools Ext

## Goal

- Understanding the role of Redux middlware
- Can config redux persist, redux saga by yourself
- Able to config another redux middleware without any problems
- Understanding and able to debug Redux state with Redux Devtools Ext

## Plan

- One pair programming section

## Reading (Optional)

- [Redux persist](https://github.com/rt2zz/redux-persist)
- [Redux saga](https://github.com/redux-saga/redux-saga)

## Tasks and Requimenets

- Task 1:
  - Clone Task 2 in the previous training and using redux-saga
  - Once they've logged in and refresh the page, the user should be stayed as logged in
- Task 2:
  - Implement task submission
  - Please review this image
    ![submit](https://user-images.githubusercontent.com/47735787/122714235-2fdc7500-d291-11eb-8660-9b84a7229634.png)
  - The app can be worked offline or online, the user can create a task without submitting immediately, every task created should get status: Draft
  - "Draft" means "I still want to edit and don't want to submit yet"
  - "Ready" means "I finalized the task and want to move it to Submit Queue"
  - Submit Queue only working when the network status is Online, otherwise the Submit Queue should be pending until network status become Online
  - That's meaning in the online network, every ready task will be submitted by Submit Queue automatically, otherwise ready tasks should still be Ready until network status become Online
  - When Submit Queue submit task one by one in Online mode, the status change to Submitting automatically
  - We only have an API to submit the task to the backend, we will mock it by yield delay(2000) and random 50-50 submit successfully for failed
  - User can click on the status to manually change status, please review the dashed arrow to know what status can be manually updated and the next status of them
  - Move the network status listener to redux-saga using even channel

## Test

N/A
