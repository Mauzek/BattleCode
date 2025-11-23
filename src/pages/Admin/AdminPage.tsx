import type { RatingUser } from "@/components/shared/homeDetails/rating";
import type {  Course, Task } from "@/types";
import type { UserResponse } from "@/types/models/auth";
import React, { useState } from 'react';
import './AdminPage.scss'
import { AddButton, AddEventPopup } from "./Comp/Buttonio";

export const initialUsers: UserResponse[] = [
  {
    id: '1',
    userId: 'user1',
    username: 'boby',
    email: 'boby@example.com',
    token: 'mock-token-1',
    roles: ['admin', 'user'],
    bio: 'Senior developer with 8 years of experience'
  },
  {
    id: '2',
    userId: 'user2',
    username: 'boby2',
    email: 'boby2@example.com',
    token: 'mock-token-2',
    roles: ['user'],
    bio: 'Frontend developer specializing in Vue.js'
  },
  {
    id: '3',
    userId: 'user3',
    username: 'ilya',
    email: 'ilya@example.com',
    token: 'mock-token-3',
    roles: ['user', 'moderator'],
    bio: 'Full-stack JavaScript developer'
  },
  {
    id: '4',
    userId: 'user4',
    username: 'artem',
    email: 'artem@example.com',
    token: 'mock-token-4',
    roles: ['user'],
    bio: 'Backend developer with Python expertise'
  },
  {
    id: '5',
    userId: 'user5',
    username: 'klim',
    email: 'klim@example.com',
    token: 'mock-token-5',
    roles: ['user'],
    bio: 'Mobile app developer'
  },
  {
    id: '6',
    userId: 'user6',
    username: 'ilya2',
    email: 'ilya2@example.com',
    token: 'mock-token-6',
    roles: ['user'],
    bio: 'DevOps engineer'
  },
  {
    id: '7',
    userId: 'user7',
    username: '123',
    email: '123@example.com',
    token: 'mock-token-7',
    roles: ['user'],
    bio: 'QA engineer'
  },
  {
    id: '8',
    userId: 'user8',
    username: 'asdasd',
    email: 'asdasd@example.com',
    token: 'mock-token-8',
    roles: ['user'],
    bio: 'UI/UX designer'
  },
  {
    id: '9',
    userId: 'user9',
    username: 'alex',
    email: 'alex@example.com',
    token: 'mock-token-9',
    roles: ['admin', 'user'],
    bio: 'Team lead and architect'
  },
  {
    id: '10',
    userId: 'user10',
    username: 'maria',
    email: 'maria@example.com',
    token: 'mock-token-10',
    roles: ['user'],
    bio: 'Data scientist'
  },
  {
    id: '11',
    userId: 'user11',
    username: 'serg',
    email: 'serg@example.com',
    token: 'mock-token-11',
    roles: ['user', 'moderator'],
    bio: 'Cloud engineer'
  },
  {
    id: '12',
    userId: 'user12',
    username: 'olga',
    email: 'olga@example.com',
    token: 'mock-token-12',
    roles: ['user'],
    bio: 'Product manager'
  },
  {
    id: '13',
    userId: 'user13',
    username: 'dmitry',
    email: 'dmitry@example.com',
    token: 'mock-token-13',
    roles: ['user'],
    bio: 'Security specialist'
  },
  {
    id: '14',
    userId: 'user14',
    username: 'anna',
    email: 'anna@example.com',
    token: 'mock-token-14',
    roles: ['user'],
    bio: 'Machine learning engineer'
  },
  {
    id: '15',
    userId: 'user15',
    username: 'viktor',
    email: 'viktor@example.com',
    token: 'mock-token-15',
    roles: ['user'],
    bio: 'Database administrator'
  },
  {
    id: '16',
    userId: 'user16',
    username: 'natalia',
    email: 'natalia@example.com',
    token: 'mock-token-16',
    roles: ['user'],
    bio: 'Scrum master'
  },
  {
    id: '17',
    userId: 'user17',
    username: 'pavel',
    email: 'pavel@example.com',
    token: 'mock-token-17',
    roles: ['user'],
    bio: 'Embedded systems developer'
  },
  {
    id: '18',
    userId: 'user18',
    username: 'elena',
    email: 'elena@example.com',
    token: 'mock-token-18',
    roles: ['user'],
    bio: 'Technical writer'
  },
  {
    id: '19',
    userId: 'user19',
    username: 'mikhail',
    email: 'mikhail@example.com',
    token: 'mock-token-19',
    roles: ['admin', 'user'],
    bio: 'CTO and founder'
  },
  {
    id: '20',
    userId: 'user20',
    username: 'irina',
    email: 'irina@example.com',
    token: 'mock-token-20',
    roles: ['user'],
    bio: 'Business analyst'
  }
];

const initialCourses: Course[] = [
  {
    id: 1,
    title: 'JavaScript Fundamentals',
    description: 'Learn the basics of JavaScript programming language',
    imageUrl: '/images/js-fundamentals.jpg',
    level: 'beginner',
    isPublished: true,
    authorId: '1',
    tasks: [
      { id: 1, title: 'Variables and Data Types', description: 'Learn about variables and different data types', difficulty: 'easy', orderIndex: 1 },
      { id: 2, title: 'Functions Basics', description: 'Understand how to create and use functions', difficulty: 'easy', orderIndex: 2 }
    ],
    studentCount: 245,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: 2,
    title: 'React Master Class',
    description: 'Master React from basics to advanced concepts',
    imageUrl: '/images/react-master.jpg',
    level: 'intermediate',
    isPublished: true,
    authorId: '9',
    tasks: [
      { id: 3, title: 'Components and Props', description: 'Learn React components and props', difficulty: 'easy', orderIndex: 1 },
      { id: 4, title: 'State and Lifecycle', description: 'Understand state and component lifecycle', difficulty: 'medium', orderIndex: 2 },
      { id: 5, title: 'Hooks Deep Dive', description: 'Master React hooks', difficulty: 'medium', orderIndex: 3 }
    ],
    studentCount: 189,
    createdAt: '2024-02-01',
    updatedAt: '2024-02-10'
  },
  {
    id: 3,
    title: 'Node.js Backend Development',
    description: 'Build scalable backend applications with Node.js',
    imageUrl: '/images/nodejs.jpg',
    level: 'intermediate',
    isPublished: true,
    authorId: '19',
    tasks: [
      { id: 6, title: 'Express.js Setup', description: 'Set up Express.js server', difficulty: 'easy', orderIndex: 1 },
      { id: 7, title: 'REST API Design', description: 'Design RESTful APIs', difficulty: 'medium', orderIndex: 2 },
      { id: 8, title: 'Database Integration', description: 'Integrate with MongoDB', difficulty: 'medium', orderIndex: 3 }
    ],
    studentCount: 156,
    createdAt: '2024-01-25',
    updatedAt: '2024-02-15'
  },
  {
    id: 4,
    title: 'Python for Data Science',
    description: 'Learn Python programming for data analysis and visualization',
    imageUrl: '/images/python-ds.jpg',
    level: 'beginner',
    isPublished: true,
    authorId: '10',
    tasks: [
      { id: 9, title: 'Python Basics', description: 'Python syntax and fundamentals', difficulty: 'easy', orderIndex: 1 },
      { id: 10, title: 'Pandas Introduction', description: 'Data manipulation with Pandas', difficulty: 'medium', orderIndex: 2 },
      { id: 11, title: 'Data Visualization', description: 'Create charts with Matplotlib', difficulty: 'medium', orderIndex: 3 }
    ],
    studentCount: 312,
    createdAt: '2024-02-10',
    updatedAt: '2024-03-01'
  },
  {
    id: 5,
    title: 'Advanced Algorithms',
    description: 'Master complex algorithms and data structures',
    imageUrl: '/images/algorithms.jpg',
    level: 'advanced',
    isPublished: false,
    authorId: '3',
    tasks: [
      { id: 12, title: 'Sorting Algorithms', description: 'Implement various sorting algorithms', difficulty: 'medium', orderIndex: 1 },
      { id: 13, title: 'Graph Theory', description: 'Graph algorithms and traversal', difficulty: 'hard', orderIndex: 2 },
      { id: 14, title: 'Dynamic Programming', description: 'Solve problems with DP', difficulty: 'hard', orderIndex: 3 }
    ],
    studentCount: 78,
    createdAt: '2024-01-30',
    updatedAt: '2024-02-28'
  },
  {
    id: 6,
    title: 'Mobile Development with React Native',
    description: 'Build cross-platform mobile apps',
    imageUrl: '/images/react-native.jpg',
    level: 'intermediate',
    isPublished: true,
    authorId: '5',
    tasks: [
      { id: 15, title: 'React Native Setup', description: 'Set up development environment', difficulty: 'easy', orderIndex: 1 },
      { id: 16, title: 'Navigation', description: 'Implement app navigation', difficulty: 'medium', orderIndex: 2 },
      { id: 17, title: 'Native Modules', description: 'Work with native device features', difficulty: 'hard', orderIndex: 3 }
    ],
    studentCount: 134,
    createdAt: '2024-02-05',
    updatedAt: '2024-03-10'
  },
  {
    id: 7,
    title: 'Cloud Computing with AWS',
    description: 'Learn cloud services and deployment on AWS',
    imageUrl: '/images/aws.jpg',
    level: 'advanced',
    isPublished: true,
    authorId: '11',
    tasks: [
      { id: 18, title: 'EC2 Instances', description: 'Deploy virtual servers', difficulty: 'medium', orderIndex: 1 },
      { id: 19, title: 'S3 Storage', description: 'Work with cloud storage', difficulty: 'medium', orderIndex: 2 },
      { id: 20, title: 'Lambda Functions', description: 'Serverless computing', difficulty: 'hard', orderIndex: 3 }
    ],
    studentCount: 98,
    createdAt: '2024-02-15',
    updatedAt: '2024-03-05'
  },
  {
    id: 8,
    title: 'UI/UX Design Principles',
    description: 'Master user interface and experience design',
    imageUrl: '/images/ui-ux.jpg',
    level: 'beginner',
    isPublished: true,
    authorId: '8',
    tasks: [
      { id: 21, title: 'Design Thinking', description: 'Understand design process', difficulty: 'easy', orderIndex: 1 },
      { id: 22, title: 'Wireframing', description: 'Create wireframes and prototypes', difficulty: 'easy', orderIndex: 2 },
      { id: 23, title: 'User Testing', description: 'Conduct usability tests', difficulty: 'medium', orderIndex: 3 }
    ],
    studentCount: 267,
    createdAt: '2024-01-20',
    updatedAt: '2024-02-25'
  },
  {
    id: 9,
    title: 'DevOps and CI/CD',
    description: 'Automate development and deployment processes',
    imageUrl: '/images/devops.jpg',
    level: 'advanced',
    isPublished: false,
    authorId: '6',
    tasks: [
      { id: 24, title: 'Docker Containers', description: 'Containerize applications', difficulty: 'medium', orderIndex: 1 },
      { id: 25, title: 'Kubernetes', description: 'Orchestrate containers', difficulty: 'hard', orderIndex: 2 },
      { id: 26, title: 'GitHub Actions', description: 'Set up CI/CD pipelines', difficulty: 'hard', orderIndex: 3 }
    ],
    studentCount: 67,
    createdAt: '2024-02-20',
    updatedAt: '2024-03-12'
  },
  {
    id: 10,
    title: 'Machine Learning Basics',
    description: 'Introduction to machine learning concepts',
    imageUrl: '/images/ml.jpg',
    level: 'intermediate',
    isPublished: true,
    authorId: '14',
    tasks: [
      { id: 27, title: 'Linear Regression', description: 'Implement linear regression', difficulty: 'medium', orderIndex: 1 },
      { id: 28, title: 'Classification', description: 'Build classification models', difficulty: 'medium', orderIndex: 2 },
      { id: 29, title: 'Neural Networks', description: 'Introduction to neural networks', difficulty: 'hard', orderIndex: 3 },
      { id: 30, title: 'Model Evaluation', description: 'Evaluate model performance', difficulty: 'medium', orderIndex: 4 }
    ],
    studentCount: 178,
    createdAt: '2024-02-08',
    updatedAt: '2024-03-08'
  }
];

const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Variables and Data Types',
    description: 'Learn about variables and different data types in JavaScript',
    initialCode: '// Declare variables here\nlet name = "John";\nconst age = 25;',
    testCases: '[]',
    difficulty: 'easy',
    type: 'javascript',
    orderIndex: 1,
    estimatedMinutes: 15,
    content: 'In this task, you will learn about JavaScript variables...',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-15'
  },
  {
    id: 2,
    title: 'Functions Basics',
    description: 'Understand how to create and use functions',
    initialCode: 'function greet(name) {\n  // Your code here\n}',
    testCases: '[]',
    difficulty: 'easy',
    type: 'javascript',
    orderIndex: 2,
    estimatedMinutes: 20,
    content: 'Learn about function declaration and invocation...',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-18'
  },
  {
    id: 3,
    title: 'Components and Props',
    description: 'Learn React components and props',
    initialCode: 'function Welcome(props) {\n  return <h1>Hello, {props.name}</h1>;\n}',
    testCases: '[]',
    difficulty: 'easy',
    type: 'react',
    orderIndex: 1,
    estimatedMinutes: 25,
    content: 'Create your first React component...',
    createdAt: '2024-01-20',
    updatedAt: '2024-01-25'
  },
  {
    id: 4,
    title: 'State and Lifecycle',
    description: 'Understand state and component lifecycle',
    initialCode: 'function Timer() {\n  const [seconds, setSeconds] = useState(0);\n  // Your code here\n}',
    testCases: '[]',
    difficulty: 'medium',
    type: 'react',
    orderIndex: 2,
    estimatedMinutes: 30,
    content: 'Learn about React state and lifecycle methods...',
    createdAt: '2024-01-22',
    updatedAt: '2024-01-28'
  },
  {
    id: 5,
    title: 'Hooks Deep Dive',
    description: 'Master React hooks',
    initialCode: 'function DataFetcher() {\n  // Use useEffect hook here\n}',
    testCases: '[]',
    difficulty: 'medium',
    type: 'react',
    orderIndex: 3,
    estimatedMinutes: 35,
    content: 'Deep dive into React hooks...',
    createdAt: '2024-01-25',
    updatedAt: '2024-01-30'
  },
  {
    id: 6,
    title: 'Express.js Setup',
    description: 'Set up Express.js server',
    initialCode: 'const express = require("express");\nconst app = express();\n// Your code here',
    testCases: '[]',
    difficulty: 'easy',
    type: 'nodejs',
    orderIndex: 1,
    estimatedMinutes: 20,
    content: 'Set up a basic Express.js server...',
    createdAt: '2024-01-28',
    updatedAt: '2024-02-02'
  },
  {
    id: 7,
    title: 'REST API Design',
    description: 'Design RESTful APIs',
    initialCode: 'app.get("/api/users", (req, res) => {\n  // Your code here\n});',
    testCases: '[]',
    difficulty: 'medium',
    type: 'nodejs',
    orderIndex: 2,
    estimatedMinutes: 40,
    content: 'Learn REST API design principles...',
    createdAt: '2024-01-30',
    updatedAt: '2024-02-05'
  },
  {
    id: 8,
    title: 'Database Integration',
    description: 'Integrate with MongoDB',
    initialCode: 'const mongoose = require("mongoose");\n// Connect to MongoDB',
    testCases: '[]',
    difficulty: 'medium',
    type: 'nodejs',
    orderIndex: 3,
    estimatedMinutes: 45,
    content: 'Integrate MongoDB with your Express app...',
    createdAt: '2024-02-02',
    updatedAt: '2024-02-08'
  },
  {
    id: 9,
    title: 'Python Basics',
    description: 'Python syntax and fundamentals',
    initialCode: '# Write your first Python program\nprint("Hello, World!")',
    testCases: '[]',
    difficulty: 'easy',
    type: 'python',
    orderIndex: 1,
    estimatedMinutes: 15,
    content: 'Learn Python basic syntax...',
    createdAt: '2024-02-05',
    updatedAt: '2024-02-10'
  },
  {
    id: 10,
    title: 'Pandas Introduction',
    description: 'Data manipulation with Pandas',
    initialCode: 'import pandas as pd\n# Create a DataFrame',
    testCases: '[]',
    difficulty: 'medium',
    type: 'python',
    orderIndex: 2,
    estimatedMinutes: 35,
    content: 'Introduction to Pandas library...',
    createdAt: '2024-02-08',
    updatedAt: '2024-02-13'
  },
  {
    id: 11,
    title: 'Data Visualization',
    description: 'Create charts with Matplotlib',
    initialCode: 'import matplotlib.pyplot as plt\n# Create a simple plot',
    testCases: '[]',
    difficulty: 'medium',
    type: 'python',
    orderIndex: 3,
    estimatedMinutes: 30,
    content: 'Learn data visualization techniques...',
    createdAt: '2024-02-10',
    updatedAt: '2024-02-15'
  },
  {
    id: 12,
    title: 'Sorting Algorithms',
    description: 'Implement various sorting algorithms',
    initialCode: 'function bubbleSort(arr) {\n  // Implement bubble sort\n}',
    testCases: '[]',
    difficulty: 'medium',
    type: 'algorithms',
    orderIndex: 1,
    estimatedMinutes: 50,
    content: 'Learn and implement sorting algorithms...',
    createdAt: '2024-02-12',
    updatedAt: '2024-02-18'
  },
  {
    id: 13,
    title: 'Graph Theory',
    description: 'Graph algorithms and traversal',
    initialCode: 'function bfs(graph, start) {\n  // Implement BFS\n}',
    testCases: '[]',
    difficulty: 'hard',
    type: 'algorithms',
    orderIndex: 2,
    estimatedMinutes: 60,
    content: 'Graph algorithms and traversal methods...',
    createdAt: '2024-02-15',
    updatedAt: '2024-02-20'
  },
  {
    id: 14,
    title: 'Dynamic Programming',
    description: 'Solve problems with DP',
    initialCode: 'function fibonacci(n) {\n  // Implement with DP\n}',
    testCases: '[]',
    difficulty: 'hard',
    type: 'algorithms',
    orderIndex: 3,
    estimatedMinutes: 55,
    content: 'Dynamic programming problem solving...',
    createdAt: '2024-02-18',
    updatedAt: '2024-02-23'
  },
  {
    id: 15,
    title: 'React Native Setup',
    description: 'Set up development environment',
    initialCode: '// Set up React Native project',
    testCases: '[]',
    difficulty: 'easy',
    type: 'react-native',
    orderIndex: 1,
    estimatedMinutes: 25,
    content: 'Set up React Native development environment...',
    createdAt: '2024-02-20',
    updatedAt: '2024-02-25'
  },
  {
    id: 16,
    title: 'Navigation',
    description: 'Implement app navigation',
    initialCode: '// Set up React Navigation',
    testCases: '[]',
    difficulty: 'medium',
    type: 'react-native',
    orderIndex: 2,
    estimatedMinutes: 40,
    content: 'Implement navigation in React Native app...',
    createdAt: '2024-02-22',
    updatedAt: '2024-02-27'
  },
  {
    id: 17,
    title: 'Native Modules',
    description: 'Work with native device features',
    initialCode: '// Access device camera',
    testCases: '[]',
    difficulty: 'hard',
    type: 'react-native',
    orderIndex: 3,
    estimatedMinutes: 50,
    content: 'Work with native device modules...',
    createdAt: '2024-02-25',
    updatedAt: '2024-03-01'
  },
  {
    id: 18,
    title: 'EC2 Instances',
    description: 'Deploy virtual servers',
    initialCode: '# AWS CLI commands for EC2',
    testCases: '[]',
    difficulty: 'medium',
    type: 'aws',
    orderIndex: 1,
    estimatedMinutes: 35,
    content: 'Deploy and manage EC2 instances...',
    createdAt: '2024-02-28',
    updatedAt: '2024-03-04'
  },
  {
    id: 19,
    title: 'S3 Storage',
    description: 'Work with cloud storage',
    initialCode: '# S3 bucket operations',
    testCases: '[]',
    difficulty: 'medium',
    type: 'aws',
    orderIndex: 2,
    estimatedMinutes: 30,
    content: 'Work with AWS S3 storage...',
    createdAt: '2024-03-02',
    updatedAt: '2024-03-07'
  },
  {
    id: 20,
    title: 'Lambda Functions',
    description: 'Serverless computing',
    initialCode: '// AWS Lambda function',
    testCases: '[]',
    difficulty: 'hard',
    type: 'aws',
    orderIndex: 3,
    estimatedMinutes: 45,
    content: 'Create and deploy Lambda functions...',
    createdAt: '2024-03-05',
    updatedAt: '2024-03-10'
  },
  {
    id: 21,
    title: 'Design Thinking',
    description: 'Understand design process',
    initialCode: '// No code - design exercise',
    testCases: '[]',
    difficulty: 'easy',
    type: 'design',
    orderIndex: 1,
    estimatedMinutes: 20,
    content: 'Learn design thinking methodology...',
    createdAt: '2024-03-08',
    updatedAt: '2024-03-12'
  },
  {
    id: 22,
    title: 'Wireframing',
    description: 'Create wireframes and prototypes',
    initialCode: '// Design wireframes',
    testCases: '[]',
    difficulty: 'easy',
    type: 'design',
    orderIndex: 2,
    estimatedMinutes: 25,
    content: 'Create wireframes for your application...',
    createdAt: '2024-03-10',
    updatedAt: '2024-03-15'
  },
  {
    id: 23,
    title: 'User Testing',
    description: 'Conduct usability tests',
    initialCode: '// Plan user testing',
    testCases: '[]',
    difficulty: 'medium',
    type: 'design',
    orderIndex: 3,
    estimatedMinutes: 40,
    content: 'Conduct and analyze user testing...',
    createdAt: '2024-03-12',
    updatedAt: '2024-03-17'
  },
  {
    id: 24,
    title: 'Docker Containers',
    description: 'Containerize applications',
    initialCode: '# Dockerfile content',
    testCases: '[]',
    difficulty: 'medium',
    type: 'devops',
    orderIndex: 1,
    estimatedMinutes: 35,
    content: 'Containerize your application with Docker...',
    createdAt: '2024-03-15',
    updatedAt: '2024-03-20'
  },
  {
    id: 25,
    title: 'Kubernetes',
    description: 'Orchestrate containers',
    initialCode: '# Kubernetes deployment.yaml',
    testCases: '[]',
    difficulty: 'hard',
    type: 'devops',
    orderIndex: 2,
    estimatedMinutes: 55,
    content: 'Deploy applications with Kubernetes...',
    createdAt: '2024-03-18',
    updatedAt: '2024-03-23'
  },
  {
    id: 26,
    title: 'GitHub Actions',
    description: 'Set up CI/CD pipelines',
    initialCode: '# GitHub Actions workflow',
    testCases: '[]',
    difficulty: 'hard',
    type: 'devops',
    orderIndex: 3,
    estimatedMinutes: 45,
    content: 'Set up continuous integration...',
    createdAt: '2024-03-20',
    updatedAt: '2024-03-25'
  },
  {
    id: 27,
    title: 'Linear Regression',
    description: 'Implement linear regression',
    initialCode: 'import numpy as np\n# Implement linear regression',
    testCases: '[]',
    difficulty: 'medium',
    type: 'machine-learning',
    orderIndex: 1,
    estimatedMinutes: 50,
    content: 'Implement linear regression from scratch...',
    createdAt: '2024-03-22',
    updatedAt: '2024-03-27'
  },
  {
    id: 28,
    title: 'Classification',
    description: 'Build classification models',
    initialCode: 'from sklearn.ensemble import RandomForestClassifier\n# Build classifier',
    testCases: '[]',
    difficulty: 'medium',
    type: 'machine-learning',
    orderIndex: 2,
    estimatedMinutes: 45,
    content: 'Build and train classification models...',
    createdAt: '2024-03-25',
    updatedAt: '2024-03-30'
  },
  {
    id: 29,
    title: 'Neural Networks',
    description: 'Introduction to neural networks',
    initialCode: 'import tensorflow as tf\n# Build neural network',
    testCases: '[]',
    difficulty: 'hard',
    type: 'machine-learning',
    orderIndex: 3,
    estimatedMinutes: 60,
    content: 'Introduction to neural networks...',
    createdAt: '2024-03-28',
    updatedAt: '2024-04-02'
  },
  {
    id: 30,
    title: 'Model Evaluation',
    description: 'Evaluate model performance',
    initialCode: 'from sklearn.metrics import accuracy_score\n# Evaluate model',
    testCases: '[]',
    difficulty: 'medium',
    type: 'machine-learning',
    orderIndex: 4,
    estimatedMinutes: 35,
    content: 'Evaluate machine learning models...',
    createdAt: '2024-03-30',
    updatedAt: '2024-04-04'
  }
];

const initialRatingUsers: RatingUser[] = [
  { id: '1', name: 'boby', avatar: '/avatars/boby.jpg', value: 95 },
  { id: '2', name: 'boby2', avatar: null, value: 87 },
  { id: '3', name: 'ilya', avatar: '/avatars/ilya.jpg', value: 92 },
  { id: '4', name: 'artem', avatar: null, value: 78 },
  { id: '5', name: 'klim', avatar: '/avatars/klim.jpg', value: 85 },
  { id: '6', name: 'ilya2', avatar: null, value: 91 },
  { id: '7', name: '123', avatar: '/avatars/123.jpg', value: 67 },
  { id: '8', name: 'asdasd', avatar: null, value: 74 },
  { id: '9', name: 'alex', avatar: '/avatars/alex.jpg', value: 98 },
  { id: '10', name: 'maria', avatar: null, value: 89 },
  { id: '11', name: 'serg', avatar: '/avatars/serg.jpg', value: 83 },
  { id: '12', name: 'olga', avatar: null, value: 76 },
  { id: '13', name: 'dmitry', avatar: '/avatars/dmitry.jpg', value: 90 },
  { id: '14', name: 'anna', avatar: null, value: 94 },
  { id: '15', name: 'viktor', avatar: '/avatars/viktor.jpg', value: 81 },
  { id: '16', name: 'natalia', avatar: null, value: 79 },
  { id: '17', name: 'pavel', avatar: '/avatars/pavel.jpg', value: 86 },
  { id: '18', name: 'elena', avatar: null, value: 72 },
  { id: '19', name: 'mikhail', avatar: '/avatars/mikhail.jpg', value: 96 },
  { id: '20', name: 'irina', avatar: null, value: 88 }
];

// Стили
const styles = {
  page: {
    minHeight: '100vh',
    // backgroundColor: '#f9fafb',
    padding: '24px'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  header: {
    marginBottom: '8px'
  },
  title: {
    fontSize: '30px',
    fontWeight: 'bold',
    margin: 0
  },
  subtitle: {
    // color: '#6b7280',
    margin: '0 0 24px 0'
  },
  tabsContainer: {
    display: 'flex',
    borderBottom: '1px solid #e5e7eb',
    marginBottom: '24px'
  },
  tab: {
    padding: '12px 24px',
    fontWeight: '500',
    borderRadius: '8px 8px 0 0',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  activeTab: {
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderBottom: 'none',
    color: '#2563eb'
  },
  inactiveTab: {
    // color: '#6b7280'

  },
  contentCard: {
    borderRadius: '8px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
    overflow: 'hidden'
  },
  contentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    padding: '24px 24px 0 24px'
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    margin: 0
  },
  count: {
    fontSize: '14px',
    // color: '#6b7280'
  },
  tableContainer: {
    overflowX: 'auto' as const
  },
  table: {
    width: '100%',
    backgroundColor: 'white',
    borderCollapse: 'collapse' as const
  },
  tableHead: {
    backgroundColor: '#f3f4f6'
  },
  tableHeader: {
    padding: '12px 16px',
    textAlign: 'left' as const,
    border: '1px solid #e5e7eb',
    fontWeight: '600',
    color: '#212529'
  },
  tableCell: {
    padding: '8px 16px',
    border: '1px solid #e5e7eb',
    color: '#212529'
  },
  tableRow: {
    transition: 'background-color 0.2s'
  },
  tableRowHover: {
    // backgroundColor: '#f9fafb'
  },
  badge: {
    padding: '4px 8px',
    borderRadius: '16px',
    fontSize: '12px',
    fontWeight: '500',
    display: 'inline-block'
  },
  badgeEasy: {
    backgroundColor: '#dcfce7',
    color: '#166534'
  },
  badgeMedium: {
    backgroundColor: '#fef3c7',
    color: '#92400e'
  },
  badgeHard: {
    backgroundColor: '#fee2e2',
    color: '#991b1b'
  },
  badgeBeginner: {
    backgroundColor: '#dcfce7',
    color: '#166534'
  },
  badgeAdvanced: {
    backgroundColor: '#fee2e2',
    color: '#991b1b'
  },
  badgePublished: {
    backgroundColor: '#dbeafe',
    color: '#1e40af'
  },
  badgeDraft: {
    backgroundColor: '#f3f4f6',
    color: '#374151'
  },
  buttonGroup: {
    display: 'flex',
    gap: '8px'
  },
  button: {
    padding: '6px 12px',
    borderRadius: '4px',
    border: 'none',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  buttonPrimary: {
    backgroundColor: '#3b82f6',
    color: 'white'
  },
  buttonDanger: {
    backgroundColor: '#ef4444',
    color: 'white'
  },
  buttonHoverPrimary: {
    backgroundColor: '#2563eb'
  },
  buttonHoverDanger: {
    backgroundColor: '#dc2626'
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    objectFit: 'cover' as const
  },
  avatarPlaceholder: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#d1d5db',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px'
  },
  roleBadge: {
    padding: '4px 8px',
    backgroundColor: '#f3e8ff',
    // color: '#6b21a8',
    borderRadius: '16px',
    fontSize: '12px',
    margin: '2px'
  },
  progressBar: {
    width: '100%',
    borderRadius: '4px',
    height: '8px'
  },
  progressFill: {
    height: '100%',
    borderRadius: '4px',
    backgroundColor: '#10b981'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
    marginTop: '32px'
  },
  statCard: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb'
  },
  statHeader: {
    display: 'flex',
    alignItems: 'center'
  },
  statIcon: {
    padding: '12px',
    borderRadius: '8px'
  },
  statContent: {
    marginLeft: '16px'
  },
  statLabel: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#6b7280',
    margin: 0
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#111827',
    margin: 0
  },
  truncatedText: {
    maxWidth: '200px',
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
};

// Компоненты таблиц
const CoursesTable: React.FC<{
  courses: Course[];
  onEdit: (course: Course) => void;
  onDelete: (id: number) => void;
}> = ({ courses, onEdit, onDelete }) => {
  const getLevelBadgeStyle = (level: string) => {
    switch (level) {
      case 'beginner': return { ...styles.badge, ...styles.badgeBeginner };
      case 'advanced': return { ...styles.badge, ...styles.badgeAdvanced };
      default: return { ...styles.badge, ...styles.badgeMedium };
    }
  };

  const getStatusBadgeStyle = (isPublished: boolean) => {
    return isPublished 
      ? { ...styles.badge, ...styles.badgePublished }
      : { ...styles.badge, ...styles.badgeDraft };
  };

  return (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead style={styles.tableHead}>
          <tr>
            <th style={styles.tableHeader}>ID</th>
            <th style={styles.tableHeader}>Title</th>
            <th style={styles.tableHeader}>Description</th>
            <th style={styles.tableHeader}>Level</th>
            <th style={styles.tableHeader}>Tasks</th>
            <th style={styles.tableHeader}>Published</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr 
              key={course.id} 
              style={styles.tableRow}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = styles.tableRowHover.backgroundColor as string;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              <td style={styles.tableCell}>{course.id}</td>
              <td style={{...styles.tableCell, fontWeight: '500'}}>{course.title}</td>
              <td style={{...styles.tableCell, ...styles.truncatedText}}>
                {course.description}
              </td>
              <td style={styles.tableCell}>
                <span style={getLevelBadgeStyle(course.level)}>
                  {course.level}
                </span>
              </td>
              <td style={styles.tableCell}>
                <div style={{fontSize: '14px'}}>
                  {course.tasks.length} tasks
                  <div style={{fontSize: '12px'}}>
                    {course.tasks.map(task => task.title).join(', ')}
                  </div>
                </div>
              </td>
              <td style={styles.tableCell}>
                <span style={getStatusBadgeStyle(course.isPublished)}>
                  {course.isPublished ? 'Published' : 'Draft'}
                </span>
              </td>
              <td style={styles.tableCell}>
                <div style={styles.buttonGroup}>
                  <button
                    onClick={() => onEdit(course)}
                    style={styles.buttonPrimary}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = styles.buttonHoverPrimary.backgroundColor as string;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = styles.buttonPrimary.backgroundColor as string;
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(course.id)}
                    style={styles.buttonDanger}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = styles.buttonHoverDanger.backgroundColor as string;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = styles.buttonDanger.backgroundColor as string;
                    }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TasksTable: React.FC<{
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}> = ({ tasks, onEdit, onDelete }) => {
  const getDifficultyBadgeStyle = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return { ...styles.badge, ...styles.badgeEasy };
      case 'medium': return { ...styles.badge, ...styles.badgeMedium };
      case 'hard': return { ...styles.badge, ...styles.badgeHard };
      default: return { ...styles.badge, ...styles.badgeMedium };
    }
  };

  return (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead style={styles.tableHead}>
          <tr>
            <th style={styles.tableHeader}>ID</th>
            <th style={styles.tableHeader}>Title</th>
            <th style={styles.tableHeader}>Description</th>
            <th style={styles.tableHeader}>Difficulty</th>
            <th style={styles.tableHeader}>Type</th>
            <th style={styles.tableHeader}>Order</th>
            <th style={styles.tableHeader}>Minutes</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr 
              key={task.id}
              style={styles.tableRow}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = styles.tableRowHover.backgroundColor as string;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              <td style={styles.tableCell}>{task.id}</td>
              <td style={{...styles.tableCell, fontWeight: '500'}}>{task.title}</td>
              <td style={{...styles.tableCell, ...styles.truncatedText}}>
                {task.description}
              </td>
              <td style={styles.tableCell}>
                <span style={getDifficultyBadgeStyle(task.difficulty)}>
                  {task.difficulty}
                </span>
              </td>
              <td style={styles.tableCell}>{task.type}</td>
              <td style={styles.tableCell}>{task.orderIndex}</td>
              <td style={styles.tableCell}>{task.estimatedMinutes}</td>
              <td style={styles.tableCell}>
                <div style={styles.buttonGroup}>
                  <button
                    onClick={() => onEdit(task)}
                    style={styles.buttonPrimary}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = styles.buttonHoverPrimary.backgroundColor as string;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = styles.buttonPrimary.backgroundColor as string;
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(task.id)}
                    style={styles.buttonDanger}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = styles.buttonHoverDanger.backgroundColor as string;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = styles.buttonDanger.backgroundColor as string;
                    }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const UsersTable: React.FC<{
  users: UserResponse[];
  onEdit: (user: UserResponse) => void;
  onDelete: (id: string) => void;
}> = ({ users, onEdit, onDelete }) => {
  return (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead style={styles.tableHead}>
          <tr>
            <th style={styles.tableHeader}>ID</th>
            <th style={styles.tableHeader}>Username</th>
            <th style={styles.tableHeader}>Email</th>
            <th style={styles.tableHeader}>Avatar</th>
            <th style={styles.tableHeader}>Roles</th>
            <th style={styles.tableHeader}>Bio</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr 
              key={user.id}
              style={styles.tableRow}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = styles.tableRowHover.backgroundColor as string;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              <td style={styles.tableCell}>{user.id}</td>
              <td style={{...styles.tableCell, fontWeight: '500'}}>{user.username}</td>
              <td style={styles.tableCell}>{user.email}</td>
              <td style={styles.tableCell}>
                {user.avatarUrl ? (
                  <img 
                    src={user.avatarUrl} 
                    alt={user.username} 
                    style={styles.avatar}
                  />
                ) : (
                  <div style={styles.avatarPlaceholder}>
                    No
                  </div>
                )}
              </td>
              <td style={styles.tableCell}>
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                  {user.roles.map((role, index) => (
                    <span key={index} style={styles.roleBadge}>
                      {role}
                    </span>
                  ))}
                </div>
              </td>
              <td style={{...styles.tableCell, ...styles.truncatedText}}>
                {user.bio || 'No bio'}
              </td>
              <td style={styles.tableCell}>
                <div style={styles.buttonGroup}>
                  <button
                    onClick={() => onEdit(user)}
                    style={styles.buttonPrimary}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = styles.buttonHoverPrimary.backgroundColor as string;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = styles.buttonPrimary.backgroundColor as string;
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    style={styles.buttonDanger}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = styles.buttonHoverDanger.backgroundColor as string;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = styles.buttonDanger.backgroundColor as string;
                    }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const RatingTable: React.FC<{
  users: RatingUser[];
  onEdit: (user: RatingUser) => void;
  onDelete: (id: string) => void;
}> = ({ users, onEdit, onDelete }) => {
  return (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead style={styles.tableHead}>
          <tr>
            <th style={styles.tableHeader}>ID</th>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Avatar</th>
            <th style={styles.tableHeader}>Rating</th>
            <th style={styles.tableHeader}>Progress</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr 
              key={user.id}
              style={styles.tableRow}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = styles.tableRowHover.backgroundColor as string;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              <td style={styles.tableCell}>{user.id}</td>
              <td style={{...styles.tableCell, fontWeight: '500'}}>{user.name}</td>
              <td style={styles.tableCell}>
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    style={styles.avatar}
                  />
                ) : (
                  <div style={styles.avatarPlaceholder}>
                    No
                  </div>
                )}
              </td>
              <td style={{...styles.tableCell, fontWeight: 'bold'}}>{user.value}</td>
              <td style={styles.tableCell}>
                <div style={styles.progressBar}>
                  <div 
                    style={{
                      ...styles.progressFill,
                      width: `${user.value}%`
                    }}
                  ></div>
                </div>
              </td>
              <td style={styles.tableCell}>
                <div style={styles.buttonGroup}>
                  <button
                    onClick={() => onEdit(user)}
                    style={styles.buttonPrimary}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = styles.buttonHoverPrimary.backgroundColor as string;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = styles.buttonPrimary.backgroundColor as string;
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    style={styles.buttonDanger}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = styles.buttonHoverDanger.backgroundColor as string;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = styles.buttonDanger.backgroundColor as string;
                    }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Основной компонент админ-панели
export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'courses' | 'tasks' | 'users' | 'rating'>('courses');
  // В начале компонента AdminPage добавляем состояния
const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
const [eventForm, setEventForm] = useState<EventFormData>({
  title: '',
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
  userName: ''
});

// Обработчики для формы
const handleOpenAddPopup = () => {
  setIsAddPopupOpen(true);
};

const handleCloseAddPopup = () => {
  setIsAddPopupOpen(false);
  setEventForm({
    title: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    userName: ''
  });
};
 interface EventFormData {
  title: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  userName: string;
}

const handleEventFormChange = (field: keyof EventFormData, value: string) => {
  setEventForm(prev => ({
    ...prev,
    [field]: value
  }));
};

const handleAddEvent = () => {
  // Заглушка - просто выводим данные в консоль
  console.log('Добавляем событие:', eventForm);
  alert(`Событие "${eventForm.title}" добавлено!\n(это заглушка)`);
  handleCloseAddPopup();
};

// Получаем заголовок для попапа в зависимости от активного таба
const getPopupTitle = () => {
  switch (activeTab) {
    case 'courses': return 'Добавить курс';
    case 'tasks': return 'Добавить задачу';
    case 'users': return 'Добавить пользователя';
    case 'rating': return 'Добавить рейтинг';
    default: return 'Добавить событие';
  }
};

const getButtonLabel = () => {
  switch (activeTab) {
    case 'courses': return 'Добавить курс';
    case 'tasks': return 'Добавить задачу';
    case 'users': return 'Добавить пользователя';
    case 'rating': return 'Добавить рейтинг';
    default: return 'Добавить';
  }
};

  // Состояния для данных
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [users, setUsers] = useState<UserResponse[]>(initialUsers);
  const [ratingUsers, setRatingUsers] = useState<RatingUser[]>(initialRatingUsers);

  // Обработчики для курсов
  const handleEditCourse = (course: Course) => {
    const newTitle = prompt('Edit course title:', course.title);
    if (newTitle) {
      setCourses(courses.map(c => 
        c.id === course.id ? { ...c, title: newTitle } : c
      ));
    }
  };

  const handleDeleteCourse = (id: number) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  // Обработчики для задач
  const handleEditTask = (task: Task) => {
    const newTitle = prompt('Edit task title:', task.title);
    if (newTitle) {
      setTasks(tasks.map(t => 
        t.id === task.id ? { ...t, title: newTitle } : t
      ));
    }
  };

  const handleDeleteTask = (id: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  // Обработчики для пользователей
  const handleEditUser = (user: UserResponse) => {
    const newUsername = prompt('Edit username:', user.username);
    if (newUsername) {
      setUsers(users.map(u => 
        u.id === user.id ? { ...u, username: newUsername } : u
      ));
    }
  };

  const handleDeleteUser = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  // Обработчики для рейтинга
  const handleEditRatingUser = (user: RatingUser) => {
    const newValue = prompt('Edit rating value:', user.value.toString());
    if (newValue && !isNaN(Number(newValue))) {
      const numValue = Number(newValue);
      if (numValue >= 0 && numValue <= 100) {
        setRatingUsers(ratingUsers.map(u => 
          u.id === user.id ? { ...u, value: numValue } : u
        ));
      } else {
        alert('Rating value must be between 0 and 100');
      }
    }
  };

  const handleDeleteRatingUser = (id: string) => {
    if (window.confirm('Are you sure you want to delete this rating user?')) {
      setRatingUsers(ratingUsers.filter(u => u.id !== id));
    }
  };

  const tabs = ['courses', 'tasks', 'users', 'rating'] as const;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Admin Panel</h1>
          <p style={styles.subtitle}>Manage your platform content and users</p>
        </div>
        
        {/* Навигация по табам */}
        <div style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <button
              key={tab}
              className='faststyle1'
              style={{
                ...styles.tab,
                ...(activeTab === tab ? styles.activeTab : styles.inactiveTab)
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Контент в зависимости от активного таба */}
        <div style={styles.contentCard}>
          {activeTab === 'courses' && (
            <div style={{padding: '24px'}}>
              <div style={styles.contentHeader}>
                <h2 style={styles.sectionTitle}>Courses Management</h2>
                <span style={styles.count}>
                  {courses.length} course{courses.length !== 1 ? 's' : ''}
                </span>
              </div>
              <CoursesTable
                courses={courses}
                onEdit={handleEditCourse}
                onDelete={handleDeleteCourse}
              />
            </div>
          )}
          
          {activeTab === 'tasks' && (
            <div style={{padding: '24px'}}>
              <AddButton 
      onClick={handleOpenAddPopup}
      label={getButtonLabel()}
    />
              
              <AddEventPopup
  isOpen={isAddPopupOpen}
  onClose={handleCloseAddPopup}
  formData={eventForm}
  onFormChange={handleEventFormChange}
  onSubmit={handleAddEvent}
  title={getPopupTitle()}
/>
              <div style={styles.contentHeader}>
                <h2 style={styles.sectionTitle}>Tasks Management</h2>
                <span style={styles.count}>
                  {tasks.length} task{tasks.length !== 1 ? 's' : ''}
                </span>
              </div>
              <TasksTable
                tasks={tasks}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            </div>
          )}
          
          {activeTab === 'users' && (
            <div style={{padding: '24px'}}>
              <div style={styles.contentHeader}>
                <h2 style={styles.sectionTitle}>Users Management</h2>
                <span style={styles.count}>
                  {users.length} user{users.length !== 1 ? 's' : ''}
                </span>
              </div>
              <UsersTable
                users={users}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
              />
            </div>
          )}
          
          {activeTab === 'rating' && (
            <div style={{padding: '24px'}}>
              <div style={styles.contentHeader}>
                <h2 style={styles.sectionTitle}>Rating Management</h2>
                <span style={styles.count}>
                  {ratingUsers.length} user{ratingUsers.length !== 1 ? 's' : ''}
                </span>
              </div>
              <RatingTable
                users={ratingUsers}
                onEdit={handleEditRatingUser}
                onDelete={handleDeleteRatingUser}
              />
            </div>
          )}
        </div>

        {/* Статистика */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statHeader}>
              <div style={{...styles.statIcon, backgroundColor: '#dbeafe'}}>
                <svg style={{width: '24px', height: '24px', color: '#3b82f6'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div style={styles.statContent}>
                <h3 style={styles.statLabel}>Total Courses</h3>
                <p style={styles.statValue}>{courses.length}</p>
              </div>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statHeader}>
              <div style={{...styles.statIcon, backgroundColor: '#dcfce7'}}>
                <svg style={{width: '24px', height: '24px', color: '#16a34a'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div style={styles.statContent}>
                <h3 style={styles.statLabel}>Total Tasks</h3>
                <p style={styles.statValue}>{tasks.length}</p>
              </div>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statHeader}>
              <div style={{...styles.statIcon, backgroundColor: '#f3e8ff'}}>
                
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{width: '24px', height: '24px', color: '#9333ea'}}>
<path d="M18 7.16C17.94 7.15 17.87 7.15 17.81 7.16C16.43 7.11 15.33 5.98 15.33 4.58C15.33 3.15 16.48 2 17.91 2C19.34 2 20.49 3.16 20.49 4.58C20.48 5.98 19.38 7.11 18 7.16Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.9699 14.44C18.3399 14.67 19.8499 14.43 20.9099 13.72C22.3199 12.78 22.3199 11.24 20.9099 10.3C19.8399 9.59004 18.3099 9.35003 16.9399 9.59003"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.96998 7.16C6.02998 7.15 6.09998 7.15 6.15998 7.16C7.53998 7.11 8.63998 5.98 8.63998 4.58C8.63998 3.15 7.48998 2 6.05998 2C4.62998 2 3.47998 3.16 3.47998 4.58C3.48998 5.98 4.58998 7.11 5.96998 7.16Z"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.99994 14.44C5.62994 14.67 4.11994 14.43 3.05994 13.72C1.64994 12.78 1.64994 11.24 3.05994 10.3C4.12994 9.59004 5.65994 9.35003 7.02994 9.59003"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 14.63C11.94 14.62 11.87 14.62 11.81 14.63C10.43 14.58 9.32996 13.45 9.32996 12.05C9.32996 10.62 10.48 9.46997 11.91 9.46997C13.34 9.46997 14.49 10.63 14.49 12.05C14.48 13.45 13.38 14.59 12 14.63Z"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.08997 17.78C7.67997 18.72 7.67997 20.26 9.08997 21.2C10.69 22.27 13.31 22.27 14.91 21.2C16.32 20.26 16.32 18.72 14.91 17.78C13.32 16.72 10.69 16.72 9.08997 17.78Z"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
              </div>
              <div style={styles.statContent}>
                <h3 style={styles.statLabel}>Total Users</h3>
                <p style={styles.statValue}>{users.length}</p>
              </div>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statHeader}>
              <div style={{...styles.statIcon, backgroundColor: '#ffedd5'}}>
                <svg style={{width: '24px', height: '24px', color: '#ea580c'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div style={styles.statContent}>
                <h3 style={styles.statLabel}>Rating Users</h3>
                <p style={styles.statValue}>{ratingUsers.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;