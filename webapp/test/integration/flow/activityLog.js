import { formatDateTime } from '../../../src/util/time'

describe('Test activity log', () => {
    beforeEach(() => {
        cy.server()

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
        }).as('pageOne')

        cy.route('GET', '/api/log/1/*/*/1', {
            totalPages: 2,
            pageData: [
                {
                    time: 1584375914,
                    message: 'Heyo 3'
                },
                {
                    time: 1584375915,
                    message: 'Heyo 4'
                }
            ]
        }).as('pageTwo')

        cy.route('GET', '/api/flow/1', {
            name: "Old name",
            applicationId: "Coolest app ever!",
            schedule: "0 0  * * * *",
            resultConfig: {
                kind: "HTTP",
                config: {
                    "url": "https://website.net",
                    "size": 120
                },
                id: 1
            },
            activityLogEnabled: true,
            id: 1
        })

        cy.visit('/flow/1')
    })

    it('Paginates correctly', () => {
        cy.contains(formatDateTime(1584375912))
        cy.contains('Heyo 1')
        cy.contains(formatDateTime(1584375913))
        cy.contains('Heyo 2')

        cy.get('button[title="Next page"]').click()

        cy.contains(formatDateTime(1584375914))
        cy.contains('Heyo 3')
        cy.contains(formatDateTime(1584375915))
        cy.contains('Heyo 4')
    })
})
