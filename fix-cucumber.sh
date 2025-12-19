#!/bin/bash

###############################################################################
# Cucumber Installation Fix Script
# Fixes: "You're calling functions on an instance of Cucumber that isn't running"
# Author: Pravin - Senior QA Automation Engineer
###############################################################################

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}🔧 Cucumber Installation Fix Script${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""

# Step 1: Check and remove global cucumber
echo -e "${YELLOW}1️⃣ Checking for global Cucumber installations...${NC}"
GLOBAL_CUCUMBER=$(npm list -g --depth=0 2>/dev/null | grep -i cucumber)
if [ ! -z "$GLOBAL_CUCUMBER" ]; then
    echo -e "${RED}   Found global Cucumber installation!${NC}"
    echo "   $GLOBAL_CUCUMBER"
    echo -e "${YELLOW}   Removing global Cucumber...${NC}"
    npm uninstall -g @cucumber/cucumber 2>/dev/null
    npm uninstall -g cucumber 2>/dev/null
    echo -e "${GREEN}   ✅ Global Cucumber removed${NC}"
else
    echo -e "${GREEN}   ✅ No global Cucumber found${NC}"
fi

# Step 2: Clean project
echo ""
echo -e "${YELLOW}2️⃣ Cleaning project directories...${NC}"
if [ -d "node_modules" ]; then
    echo "   Removing node_modules..."
    rm -rf node_modules
    echo -e "${GREEN}   ✅ node_modules removed${NC}"
fi

if [ -f "package-lock.json" ]; then
    echo "   Removing package-lock.json..."
    rm -f package-lock.json
    echo -e "${GREEN}   ✅ package-lock.json removed${NC}"
fi

# Step 3: Clear npm cache
echo ""
echo -e "${YELLOW}3️⃣ Clearing npm cache...${NC}"
npm cache clean --force 2>&1 | grep -v "npm warn"
echo -e "${GREEN}   ✅ Cache cleared${NC}"

# Step 4: Reinstall dependencies
echo ""
echo -e "${YELLOW}4️⃣ Reinstalling dependencies...${NC}"
echo "   This may take 2-3 minutes..."
npm install --no-audit --prefer-offline 2>&1 | tail -5
if [ $? -eq 0 ]; then
    echo -e "${GREEN}   ✅ Dependencies installed successfully${NC}"
else
    echo -e "${RED}   ❌ Installation failed!${NC}"
    echo "   Please check the error messages above."
    exit 1
fi

# Step 5: Verify installation
echo ""
echo -e "${YELLOW}5️⃣ Verifying installation...${NC}"

# Check WebdriverIO
WDIO_VERSION=$(npx wdio --version 2>/dev/null)
if [ ! -z "$WDIO_VERSION" ]; then
    echo -e "${GREEN}   ✅ WebdriverIO: $WDIO_VERSION${NC}"
else
    echo -e "${RED}   ❌ WebdriverIO not found${NC}"
fi

# Check Cucumber
CUCUMBER_VERSION=$(npx cucumber-js --version 2>/dev/null)
if [ ! -z "$CUCUMBER_VERSION" ]; then
    echo -e "${GREEN}   ✅ Cucumber: $CUCUMBER_VERSION${NC}"
else
    echo -e "${RED}   ❌ Cucumber not found${NC}"
fi

# Check for local cucumber
if [ -d "node_modules/@cucumber/cucumber" ]; then
    echo -e "${GREEN}   ✅ @cucumber/cucumber installed locally${NC}"
else
    echo -e "${RED}   ❌ @cucumber/cucumber not found in node_modules${NC}"
fi

# Step 6: Final check
echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Fix completed!${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""
echo "Next steps:"
echo "1. Run tests: ${BLUE}npm test${NC}"
echo "2. If issues persist, check: ${BLUE}TROUBLESHOOTING.md${NC}"
echo ""
