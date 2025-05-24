#!/bin/bash

# Colors for better output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Root directory for components
COMPONENTS_DIR="src/components"

# Ask for component type first
echo -e "${BLUE}Select component type:${NC}"
echo "1) base (atoms)"
echo "2) element (molecules)"
echo "3) section (organisms)"
echo "4) template (templates)"
read -p "Enter choice (1-4): " COMPONENT_TYPE_CHOICE

# Set component type based on choice
case $COMPONENT_TYPE_CHOICE in
  1) COMPONENT_TYPE="base" ;;
  2) COMPONENT_TYPE="elements" ;;
  3) COMPONENT_TYPE="sections" ;;
  4) COMPONENT_TYPE="templates" ;;
  *) 
    echo -e "${YELLOW}Invalid choice. Exiting.${NC}"
    exit 1
    ;;
esac

# Ask for component name
echo -e "${BLUE}Enter component name (PascalCase recommended, e.g. Button):${NC}"
read COMPONENT_NAME

# Validate component name
if [[ -z "$COMPONENT_NAME" ]]; then
  echo -e "${YELLOW}Component name cannot be empty. Exiting.${NC}"
  exit 1
fi

# Create component directory
COMPONENT_PATH="$COMPONENTS_DIR/$COMPONENT_TYPE/$COMPONENT_NAME"
mkdir -p "$COMPONENT_PATH"

# Create component JSX file
cat > "$COMPONENT_PATH/$COMPONENT_NAME.jsx" << EOF
import React from 'react';
import styles from './$COMPONENT_NAME.module.scss';

const $COMPONENT_NAME = () => {
  return (
    <div className={styles.container}>
      <h1>$COMPONENT_NAME Component</h1>
    </div>
  );
};

export default $COMPONENT_NAME;
EOF

# Create component SCSS module file
cat > "$COMPONENT_PATH/$COMPONENT_NAME.module.scss" << EOF
.container {
  // Add your styles here
}
EOF

# Create index.js for easy imports
cat > "$COMPONENT_PATH/index.js" << EOF
export { default } from './$COMPONENT_NAME';
EOF

echo -e "${GREEN}✅ Component created successfully at $COMPONENT_PATH${NC}"
echo -e "${GREEN}Files created:${NC}"
echo -e "  - $COMPONENT_PATH/$COMPONENT_NAME.jsx"
echo -e "  - $COMPONENT_PATH/$COMPONENT_NAME.module.scss"
echo -e "  - $COMPONENT_PATH/index.js"
