

Feature: Search something in Angular home page
   As an user
   I should be able search for content in Angular home page
   In order to find information about a specific topic
    
    Scenario: See topics about Promise using search filter in Angular home page
        When I go to "https://angular.io/"
        And I search for "Promise" as filter
        Then I expect to see topics about "HammerLoader"
    
    Scenario: See topics about Protractor using search filter in Angular home page and read an Article
        When I go to "https://angular.io/"
        And I search for "Protractor" as filter
        And I expect to see topics about "Testability"
        And I click at "Testability" filter item    
        Then I expect to be at testability screen

    # Scenario: See topics about Build using search filter in Angular home page and read an Article
    #     When I go to "https://angular.io/"
    #     And I search for "Build" as filter
    #     And I expect to see topics about "AnimationBuilder"
    #     And I click at "AnimationBuilder" filter item    
    #     Then I expect to be at AnimationBuilder screen
    #     And At AnimationBuilder screen reading about "usage notes"