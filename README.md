[![Node CI](https://github.com/opifexM/contactms/actions/workflows/check.yml/badge.svg)](https://github.com/opifexM/contactms/actions/workflows/check.yml)

# ContactMS
ContactMS is a web-based user interface for managing client information in a CRM system. This application enables viewing, adding, editing, and deleting clients and offers features like sorting, searching, and contact management.

## Description

The ContactMS interface consists of a single page with a client table. Each client entry includes essential information like name, contact details, and creation and modification timestamps. Users can interact with clients through options like editing or deleting, with modals for detailed data entry and confirmation prompts. The application retrieves data from an API, with built-in loading indicators and client-side sorting and filtering.

## Features
- **Client Table**: Displays clients with columns for ID, full name, creation date, last update date, contacts, and actions.
- **Add/Edit Client**: Allows adding new clients or modifying existing ones through a modal form with data validation and error handling.
- **Client Contacts**: Each client can have up to 10 contact entries with various contact types (phone, email, VK, etc.).
- **Actions**:
  - **Edit**: Opens a modal to modify client information, fetching the latest data from the API before display.
  - **Delete**: Prompts for confirmation before removing a client from the list and sends a delete request to the server.
- **Sorting**: Sorts clients by ID, full name, creation date, or last modification date, with client-side sorting icons indicating the sorting order.
- **Search**: Filters clients based on search input with a 300ms debounce for efficient API requests.
- **Tooltips**: Displays tooltips with contact information on hover for various contact types (phone, email, VK, etc.).
- **Error Handling**: Displays relevant error messages from the server or a default message if server responses are unavailable or incomplete.

### Technologies Used
The project is built using modern web development tools and technologies to ensure a smooth and responsive user experience. The core technologies include:
- **JavaScript**: Provides interactivity and dynamic functionality on the client side.
- **TypeScript**: Enforces type safety and improves code quality.
- **Vite**: Build tool that offers a fast development environment and optimized production builds.
- **Zod**: Library for validation and schema definition, ensuring reliable data handling.

## License

ContactMS is licensed under the MIT license.
