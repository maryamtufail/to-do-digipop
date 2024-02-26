"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";

const inter = Inter({ subsets: ["latin"] });

const RootLayout: React.FC = ({ children }: any) => {
  return (
    <html lang="en">
      <Provider store={store}>
        <body className={inter.className} style={{width: "80%", margin: "0 auto"}}>{children}</body>
      </Provider>
    </html>
  );
};

export default RootLayout;
