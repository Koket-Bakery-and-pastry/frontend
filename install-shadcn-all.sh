#!/bin/bash

# List of shadcn components (without deprecated toast)
components=(
  accordion alert alert-dialog aspect-ratio avatar badge breadcrumb button calendar card carousel
  chart checkbox collapsible combobox command context-menu data-table date-picker dialog drawer
  dropdown-menu form hover-card input label menubar navigation-menu pagination popover progress
  radio-group resizable scroll-area select separator sheet skeleton slider sonner switch table
  tabs textarea toggle toggle-group tooltip
)

echo "🚀 Installing all shadcn components..."

for comp in "${components[@]}"; do
  echo "👉 Installing $comp..."
  npx shadcn@latest add $comp
done

echo "✅ All components installed successfully!"
