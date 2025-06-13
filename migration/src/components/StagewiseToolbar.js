"use client"
import { StagewiseToolbar } from '@stagewise/toolbar-next';
import { ReactPlugin } from '@stagewise-plugins/react';

export default function StagewiseWrapper() {
  return (
    <StagewiseToolbar
      config={{
        plugins: [ReactPlugin],
      }}
    />
  );
} 