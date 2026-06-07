# DynamicForms React

A drag-and-drop form builder in React. Create dynamic, schema-driven forms in the browser, like a small Google Forms clone.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Radix-000000?logo=radixui&logoColor=white)

## What it does

DynamicForms React lets you build custom forms field by field, preview them, and fill them out, all in the browser. You add fields from a type picker, edit each field's settings in a side panel, reorder them, and then switch to a preview that renders a working, validated form.

Form state lives in memory while the app runs. There is no backend in this repo, so forms and submissions reset on reload.

## Features

- Visual form builder with an add-field flow and a per-field editor panel.
- Nine field types: text, email, number, select (dropdown), checkbox, radio, date, long text (textarea), and file upload.
- Per-field options: label, placeholder, description, required toggle, and choice options for select, checkbox, and radio.
- Duplicate, delete, and reorder fields. Fields carry an `order` value used to sort them.
- Live preview that renders the form as an end user would see it.
- Built-in validation on submit: required fields, email format, and numeric values, with inline error messages.
- A form list view showing field count and submission count per form, with edit, preview, and delete actions.
- Toast notifications for save, submit, and delete actions.

## Stack

- React 18 with TypeScript
- Vite (using the SWC React plugin)
- Tailwind CSS
- shadcn/ui components on top of Radix UI primitives
- react-router-dom for routing
- react-hook-form and zod (form/validation libraries available in the project)
- @tanstack/react-query (query client set up at the app root)
- lucide-react icons

## Routes

- `/` landing page with the project intro and feature cards.
- `/form-builder` the builder, preview, and form list.
- `*` not-found page.

## Run locally

This project uses Bun. A `bun.lockb` is committed.

```sh
# Install dependencies
bun install

# Start the dev server
bun dev

# Build for production
bun run build

# Preview the production build
bun run preview

# Lint
bun run lint
```

The dev server is configured to run on `http://localhost:8080`.
