# Poké App

## Table of Contents
1. [Installation](#installation)
2. [Project Overview](#project-overview)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Key Features](#key-features)
6. [Performance Considerations](#performance-considerations)
7. [Testing Strategy](#testing-strategy)
8. [Deployment](#deployment)

## Installation

To get started with this project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/DaffaAdityaDev/poke-app.git
   cd poke-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```bash
   NEXT_PUBLIC_POKE_API_BASE_URL=YOUR_POKE_API_BASE_URL (check .env.example and replace with your own API base url or visit https://pokeapi.co/docs/v2)
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Overview

Poké App is a web application that allows users to discover and explore Pokémon from various generations. It provides features such as a Pokédex, comparison tools, type information, evolution chains, and ability details.

## Technology Stack

1. **Why did we choose Next.js for this project?**

    chose Next.js (version 14.2.4) for its powerful features that enhance React applications:
   - Server-side rendering (SSR) for improved performance and SEO
   - Built-in routing system
   - API routes for backend functionality (if needed)
   - Easy deployment and scalability
   - TypeScript support out of the box

2. **What is the purpose of using NextUI in our application?**

   NextUI (various components from version 2.x) was selected as our UI component library for several reasons:
   - Consistent and modern design language
   - Customizable components that work well with Next.js
   - Accessibility features built-in
   - Dark mode support via next-themes integration
   - Performance optimized components

3. **How does Tailwind CSS benefit our project?**

   Tailwind CSS (version 3.4.3) offers numerous advantages:
   - Utility-first approach for rapid UI development
   - Highly customizable design system
   - Reduced CSS bundle size through purging unused styles
   - Responsive design made easy
   - Seamless integration with Next.js and NextUI

4. **Why did we include SWR in our dependencies?**

   SWR (version 2.2.5) is used for data fetching because it provides:
   - Automatic caching and revalidation
   - Real-time data updates
   - Pagination and infinite loading support
   - Optimistic UI updates
   - Error handling and retry mechanisms

5. **What role does TypeScript play in our development process?**

   TypeScript (version 5.0.4) is crucial for our project as it offers:
   - Static typing for improved code quality and fewer runtime errors
   - Enhanced IDE support with better autocomplete and refactoring tools
   - Improved maintainability for large-scale applications
   - Better documentation through type definitions

6. **How do we handle state management in this application?**

   primarily use React's built-in state management solutions:
   - `useState` and `useReducer` for component-level state
   - `useContext` for sharing state across components
   - SWR for server state management and caching

   This approach keeps our state management simple and efficient without introducing additional complexity from external state management libraries.

7. **What testing framework and methodology are we using?**

   Jest (version 29.7.0) as our testing framework along with React Testing Library (version 16.0.1) for component testing. Our testing strategy includes:
   - Unit tests for utility functions and hooks
   - Integration tests for components and their interactions
   - End-to-end tests for critical user flows
   - Snapshot testing for UI components to detect unintended changes

## Project Structure

The project follows a standard Next.js structure with some additional organization:

- `pages/`: Next.js pages and API routes
- `components/`: Reusable React components
- `hooks/`: Custom React hooks
- `utils/`: Utility functions and helpers
- `types/`: TypeScript type definitions
- `styles/`: Global styles and Tailwind CSS configuration
- `public/`: Static assets
- `tests/`: Test files for components and utilities

## Key Features

- Pokédex with pagination and search functionality
- Detailed Pokémon information pages
- Pokémon comparison tool
- Type effectiveness chart
- Evolution chain viewer
- Ability explorer

## Performance Considerations

- Server-side rendering for initial page load performance
- Image optimization using Next.js Image component
- Code splitting and lazy loading for improved load times
- Caching strategies with SWR to reduce API calls

## Testing Strategy

Our testing approach ensures code quality and reliability:

- Unit tests for individual functions and components
- Integration tests for feature workflows
- End-to-end tests for critical user journeys
- Continuous Integration (CI) to run tests on every pull request

## Deployment

The application is on Vercel, For deployment instructions, refer to the [Vercel documentation](https://vercel.com/docs).

---

Now, let's address the specific questions Asked:

### 1. How would you structure your components to ensure the code is clean, maintainable, and testable?

To ensure clean, maintainable, and testable code, we follow these principles:

- **Solid Principle**: structure our components following the SOLID principles.
- **Single Responsibility**: Each component has a single, well-defined purpose.
- **Separation of Concerns**: separate logic, presentation, and state management.
- **Custom Hooks**: extract complex logic into custom hooks for reusability and easier testing.
- **Prop Types**: use TypeScript interfaces to define prop types for better type checking and documentation.
- **Consistent Naming**: follow a consistent naming convention for components, files, and functions.

Example of a well-structured component:

```ts
import React from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

import { PokemonDetails } from "@/types/pokemon";

interface PokemonCardProps {
  pokemon: PokemonDetails;
  onClick: (pokemon: PokemonDetails) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick }) => {
  return (
    <Card isPressable onPress={() => onClick(pokemon)}>
      <CardBody className="p-0 flex justify-center items-center">
        <Image
          alt={pokemon.name}
          className="w-full h-48 object-contain"
          fallbackSrc="/placeholder-pokemon.png"
          src={pokemon.sprites.front_default || "/placeholder-pokemon.png"}
        />
      </CardBody>
      <CardFooter className="flex flex-col items-start">
        <h2 className="text-lg font-semibold capitalize">{pokemon.name}</h2>
        <p className="text-sm text-gray-500">
          Types: {pokemon.types.map((type) => type.type.name).join(", ")}
        </p>
      </CardFooter>
    </Card>
  );
};

export default PokemonCard;

```

### 2. How would you handle errors and edge cases, such as the API being unavailable or returning an error?

handle errors and edge cases using the following strategies:

- **Error Boundaries**: implement React Error Boundaries to catch and handle runtime errors.
- **SWR Error Handling**: utilize SWR's built-in error handling capabilities for API requests.
- **Fallback UI**: design and implement fallback UI components to display when data is unavailable or an error occurs.
- **Retry Mechanism**: implement a retry mechanism for failed API requests using SWR's configuration options.
- **User Feedback**: provide clear and informative error messages to users when issues occur.

Example of error handling in our SWR configuration:


```ts
import { SWRConfiguration } from "swr";
import { toast } from "react-toastify";

export const swrConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  shouldRetryOnError: (error) => {
    if (
      error.name === "NetworkError" ||
      (error.status >= 500 && error.status < 600)
    ) {
      return true;
    }
    if (error.status === 404) {
      return false;
    }

    return true;
  },
  errorRetryInterval: 5000,
  errorRetryCount: 3,
  onError: (error, key) => {
    // Global error handler
    toast.error(
      `An error occurred while fetching data. Please try again later.`,
    );
    console.error(`SWR Error for ${key}:`, error);
  },
};

export const createSWRConfig = (
  customConfig: Partial<SWRConfiguration> = {},
): SWRConfiguration => ({
  ...swrConfig,
  ...customConfig,
});
```


### 3. How would you manage state in your application, especially considering the asynchronous nature of API requests?

Our state management approach includes:

- **Local Component State**: use `useState` for component-specific state.
- **Context API**: utilize React Context for sharing state across multiple components when needed.
- **SWR for Server State**: leverage SWR for managing server state, including caching, revalidation, and handling asynchronous updates.
- **Custom Hooks**: create custom hooks to encapsulate complex state logic and provide a clean API for components.

Example of a custom hook for pagination:


```ts
import { useState, useCallback } from "react";

export const usePagination = (initialTotal: number, itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(initialTotal / itemsPerPage),
  );

  const handlePageChange = useCallback(
    (page: number, newTotal?: number) => {
      setCurrentPage(page);
      if (newTotal !== undefined) {
        setTotalPages(Math.ceil(newTotal / itemsPerPage));
      }
    },
    [itemsPerPage],
  );

  return { currentPage, totalPages, handlePageChange };
};
```


### 4. How would you write tests for your components and their interaction with the API?

Our testing strategy includes:

- **Unit Tests**: write unit tests for individual functions and hooks using Jest.
- **Component Tests**: use React Testing Library to test components in isolation.
- **Integration Tests**: create integration tests to ensure components work together correctly.
- **API Mocking**: use Jest's mocking capabilities to simulate API responses for consistent testing.
- **Snapshot Testing**: utilize snapshot tests to detect unintended UI changes.

Example of a component test:


```ts
import React from "react";
import { render, screen } from "@testing-library/react";

import { Pagination } from "@/components/pokemon/Pagination";

describe("Pagination", () => {
  // Test case to ensure the component renders without errors
  it("renders without crashing", () => {
    // Render the Pagination component with sample props
    render(
      <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />,
    );
    // Check if a navigation element is present in the rendered component
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
```


### 5. How would you ensure the security of the web application, especially considering it interacts with a third-party API?

To ensure the security of our application, we implement the following measures:

- **HTTPS**: enforce HTTPS for all communications.
- **API Key Security**: store API keys securely using environment variables.
- **Input Validation**: validate and sanitize all user inputs to prevent XSS attacks.
- **Content Security Policy**: We implement a strict Content Security Policy to mitigate XSS and other injection attacks.
- **CORS Configuration**: configure CORS policies to restrict access to our API endpoints.
- **Regular Dependencies Audit**: regularly audit and update our dependencies to patch known vulnerabilities.

### 6. How would you handle data validation and sanitization for the data received from the API?

For data validation and sanitization, we:

- **Type Checking**: use TypeScript interfaces to define expected data structures.
- **Schema Validation**: implement schema validation libraries like Zod or Yup for runtime data validation (Not implemented in this project).
- **Sanitization**: sanitize user inputs and API responses to prevent XSS attacks.
- **Error Handling**: implement robust error handling for cases where data doesn't match expected formats.

Example of data validation using TypeScript interfaces:


```ts
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  sprites: {
    front_default?: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
  height?: number;
  weight?: number;
  abilities?: {
    [x: string]: any;
    ability: {
      name: string;
    };
  }[];
  stats?: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  evolution_chain?: {
    chain: {
      species: {
        name: string;
      };
      evolves_to: any[];
    };
  };
  moves?: {
    move: {
      name: string;
    };
  }[];
}
```


### 7. How would you implement pagination and search functionality in your application?

For pagination and search functionality, we:

- **Pagination Component**: Create a reusable Pagination component using NextUI's Pagination component.
- **Custom Hook**: Implement a custom hook (`usePagination`) to manage pagination state and logic.
- **SWR with Pagination**: Utilize SWR's pagination support for efficient data fetching.
- **Search Input**: Implement a search input component with debounce functionality to optimize API calls.
- **URL Query Params**: Use URL query parameters to maintain pagination and search state for shareable links.

Example of the Pagination component:


```ts
import React from "react";
import { Pagination as NextUIPagination } from "@nextui-org/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center mt-4">
      <NextUIPagination
        initialPage={currentPage}
        total={totalPages}
        onChange={onPageChange}
      />
    </div>
  );
};
```
