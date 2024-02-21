"use client"
import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";

const inter = Inter({ subsets: ["latin"] });

const RootLayout: React.FC = ({ children }: any) => {
  return (
    <html lang="en">
      <Provider store={store}>
        <body className={inter.className}>{children}</body>
      </Provider>
    </html>
  );
};

export default RootLayout;
