'use client'

import React, { FC, ReactNode, useEffect, useState } from 'react'
import { ThemeProvider } from 'next-themes'

import { type ThemeProviderProps } from 'next-themes/dist/types'

const Providers: FC<ThemeProviderProps> = ({ children, ...props }) => {
  return <ThemeProvider {...props}>{children}</ThemeProvider>
}

export default Providers
