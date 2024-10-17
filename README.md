# Daily Expenses Sharing Application

## Table of Contents
- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)

## Overview

The Daily Expenses Sharing Application is a backend service designed to help users manage and share daily expenses. This application allows users to add expenses and split them based on three methods: equal splits, exact amounts, and percentages. Users can view their individual expenses, overall expenses, and download balance sheets.

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web application framework for Node.js to create APIs.
- **Prisma**: ORM for interacting with the PostgreSQL database.
- **PostgreSQL**: Database for storing user and expense data.
- **JSON Web Tokens (JWT)**: For user authentication.
- **dotenv**: For managing environment variables.

## Features

- **User Management**: 
  - Create users with email, name, and mobile number.
  - Authenticate users with JWT.

- **Expense Management**:
  - Add expenses with the ability to split in three ways: equal, exact, and percentage.
  - Retrieve individual and overall expenses.
  - Download balance sheets.

- **Data Validation**: Ensure all inputs are validated, including ensuring percentage splits add up to 100%.

## API Endpoints

### User Endpoints

- **Create User**: `POST /users`
- **Login**: `POST /login`
- **Get User Details**: `GET /users/:id`

### Expense Endpoints

- **Add Expense**: `POST /expenses`
- **Get User Expenses**: `GET /expenses/:userId`
- **Get All Expenses**: `GET /expenses`

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- PostgreSQL
- npm (Node Package Manager)

### Images
- You can find images of the Postman request and response results in the images directory of this repository. The images are named in the following format:

Request Images: Reqname(Post)-users/expense-(if, testing id).png
For example, an image for adding a user may be named: Req-Post-users-1.png.
