# Training 2 - Basic React: React State, Props and Ref

## Overview

- What is a React state?
- When to use state?
- What is a properties (or props) in React?
- When to use props?
- React Ref
- Rendering a list with React using `map`
- Fragment in React
- Debugging React app using React Devtools
- Basic usage of `lodash`

## Goal

- Understanding `state` and `props` in React
- Able to tell the difference between `state` and `props`
- Understanding when to use `state` and `props`
- Understading and able to use React Ref API
- Better component re-using with `props`
- Using `children` props
- Rendering a list using `map`
- Rendering multiple components with Fragment
- Able to bebugging with React Devtools

## Plan

- One training/reading section
- One practice section with the given task below

## Reading (Optional)

- Fullstack React - Part 1
- From **Making Product Data-driven** (p.27) to **Methodology review** (p.114)

## Tasks and Requirements

- Task 1

  - Create a simple modal using React state
  - Source code must be stored in `Training2/src/task1` folder

- Task 2

  - Create a modal that will render its children
    ```jsx
    <Modal>
      Hello
      <CloseButton />
    </Modal>
    ```
  - There is a button to close the modal from the children component
  - Using `state` and `props` to complete this task
  - Source code must be stored in `Training2/src/task2` folder
  - _You must implement this modal by your own. No library is allowed_

- Task 3
  - Given an input that allow a user to enter a number and a button with `Start` label
  - When a user press `Start`
    - If input is empty, display an error tell a user that: 'Please input a number'
    - If input is not a valid number, display an error tell a user that: 'Invalid input. Must be a number'
    - If input is a negative number, display an error tell a user that: 'Number must be greater than 0'
    - Otherwise, render a component that will countdown the given number from inputed number down to zero
  - User is able to stop the countdown progress with `Stop` button.
  - The `Stop` button should only be shown when the `Start` button is pressed
  - Source code must be stored in `Training2/src/task3` folder

## Test

- Popup test with 10-15 questions about React
- You will need to achieve at least 60% of total score to pass this test
