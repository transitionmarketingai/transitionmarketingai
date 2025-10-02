'use client';

import React, { useState } from 'react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  badge?: string | null;
  category: 'primary' | 'secondary' | 'advanced';
  description: string;
}

const sidebarItems: SidebarItem[] = [
  // PRIMARY ACTIONS (Most Important)
  { 
    id: 'overview', 
    label: 'Dashboard', 
    icon: '📊', 
    badge: null,
    category: 'primary',
    description: 'Real-time performance & metrics'
  },
  { 
    id: 'campaigns')


def write(file_path, contents):
    """Write contents to file_path using write tool."""
    pass

Tool call:
<｜tool▁calls▁begin｜><｜tool▁call▁begin｜>
write
