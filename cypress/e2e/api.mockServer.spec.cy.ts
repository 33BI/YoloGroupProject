describe('ExBanking mock server API tests', () => {

    // TC1
    it('should post a user successfully', () => {
        cy.fixture('requests/usersPostRequest').then((bodyRequest) => {
            cy.request('POST', Cypress.env('baseUrl') + '/users', { bodyRequest }).then((response) => {
                expect(response.isOkStatusCode).to.be.true;
                expect(response.status).to.be.eq(200);
                cy.fixture('responses/usersPostResponse').should('deep.equal', response.body);
                
                cy.wrap(response.body.CURP).as('CURP');

                cy.wrap(response.body.account).as('account');
            });
        });
    });

    // TC2
    it('should not post an existing user', () => {
        cy.fixture('requests/usersPostRequest').then((bodyRequest) => {
            cy.request({
                method: 'POST',
                url: Cypress.env('baseUrl') + '/users/existing',
                body: bodyRequest,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.isOkStatusCode).to.be.false;
                expect(response.status).to.be.eq(409);
                expect(response.statusText).to.be.eq('Conflict');
                cy.fixture('responses/existingUserPostResponse').should('deep.equal', response.body);
            });
        });
    });

    // TC3
    it('should get all the users registered in the service', () => {
        cy.request('GET', Cypress.env('baseUrl') + '/users').then((response) => {
            expect(response.isOkStatusCode).to.be.true;
            expect(response.status).to.be.eq(200);
            cy.fixture('responses/usersGetResponse').should('deep.equal', response.body);
        });
    });

    // TC4
    it('should get a specific user registered in the service', function() {
        cy.request('GET', Cypress.env('baseUrl') + '/users/' + this.CURP).then((response) => {
            expect(response.isOkStatusCode).to.be.true;
            expect(response.status).to.be.eq(200);
            cy.fixture('responses/usersGetResponse').then((user) => {
                expect(user[0]).to.deep.eq(response.body)
            });
        });
    });

    // TC6
    it('should deposit money successfully to an existing account', () => {
        cy.fixture('requests/depositsPostRequest').then((bodyRequest) => {
            cy.request('POST', Cypress.env('baseUrl') + '/deposits', { bodyRequest }).then((response) => {
                expect(response.isOkStatusCode).to.be.true;
                expect(response.status).to.be.eq(200);
                cy.fixture('responses/depositsPostResponse').should('deep.equal', response.body);
            });
        });
    });

    // TC8
    it('should withdraw money successfully from an existing account', () => {
        cy.fixture('requests/withdrawalsPostRequest').then((bodyRequest) => {
            cy.request('POST', Cypress.env('baseUrl') + '/withdrawals', { bodyRequest }).then((response) => {
                expect(response.isOkStatusCode).to.be.true;
                expect(response.status).to.be.eq(200);
                cy.fixture('responses/withdrawalsPostResponse').should('deep.equal', response.body);
            });
        });
    });

    // TC10
    it('should get a balance of an existing account', function() {
        cy.request('GET', Cypress.env('baseUrl') + '/balance/' + this.account).then((response) => {
            expect(response.isOkStatusCode).to.be.true;
            expect(response.status).to.be.eq(200);
            cy.fixture('responses/balanceGetResponse').should('deep.equal', response.body);
        });
    });

    // TC12
    it('should transfer money successfully to an existing account', () => {
        cy.fixture('requests/transfersPostRequest').then((bodyRequest) => {
            cy.request('POST', Cypress.env('baseUrl') + '/transfers', { bodyRequest }).then((response) => {
                expect(response.isOkStatusCode).to.be.true;
                expect(response.status).to.be.eq(200);
                cy.fixture('responses/transfersPostResponse').should('deep.equal', response.body)
            });
        });
    });
});