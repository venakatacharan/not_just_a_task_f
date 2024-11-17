'use client'

import React from "react";
import {AuthProvider} from "@/contexts/AuthContext";

export function Providers({
                              children,
                          }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )


}