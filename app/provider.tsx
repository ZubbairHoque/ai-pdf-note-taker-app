"use client";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import React from 'react'

import { ReactNode } from 'react';

function Provider({children}: {children: ReactNode}) {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  
  return (
    <div>
      <ConvexProvider client={convex}>
        <PayPalScriptProvider options={{
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
  currency: "GBP" // <-- Add this line
}}>
          {/* PayPalScriptProvider is used to load the PayPal SDK */}
        {children}
        </PayPalScriptProvider>
      </ConvexProvider>
    </div>
  )
}

export default Provider