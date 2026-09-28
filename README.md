# The Garage 🚗

A responsive vehicle-maintenance tracker for recording service history, monitoring ownership costs, and staying ahead of upcoming maintenance.

**Current release:** `v0.1.0-alpha`  
**Live application:** [auto-maintenance-tracker.vercel.app](https://auto-maintenance-tracker.vercel.app)
<img width="2555" height="1262" alt="theGarage0 1 0" src="https://github.com/user-attachments/assets/1a739855-7cb0-4c48-948a-5fd58dee363f" />

## About

The Garage gives vehicle owners one place to manage their cars, record completed services, update mileage, review maintenance history, and schedule future maintenance reminders.

The project began as a React learning exercise and has grown into a deployed product focused on practical vehicle ownership and maintenance planning.

## Features

- Create and manage multiple vehicle profiles
- Record service date, mileage, work performed, and cost
- View complete and vehicle-specific maintenance histories
- Automatically update a vehicle’s current mileage
- Validate mileage against surrounding service records
- Calculate total maintenance spending by vehicle
- Create date- and mileage-based service reminders
- Classify reminders as upcoming, due soon, due now, or overdue
- Display global and per-vehicle notification counts
- Snooze reminders for seven days
- Mark maintenance reminders as completed
- Automatically recommend the next service interval for recognized maintenance
- Save vehicles, records, and reminders between browser sessions
- Responsive dashboard interface for desktop and mobile

## How Recommendations Work

When a recognized maintenance reminder is completed, The Garage checks its service interval catalog and generates the next recommendation.

For example, completing an oil-change reminder can create another reminder based on:

- The vehicle’s current mileage plus the recommended mileage interval
- The current date plus the recommended time interval

Unrecognized or one-time repairs can still be tracked without creating unnecessary recurring reminders.

## Technology

- React
- TypeScript
- Vite
- CSS
- Browser Local Storage
- Git and GitHub
- Vercel

## Run Locally

Clone the repository:

```bash
git clone <your-repository-url>
cd auto-maintenance-tracker
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run the linter:

```bash
npm run lint
```

## Alpha Release

`v0.1.0-alpha` is the first deployed, usable version of The Garage.

Data is currently stored in the user’s browser through Local Storage. This means records persist after refreshing or closing the application, but they do not yet synchronize between browsers or devices.

## Roadmap

- User accounts and authentication
- Cloud database and cross-device synchronization
- Backend API
- Vehicle photos
- Improved mobile layout
- Maintenance-history searching and filtering
- Custom service intervals
- Expanded vehicle-specific recommendations
- Data export and backup
- Completed-reminder history
- Settings and user preferences

## Project Direction

The Garage is being developed as a real, evolving product rather than a static demonstration. The goal is to create a dependable digital garage that makes automotive maintenance easier to understand, organize, and plan with your phone or computer. 

Future releases will move persistence from browser storage to authenticated cloud data while keeping the application simple and useful for everyday vehicle owners.
