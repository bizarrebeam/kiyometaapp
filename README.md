# Kiyometa Order Management

Kiyometa is a web-based manufacturing management application for a Japanese steel manufacturer. It replaces legacy tablet software and keeps quotation, order, production, bill of materials (BOM), and inventory data in one system across multiple tablets.

The application provides workflows for quotation and order entry, production scheduling, BOM management, and inventory management. Inventory covers material receipts, stock movements, and stock reconciliation when an order changes status.

The OCR service uses Python, FastAPI, RapidOCR, and OpenCV to read quotation details from customer documents. Staff can crop or rotate an image, then correct extracted fields before they enter an order.

The app supports offline order recovery through IndexedDB. It saves drafts, resumes OCR jobs, and queues submissions. Version checks help resolve edits made on more than one device.

## Screenshots

### Home

<img width="1249" height="1418" alt="screencapture-localhost-5173-2026-11-07-15_06_39" src="https://github.com/user-attachments/assets/066cffd5-1043-4fd8-b0d3-2f788255219e" />

### Order Entry

<img width="1249" height="1699" alt="screencapture-localhost-5173-2026-11-07-15_08_05" src="https://github.com/user-attachments/assets/a3880919-17a6-4e2d-9d2f-c0e9d07f0c97" />

### Search & Billing

<img width="1526" height="988" alt="screencapture-localhost-5173-2026-11-07-15_09_11" src="https://github.com/user-attachments/assets/19120720-e903-41f5-95dc-b028af797a34" />

### Production Stage Progress

<img width="1526" height="2369" alt="screencapture-localhost-5173-2026-11-07-15_10_44" src="https://github.com/user-attachments/assets/b40e7be2-2fd5-4c17-a324-264f0207d91a" />

### Inventory & Purchasing

<img width="1526" height="910" alt="screencapture-localhost-5173-2026-11-07-15_11_48 (1)" src="https://github.com/user-attachments/assets/f9c99091-464d-41d3-af11-624dc88507fd" />


## Technology

React, TypeScript, and Vite run the web app. Supabase provides authentication, PostgreSQL data, file storage, and Edge Functions. FastAPI runs the OCR service. Flutter provides the Android tablet app.

## Project folders

- `webapp/` contains the React application.
- `backend/supabase/migrations/` contains the database schema changes.
- `backend/supabase/functions/` contains Supabase Edge Functions.
- `ocr-service/` contains the Python OCR service.
- `lib/`, `android/`, and `web/` contain the Flutter application.

## Run the web app

1. Install Node.js.
2. Copy `webapp/.env.local.example` to `webapp/.env.local`.
3. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in `webapp/.env.local`.
4. Open a terminal in `webapp/`.
5. Run `npm ci`.
6. Run `npm run dev`.

The publishable key is for browser use. Do not put a database password or a service role key in this file.

## Database setup

The SQL files in `backend/supabase/migrations/` define the database structure and access rules. They do not add sample customer records. Apply them in number order to a new Supabase project. Deploy the `manage-users` function after applying the migrations.
