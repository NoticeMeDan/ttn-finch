
describe('Test flow creation form', () => {
    beforeEach(() => {
        cy.server()
        cy.route('GET', '/api/flow/all/0', {
            totalPages: 2,
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
        }).as('pageOne')

        cy.route('GET', '/api/flow/all/1', {
            totalPages: 2,
            pageData: [
                {
                    name: 'Mega ultra cool name 2000',
                    applicationId: 'Burn everything skull on fire blood scream',
                    schedule: '* * * * * *',
                    resultConfig: { kind: "TEST_RESULT" },
                    id: 2
                },
                {
                    name: 'Bad-ass flow, dont mess with me',
                    applicationId: 'I drive a Kia',
                    schedule: '* * * * * *',
                    resultConfig: { kind: "TEST_RESULT" },
                    id: 3
                 }
            ]
        }).as('pageTwo')

        cy.visit('/')
    })

    it('Paginates correctly', () => {
        cy.contains('What a lovely name')
        cy.contains('I love the world')

        cy.get('button[title="Next page"]').click()

        cy.contains('Mega ultra cool name 2000')
        cy.contains('Bad-ass flow, dont mess with me')
    })

    it('Goes to activityLog for given flow', () => {
        cy.location('pathname').should('eq', '/')
        cy.get('#flow-1').click()
        cy.location('pathname').should('eq', '/flow/1')
    })
})
