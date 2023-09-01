# E-Commerce API Documentation

Welcome to the E-Commerce API documentation. This API allows users to create listings of items they want to sell and enables potential buyers to contact sellers. Below, you'll find information on how to use the API, including authentication, endpoints, request parameters, and more.

## Authentication

To use this API, you need to authenticate. You can obtain an authentication token by registering or logging in.

### Register

**Endpoint:** `/register`
- **Method:** POST
- **Description:** Register a new user.
- **Request Body:**
  - `username` (string, required): The username of the new user.
  - `email` (string, required): The email address of the new user.
  - `password` (string, required): The password for the new user.
- **Response:**
  - `username` (string): The username of the registered user.
  - `email` (string): The email address of the registered user.
  - `token` (string): Authentication token for the registered user.

### Login

**Endpoint:** `/login`
- **Method:** POST
- **Description:** Log in an existing user.
- **Request Body:**
  - `email` (string, required): The email address of the user.
  - `password` (string, required): The password of the user.
- **Response:**
  - `username` (string): The username of the logged-in user.
  - `email` (string): The email address of the logged-in user.
  - `token` (string): Authentication token for the logged-in user.

## Listings

### Create Listing

**Endpoint:** `/listings`
- **Method:** POST
- **Description:** Create a new listing.
- **Request Body:** Include the details of the listing, such as `title`, `description`, `price`, `category`, etc.
- **Authentication:** Required (user must be logged in).
- **Response:** The newly created listing.

### Get All Listings

**Endpoint:** `/listings`
- **Method:** GET
- **Description:** Retrieve a list of listings based on various query parameters (e.g., `category`, `price`, `title`, etc.).
- **Query Parameters:** You can filter listings by `category`, `price`, `title`, and `createdBy`.
- **Response:** An array of listings that match the query criteria.

### Get Single Listing

**Endpoint:** `/listings/:id`
- **Method:** GET
- **Description:** Retrieve a single listing by its unique ID.
- **Path Parameter:** `id` (string, required): The ID of the listing to retrieve.
- **Response:** The details of the requested listing.

### Edit Listing

**Endpoint:** `/listings/:id`
- **Method:** PUT
- **Description:** Edit an existing listing.
- **Path Parameter:** `id` (string, required): The ID of the listing to edit.
- **Request Body:** Include the fields you want to update, such as `price`, `description`, `phoneNumber`, etc.
- **Authentication:** Required (user must be the listing owner).
- **Response:** The updated listing.

### Delete Listing

**Endpoint:** `/listings/:id`
- **Method:** DELETE
- **Description:** Delete a listing by its unique ID.
- **Path Parameter:** `id` (string, required): The ID of the listing to delete.
- **Authentication:** Required (user must be the listing owner).
- **Response:** Success message indicating that the listing was deleted.

## Messaging

### Send Message

**Endpoint:** `/messages`
- **Method:** POST
- **Description:** Send a message to another user.
- **Request Body:**
  - `receiver` (string, required): The ID of the user receiving the message.
  - `message` (string, required): The message content.
- **Authentication:** Required (user must be logged in).
- **Response:** The sent message details.

### Get Messages

**Endpoint:** `/messages/:receiver`
- **Method:** GET
- **Description:** Retrieve messages exchanged between the logged-in user and another user.
- **Path Parameter:** `receiver` (string, required): The ID of the other user.
- **Authentication:** Required (user must be logged in).
- **Response:** An array of messages exchanged between the users, sorted by timestamp.

### Get Conversations

**Endpoint:** `/conversations`
- **Method:** GET
- **Description:** Retrieve a list of unique conversations the logged-in user is part of.
- **Authentication:** Required (user must be logged in).
- **Response:** An array of conversations, each containing the username and ID of the conversation partner.

## File Upload

### Upload Images

**Endpoint:** `/upload/images`
- **Method:** POST
- **Description:** Upload an image to the server (deprecated).
- **Request Body:** Include the image file.
- **Authentication:** Not required.
- **Response:** The URL of the uploaded image.

**Endpoint:** `/upload/images-new`
- **Method:** POST
- **Description:** Upload an image to the server using a more secure method.
- **Request Body:** Include the image file.
- **Authentication:** Not required.
- **Response:** The URL of the uploaded image.

## Error Handling

- The API returns appropriate error messages and status codes for various scenarios, such as invalid requests or authentication failures.

## Contact Information

For any inquiries or support, please contact us at [email@example.com].

## Version History

- Version 1.0.0 (September 1, 2023): Initial release of the E-Commerce API.

Thank you for using our E-Commerce API! We hope this documentation helps you integrate with our platform successfully.
