#!/bin/bash

###############################################################################
# Test Execution Helper Script
# Author: Pravin - Senior QA Automation Engineer
# Description: Easy test execution with various options
###############################################################################

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Function to print header
print_header() {
    echo ""
    echo "═══════════════════════════════════════════════════════════"
    echo -e "${BLUE}$1${NC}"
    echo "═══════════════════════════════════════════════════════════"
    echo ""
}

# Function to show menu
show_menu() {
    clear
    print_header "🧪 WebdriverIO-Cucumber Test Runner"
    
    echo "Select test execution option:"
    echo ""
    echo "1) Run all tests"
    echo "2) Run smoke tests (@smoke)"
    echo "3) Run regression tests (@regression)"
    echo "4) Run login tests (@login)"
    echo "5) Run product tests (@products)"
    echo "6) Run tests in Chrome"
    echo "7) Run tests in Firefox"
    echo "8) Run specific feature file"
    echo "9) Generate Allure report"
    echo "10) Clean test results"
    echo "0) Exit"
    echo ""
    read -p "Enter your choice [0-10]: " choice
}

# Execute tests with tags
run_with_tags() {
    local tags=$1
    print_header "Running tests with tags: $tags"
    npm test -- --cucumberOpts.tagExpression="$tags"
}

# Run specific feature
run_feature() {
    echo "Available features:"
    echo "1) login.feature"
    echo "2) products.feature"
    echo ""
    read -p "Select feature [1-2]: " feature_choice
    
    case $feature_choice in
        1)
            print_header "Running login.feature"
            npm test -- --spec=./features/login.feature
            ;;
        2)
            print_header "Running products.feature"
            npm test -- --spec=./features/products.feature
            ;;
        *)
            echo "Invalid choice"
            ;;
    esac
}

# Generate report
generate_report() {
    print_header "Generating Allure Report"
    npm run report
}

# Clean results
clean_results() {
    print_header "Cleaning Test Results"
    rm -rf allure-results allure-report test-results screenshots .wdio-results
    mkdir -p allure-results test-results screenshots .wdio-results
    echo -e "${GREEN}✓ Test results cleaned${NC}"
}

# Main loop
while true; do
    show_menu
    
    case $choice in
        1)
            print_header "Running All Tests"
            npm test
            ;;
        2)
            run_with_tags "@smoke"
            ;;
        3)
            run_with_tags "@regression"
            ;;
        4)
            run_with_tags "@login"
            ;;
        5)
            run_with_tags "@products"
            ;;
        6)
            print_header "Running Tests in Chrome"
            BROWSER=chrome npm test
            ;;
        7)
            print_header "Running Tests in Firefox"
            BROWSER=firefox npm test
            ;;
        8)
            run_feature
            ;;
        9)
            generate_report
            ;;
        10)
            clean_results
            ;;
        0)
            echo "Exiting..."
            exit 0
            ;;
        *)
            echo -e "${YELLOW}Invalid choice. Please try again.${NC}"
            sleep 2
            ;;
    esac
    
    echo ""
    read -p "Press Enter to continue..."
done
