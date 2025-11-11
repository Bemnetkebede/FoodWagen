# FoodWagen 🍔

A modern, responsive food management web application built with Next.js and TypeScript. FoodWagen allows users to efficiently browse, search, add, edit, and delete food items with an intuitive user interface.

## 🌟 Features

### Core Functionality
- **Browse Food Items** - View a beautifully organized grid of food cards
- **Search & Filter** - Find specific foods using real-time search
- **Add New Foods** - Comprehensive form to add new food items with restaurant details
- **Edit Existing Items** - Modify food information with validation
- **Delete Items** - Remove foods with confirmation dialogs
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

### User Experience
- **Smooth Animations** - Slide-up entry animations and hover effects
- **Loading States** - Visual feedback during API operations
- **Form Validation** - Comprehensive error handling with user-friendly messages
- **Accessibility** - Semantic HTML and proper ARIA labels
- **Empty States** - Helpful messages when no data is available

## 🚀 Live Demo

[**View Live Site**](https://food-wagen-xjj2.vercel.app/)

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: Mock API integration
- **Testing**: Jest & React Testing Library
- **Deployment**: Vercel

## 📦 Installation
   ```bash
      # Clone the repository
      git clone https://github.com/your-username/foodwagen.gtk
      cd foodwagen
      
      # Install dependencies
      npm install
      
      # Run the development server
      npm run dev
  ```


## 🎯 Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/
│   ├── ui/                # Reusable UI components
│   ├── add-modal.tsx      # Add food modal
│   ├── edit-modal.tsx     # Edit food modal
│   ├── delete-modal.tsx   # Delete confirmation modal
│   ├── food-card.tsx      # Food item card component
│   └── footer.tsx         # Site footer
├── services/
│   └── api.ts             # API service layer
├── types/
│   └── index.ts           # TypeScript type definitions
└── tests/                 # Test files
```
##🔧 API Integration
FoodWagen integrates with a mock API providing full CRUD operations:

Method	Endpoint	Description
GET	/Food	Fetch all food items
POST	/Food	Create new food item
PUT	/Food/[id]	Update existing food item
DELETE	/Food/[id]	Remove food item
GET	/Food?name=[searchParam]	Search foods by name

##✅ Validation & Error Handling
Form Validation Rules
- ** Required Fields: Food name, rating, image URL, restaurant details
- ** Rating Range: 1-5 with decimal support

- ** URL Validation: Proper image URL format

- ** Status Options: "Open Now" or "Closed" only

## Error Messages
 -Clear, user-friendly error messages

 -Real-time validation feedback

-Proper error element IDs (food-name-error, food-rating-error, etc.)

## 🎨 Design Features
 - Modern UI - Clean, card-based design following Figma specifications

- Hover Animations - Smooth 150ms ease-out transitions

- Entry Animations - 300ms slide-up effects on load

- Consistent Styling - Orange (#FFB30E) primary color theme

- Typography - Clear hierarchy with proper font weights

## 🧪 Testing
- **Comprehensive test coverage including:

- **Component Rendering - Verify UI components render correctly

- **User Interactions - Test button clicks and form submissions

- **API Mocking - Simulate successful and failed API requests

- **Form Validation - Test input validation and error states

##📱 Responsive Design
  - **Mobile First - Optimized for small screens

  - **Tablet Friendly - Adaptive layouts for medium screens

  - **Desktop Optimized - Full-featured experience on large screens

## 🚀 Deployment
The project is configured for easy deployment on Vercel:

- ** Push to GitHub

- ** Connect repository to Vercel

- ** Automatic deployments on main branch updates

##📝 Submission Details
This project was developed as part of the A2SV Technical Interview process, 
- demonstrating: Clean Code Architecture
- Modular, reusable components TypeScript Best Practices
- Strong typing throughout API Integration 
-  Robust error handling and loading states User Experience 
-  Intuitive interactions and feedback Accessibility
-  Semantic HTML and proper labeling
-  Built with Next.js, TypeScript, and Tailwind CSS text

**Key improvements made:**
- ✅ Proper Markdown formatting with consistent headers
- ✅ Organized sections with clear hierarchy
- ✅ Added tables for API endpoints
- ✅ Fixed code block formatting
- ✅ Added proper placeholder for screenshot
- ✅ Consistent emoji usage
- ✅ Professional tone and structure
- ✅ Clear call-to-action for live demo
- ✅ Better visual separation between sections


