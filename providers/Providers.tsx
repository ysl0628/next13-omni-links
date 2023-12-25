'use client'

import React, { FC, useEffect } from 'react'
import { ThemeProvider } from 'next-themes'

import { type ThemeProviderProps } from 'next-themes/dist/types'
import ToasterProvider from './ToastProvider'
import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk'
import { TracingInstrumentation } from '@grafana/faro-web-tracing'

const faroInit = () => {
  if (typeof window !== 'undefined') {
    const faro = initializeFaro({
      url: 'https://faro-collector-prod-ap-southeast-1.grafana.net/collect/211d4c70d3ffbc4147c59c2e4631ea84',
      app: {
        name: 'linkOrchard',
        version: '1.0.0',
        environment: process.env.NODE_ENV
      },
      sessionTracking: {
        enabled: true,
        samplingRate: 0.5
      },
      instrumentations: [
        // Mandatory, overwriting the instrumentations array would cause the default instrumentations to be omitted
        ...getWebInstrumentations(),

        // Initialization of the tracing package.
        // This packages is optional because it increases the bundle size noticeably. Only add it if you want tracing data.
        new TracingInstrumentation()
      ]
    })
    return faro
  }
}

const Providers: FC<ThemeProviderProps> = ({ children, ...props }) => {
  useEffect(() => {
    faroInit()
  }, [])
  return (
    <>
      <ToasterProvider />
      {children}
    </>
  )
}

export default Providers
