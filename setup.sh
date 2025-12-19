#!/bin/bash

###############################################################################
# WebdriverIO-Cucumber Framework Setup Script
# Author: Pravin - Senior QA Automation Engineer
# Description: Automated setup script for the test framework
###############################################################################

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

print_header() {
    echo ""
    echo "═══════════════════════════════════════════════════════════"
    echo "$1"
    echo "═══════════════════════════════════════════════════════════"
    echo ""
}

# Check if Node.js is installed
check_node() {
    print_header "Checking Prerequisites"
    
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_success "Node.js is installed: $NODE_VERSION"
        
        # Check if version is >= 18
        MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
        if [ "$MAJOR_VERSION" -lt 18 ]; then
            print_error "Node.js version must be >= 18.0.0"
            print_info "Please upgrade Node.js: https://nodejs.org/"
            exit 1
        fi
    else
        print_error "Node.js is not installed"
        print_info "Please install Node.js >= 18.0.0 from: https://nodejs.org/"
        exit 1
    fi
}

# Check if npm is installed
check_npm() {
    if command -v npm &> /dev/null; then
        NPM_VERSION=$(npm --version)
        print_success "npm is installed: $NPM_VERSION"
    else
        print_error "npm is not installed"
        exit 1
    fi
}

# Install dependencies
install_dependencies() {
    print_header "Installing Dependencies"
    
    print_info "This may take a few minutes..."
    npm install
    
    if [ $? -eq 0 ]; then
        print_success "Dependencies installed successfully"
    else
        print_error "Failed to install dependencies"
        exit 1
    fi
}

# Setup environment file
setup_env() {
    print_header "Setting Up Environment Configuration"
    
    if [ -f ".env" ]; then
        print_warning ".env file already exists"
        read -p "Do you want to overwrite it? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_info "Skipping .env file creation"
            return
        fi
    fi
    
    cp .env.example .env
    print_success "Created .env file from template"
    print_warning "Please update .env with your configuration"
}

# Create necessary directories
create_directories() {
    print_header "Creating Directories"
    
    DIRS=("test-results" "test-results/junit" "test-results/json" "allure-results" "screenshots" ".wdio-results")
    
    for dir in "${DIRS[@]}"; do
        if [ ! -d "$dir" ]; then
            mkdir -p "$dir"
            print_success "Created directory: $dir"
        else
            print_info "Directory already exists: $dir"
        fi
    done
}

# Download browser drivers
setup_drivers() {
    print_header "Setting Up Browser Drivers"
    
    print_info "Installing ChromeDriver..."
    npm install chromedriver --save-dev
    
    if [ $? -eq 0 ]; then
        print_success "ChromeDriver installed"
    else
        print_warning "Failed to install ChromeDriver"
    fi
    
    print_info "Installing GeckoDriver (Firefox)..."
    npm install geckodriver --save-dev
    
    if [ $? -eq 0 ]; then
        print_success "GeckoDriver installed"
    else
        print_warning "Failed to install GeckoDriver"
    fi
}

# Verify installation
verify_installation() {
    print_header "Verifying Installation"
    
    # Check if wdio is available
    if [ -f "node_modules/.bin/wdio" ]; then
        print_success "WebdriverIO CLI is available"
    else
        print_error "WebdriverIO CLI not found"
        return 1
    fi
    
    # List installed packages
    print_info "Installed packages:"
    npm list --depth=0 | grep -E "wdio|cucumber|allure" || true
}

# Show next steps
show_next_steps() {
    print_header "Setup Complete! 🎉"
    
    echo "Next steps:"
    echo ""
    echo "1. Update the .env file with your configuration:"
    echo "   ${BLUE}nano .env${NC}"
    echo ""
    echo "2. Run tests locally:"
    echo "   ${BLUE}npm test${NC}"
    echo ""
    echo "3. Run tests with specific tags:"
    echo "   ${BLUE}npm test -- --cucumberOpts.tagExpression='@smoke'${NC}"
    echo ""
    echo "4. Generate Allure report:"
    echo "   ${BLUE}npm run report${NC}"
    echo ""
    echo "5. Run linting:"
    echo "   ${BLUE}npm run lint${NC}"
    echo ""
    echo "For more information, see README.md"
    echo ""
}

# Main execution
main() {
    clear
    
    print_header "🚀 WebdriverIO-Cucumber Framework Setup"
    
    echo "This script will help you set up the test automation framework."
    echo ""
    read -p "Press Enter to continue..."
    
    check_node
    check_npm
    install_dependencies
    setup_env
    create_directories
    setup_drivers
    verify_installation
    show_next_steps
}

# Run main function
main
