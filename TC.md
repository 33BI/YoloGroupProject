Test Cases.

API testing should be performed functional and non-functional.

Functional testing.

TC1. As a tester I should be able to create a user
Scenario outline: Create a user
    Given the following body request values "<name>", "<firstLastName>", "<secondLastName>", "<CURP>", "<RFC>" for the {{url}}/users endpoint (POST)
    When I send it
    Then I should get a successful body response with status code 200

    Examples:
    | name      | firstLastName | secondLastName    | CURP                  | RFC               |
    | "Tiina"   | "Bless"       | "Pure"            | "COEA791226MGRRVM07"  | "XYTB450923L72"   |

TC2. As a tester I should not be able to create a user that already exists
Scenario outline: Attempt to create a user that already exists
    Given the following body request values "<name>", "<firstLastName>", "<secondLastName>", "<CURP>", "<RFC>" for the {{url}}/users endpoint (POST)
    When I send it
    Then I should get a message telling me that the user already exists
    And the status code should be 409

    Examples:
    | name      | firstLastName | secondLastName    | CURP                  | RFC               |
    | "Tiina"   | "Bless"       | "Pure"            | "COEA791226MGRRVM07"  | "XYTB450923L72"   |

TC3. As a tester I should be able to get all the users
Scenario: Get all the users registered in ExBanking
    Given the following {{url}}/users endpoint (GET)
    When I send it
    Then I should get all the users registered in ExBanking
    And the status code should be 200

TC4. As a tester I should be able to get a specific user
Scenario outline: Get an existing user by CURP
    Given the following "<CURP>" param for the {{url}}/users/{{CURP}} endpoint (GET)
    When I send it
    Then I should get that user
    And the status code should be 200

    Examples:
    | CURP                  |
    | COEA791226MGRRVM07    |

TC5. The service should return a message if the user does not exist
Scenario outline: Service should return a message if the user does not exist
    Given the following "<CURP>" param for the {{url}}/users/{{CURP}} endpoint (GET)
    When I send it
    Then the service should return a message telling me that the user does not exist
    And the status code should be 404

    Examples:
    | CURP                  |
    | MUAE770826HHGNGD54    |

TC6. As a tester I should be able to perform a deposit to an existing account
Scenario outline: Deposit money to an existing account
    Given the following body request values "<account>" and "<ammount>" for the {{url}}/deposits endpoint (POST)
    When I send it
    Then I should get a successful body response with status code 200

    Examples:
    | account           | ammount   |
    | 9528176430254871  | 567.00    |

TC7. As a tester I should not be able to perform a deposit if the account does not exist
Scenario outline: Attempt to deposit money to a non-existing account
    Given the following body request values "<account>" and "<ammount>" for the {{url}}/deposits endpoint (POST)
    When I send it
    Then the service should return a message telling me that the operation was not performed due to the account does not exist
    And the status code should be 404

    Examples:
    | account           | ammount   |
    | 7391063999991501  | 567.00    |

TC8. As a tester I should be able to withdraw money from any account
Scenario outline: Withdraw money
    Given the following body request values "<account>" and "<ammount>" for the {{url}}/withdrawals endpoint (POST)
    When I send it
    Then I should get a successful body response 
    And the status code should be 200

    Examples:
    | account           | ammount   |
    | 9528176430254871  | 30.45     |

TC9. As a tester I should not be able to withdraw money if the account does not have funds
Scenario outline: Attempt to withdraw money from an account without funds
    Given the following body request values "<account>" and "<ammount>", where the account does not have funds, for the {{url}}/withdrawals endpoint (POST)
    When I send it
    Then the service should return a message telling me that the operation was not performed due to the account does not have funds
    And the status code should be 422

    Examples:
    | account           | ammount   |
    | 9528176430254871  | 30.45     |

TC10. As a tester I should be able to get a balance from a specific account
Scenario outline: Get balance from a specific account
    Given the following "<account>" param for the {{url}}/balance/{{account}} endpoint (GET)
    When I send it
    Then I should be able to get the balance
    And the status code should be 200

    Examples:
    | account           |
    | 9528176430254871  |

TC11. As a tester I should not be able to get a balance if the account does not exist
Scenario outline: Attempt to get balance from a non-existing account
    Given the following "<account>" param for the {{url}}/balance/{{account}} endpoint (GET)
    When I send it
    Then the service should return a message telling me that account does not exist
    And the status code should be 404

    Examples:
    | account           |
    | 5027391827461938  |

TC12. As a tester I should be able to send money to an existing account
Scenario outline: Send money to an existing account
    Given the following body requests values "<account>", "<ammount>", "<destination>" and "<concept>" for the {{url}}/transfers endpoint (POST)
    When I send it
    Then I should get a successful body response
    And the status code should be 200

    Examples:
    | account           | ammount   | destination       | concept                       |
    | 9528176430254871  | 45.00     | 8261935704526184  | "Transfer!"  |

TC13. As a tester I should not be able to send money if the account does not exist
Scenario outline: Attempt to send money to an non-existing account
    Given the following body requests values "<account>", "<ammount>", "<destination>" and "<concept>", where the account does not exist, for the {{url}}/transfers endpoint (POST)
    When I send it
    Then the service should return a message telling me that the destination account does not exist
    And the status code should be 404

    Examples:
    | account           | ammount   | destination       | concept                       |
    | 9528176430254871  | 45.00     | 8947321654098721  | "Transfer!"  |

TC14. As a tester I should not be able to send money if the ammount is less than or equal to $0.00
Scenario outline: Attempt to send $0.00
    Given the following body requests values "<account>", "<ammount>", "<destination>" and "<concept>", for the {{url}}/transfers endpoint (POST)
    When I send it
    Then the service should return a message telling me that the ammount should be greater than $0.00
    And the status code should be 422

    Examples:
    | account           | ammount   | destination       | concept      |
    | 9528176430254871  | 0.00      | 8261935704526184  | "Transfer!"  |

TC15. As a tester I should not be able to send money if I do not have funds in the account
Scenario outline: Attempt to send money using an account without funds
    Given the following body requests values "<account>", "<ammount>", "<destination>" and "<concept>", for the {{url}}/transfers endpoint (POST)
    When I send it
    Then the service should return a message telling me that the sender account does not have funds
    And the status code should be 422

    Examples:
    | account           | ammount   | destination       | concept                       |
    | 8261935704526184  | 1000.00   | 374283589513936   | "Transfer!"  |

Following functional test cases are going to be automated: TC1, TC2, TC3, TC4, TC6, TC8, TC10, TC12.

Non-Functional testing.

#TC16. The service messages should be translated into any language
Scenario outline: Change the language of the service
    Given the ExBanking service is used in "<language>"
    Then I should be able to see all the application translated in the language I set

    Examples:
    | language      |
    | español       |
    | english       |
    | français      |