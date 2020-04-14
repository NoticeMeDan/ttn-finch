describe('Test delete flow', () => {
    beforeEach(() => {
        cy.server()
        cy.route('GET', '/api/flow/1', {
            name: "What a lovely name",
            applicationId: "Coolest app ever!",
            schedule: "0 0  * * * *",
            resultConfig: {
                kind: "HTTP",
                config: {
                    "url": "www.website.net",
                    "size": 120
                },
                id: 1
            },
            activityLogEnabled: true,
            id: 1
        })

        cy.route('GET', '/api/flow/all/0', {
            totalPages: 1,
            pageData: [
                {
                    name: 'What a lovely name',
                    applicationId: 'And a lovely ID',
                    schedule: '* * * * * *',
                    resultConfig: { kind: "TEST_RESULT" },
                    id: 1
                },
                {
                    name: 'I love the world',
                    applicationId: 'Everything is love',
                    schedule: '* * * * * *',
                    resultConfig: { kind: "TEST_RESULT" },
                    id: 2
                }
            ]
        })

        cy.route('GET', '/api/log/1/*/*/0', {
            totalPages: 2,
            pageData: [
                {
                    time: 1584375912,
                    message: 'Heyo 1'
                },
                {
                    time: 1584375913,
                    message: 'Heyo 2'
                }
            ]
        })

        cy.route({
            url: '/api/flow/1',
            method: 'DELETE',
            status: 200,
            response: {}
        })

        cy.visit('/flow/1')
    })

    it('Dialog warning is shown when trying to delete', () => {
        cy.get('#delete-dialog-title').should('not.be.visible')
        cy.get('#delete-init').click()
        cy.get('#delete-dialog-title').should('be.visible')
    })

    it('Dialog disappear on cancel', () => {
        cy.get('#delete-dialog-title').should('not.be.visible')
        cy.get('#delete-init').click()
        cy.get('#delete-dialog-title').should('be.visible')
        cy.get('#delete-cancel').click()
        cy.get('#delete-dialog-title').should('not.be.visible')
    })

    it('Delete snack appear upon delete', () => {
        cy.get('#delete-init').click()
        cy.get('#delete-confirm').click()

        cy.contains('Flow deleted')
    })
})
