@regression @login
Feature: User Authentication
  As a user
  I want to be able to login to the application
  So that I can access my account

  Background:
    Given I am on the login page

  @smoke @passed
  Scenario: Successful login with valid credentials
    When I enter username "standard_user"
    And I enter password "secret_sauce"
    And I click on the login button
    Then I should be redirected to the products page
    And I should see the products title "Products"

  @smoke @failed
  Scenario: Login with invalid credentials should fail
    When I enter username "invalid_user"
    And I enter password "wrong_password"
    And I click on the login button
    Then I should see an error message
    And I should remain on the login page
