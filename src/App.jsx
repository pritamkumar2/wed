@@ .. @@
-import React, { useState } from "react";
-import reactLogo from "./assets/react.svg";
-import viteLogo from "/vite.svg";
-import "./App.css";
+import React from 'react';
+import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
+import { AuthProvider } from './contexts/AuthContext';
+import { InvitationProvider } from './contexts/InvitationContext';
+import Header from './components/layout/Header';
+import ProtectedRoute from './components/ProtectedRoute';
+import Landing from './pages/Landing';
+import Login from './pages/Login';
+import Register from './pages/Register';
+import Dashboard from './pages/Dashboard';
+import InvitationCreator from './pages/InvitationCreator';

 function App() {
-  const [count, setCount] = useState(0);
-
   return (
-    <>
-      <div>
-        <a href="https://vite.dev" target="_blank">
-          <img src={viteLogo} className="logo" alt="Vite logo" />
-        </a>
-        <a href="https://react.dev" target="_blank">
-          <img src={reactLogo} className="logo react" alt="React logo" />
-        </a>
-      </div>
-      <h1>Vite + React</h1>
-      <div className="card text-red-500">
-        <button onClick={() => setCount((count) => count + 1)}>
-          count is {count}
-        </button>
-        <p>
-          Edit <code>src/App.jsx</code> and save to test HMR
-        </p>
-      </div>
-      <p className="read-the-docs">
-        Click on the Vite and React logos to learn more
-      </p>
-    </>
+    <AuthProvider>
+      <InvitationProvider>
+        <Router>
+          <div className="min-h-screen bg-gray-50">
+            <Header />
+            <Routes>
+              <Route path="/" element={<Landing />} />
+              <Route path="/login" element={<Login />} />
+              <Route path="/register" element={<Register />} />
+              <Route 
+                path="/dashboard" 
+                element={
+                  <ProtectedRoute>
+                    <Dashboard />
+                  </ProtectedRoute>
+                } 
+              />
+              <Route 
+                path="/create" 
+                element={
+                  <ProtectedRoute>
+                    <InvitationCreator />
+                  </ProtectedRoute>
+                } 
+              />
+            </Routes>
+          </div>
+        </Router>
+      </InvitationProvider>
+    </AuthProvider>
   );
 }