# TicketFlow

**TicketFlow** is a modern, client-side web application designed to streamline the management and formatting of WHMCS ticket URLs. It provides a clean, distraction-free interface for collecting, viewing, and copying ticket links.

## Features

- **Smart URL Truncation**: Automatically detects WHMCS filenames (e.g., `supporttickets.php`, `clientarea.php`) and hides unnecessary path segments for a cleaner list view.
- **Full Link Copy**: While the display is truncated, the "Copy All" button preserves the original full URLs.
- **Duplicate Prevention**: Prevents adding the same URL twice with visual feedback (shake animation and toast alert).
- **URL Validation**: Ensures only valid URLs (starting with `http://` or `https://`) are added.
- **Persistence**: Links are automatically saved to the browser's LocalStorage, so they remain available even after refreshing or closing the page.
- **Interactive UI**:
    - **Glassmorphism Design**: Sleek, modern aesthetic with animated backgrounds.
    - **Real-time Updates**: List updates instantly upon adding or removing items.
    - **Clear All**: Quickly reset the entire list with a single click.

## Technologies Used

- **HTML5**
- **CSS3** (Custom animations & Glassmorphism)
- **JavaScript** (Vanilla)
- **Tailwind CSS** (Utility-first CSS framework)
- **DaisyUI** (Component library for Tailwind)

## How to Use

1.  **Open the Application**: Simply open `index.html` in any modern web browser. No server or installation required.
2.  **Add a Link**: Paste a WHMCS URL (e.g., `https://domain.com/.../supporttickets.php?id=123`) into the input field and press **Enter**.
3.  **Manage Links**:
    - **Remove**: Click the "X" button next to any link to remove it.
    - **Clear All**: Click the "Clear" button in the toolbar to remove all links.
4.  **Copy Links**: Click the "Copy All" button to copy the formatted list of full URLs to your clipboard, ready to be pasted into reports or chats.

## Project Structure

- `index.html`: Main structure of the application.
- `style.css`: Custom styles, animations, and theming.
- `script.js`: Application logic (validation, storage, rendering).

## License

This project is open-source and available for personal or commercial use.
