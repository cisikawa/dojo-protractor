 # features/g1.bolsonaro.feature
Feature: Search something in Angular home page
   As an user
   I should be able search for content in Angular home page
   In order to find information about a specific topic
    
    Scenario: See topics about Promise using search filter in Angular home page
        # Given the Angular site is up
        When I go to "https://angular.io/"
        And I search for "Promise" as filter
        Then I expect to see topics about "Promise"
            