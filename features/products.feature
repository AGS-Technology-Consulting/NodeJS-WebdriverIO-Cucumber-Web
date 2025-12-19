@regression @products
Feature: Product Catalog
  As a logged-in user
  I want to browse products
  So that I can add items to my cart

  Background:
    Given I am logged in as "standard_user"

  @smoke @passed
  Scenario: View product details
    When I am on the products page
    And I click on the first product
    Then I should see the product details page
    And I should see the product name
    And I should see the product price

  @skip @wip
  Scenario: Filter products by price
    When I am on the products page
    And I select filter "Price (low to high)"
    Then products should be sorted by price ascending
