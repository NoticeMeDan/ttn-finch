describe('Test delete flow', () => {
    beforeEach(() => {
        cy.server()

        cy.route('GET', '/api/flow/all/0', {
            totalPages: 1,
            pageData: [
                {
                    name: 'Cool flow 1',
                    applicationId: 'coolest application ever',
                    id: 1
                },
                {
                    name: 'Cool flow 2',
                    applicationId: 'coolest application ever',
                    id: 2
                }
            ]
        }).as('pageOne')

        cy.route({
            url: '/api/flow/1',
            method: 'DELETE',
            status: 200,
            response: {}
        })

        cy.visit('/')
    })

    it('Dialog warning is shown when trying to delete', () => {
        cy.get('#alert-dialog-title').should('not.be.visible')
        cy.get('#delete-1').click()
        cy.get('#alert-dialog-title').should('be.visible')
    })

    it('Dialog disappear on cancel', () => {
        cy.get('#alert-dialog-title').should('not.be.visible')
        cy.get('#delete-1').click()
        cy.get('#alert-dialog-title').should('be.visible')
        cy.get('#delete-cancel').click()
        cy.get('#alert-dialog-title').should('not.be.visible')
    })

    it('Delete snack appear upon delete', () => {
        cy.get('#delete-1').click()
        cy.get('#delete-confirm').click()

        cy.contains('Flow deleted')
    })
})
