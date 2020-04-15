describe('Test update flow', () => {
    const testResult = {
        kind: 'TEST_RESULT',
        name: 'Test result, does not exist',
        description: 'I do not exist, i am merely a mock',
        schema: {
            $schema: 'https://json-schema.org/draft/2019-09/schema',
            properties: {
                fileName: {
                    description: 'A random test filename',
                    title: 'Filename',
                    type: 'string'
                }
            },
            required: [
                'fileName'
            ],
            type: 'object'
        }
    }

    beforeEach(() => {
        cy.server()

        cy.route({
            url: '/api/flow',
            method: 'PUT',
            status: 200,
            response: {}
        })

        cy.route('GET', '/api/flow/1', {
            name: 'Old name',
            applicationId: 'Coolest app ever!',
            schedule: '0 0  * * * *',
            resultConfig: {
                kind: 'HTTP',
                config: {
                    url: 'https://website.net',
                    size: 120
                },
                id: 1
            },
            activityLogEnabled: true,
            id: 1
        })

        cy.route('GET', '/api/log/1/*/*/0', {
            totalPages: 1,
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

        cy.route('GET', '/api/flow/all/0', {
            totalPages: 1,
            pageData: [
                {
                    name: 'New and cool name',
                    applicationId: 'And a lovely ID',
                    schedule: '* * * * * *',
                    resultConfig: { kind: 'TEST_RESULT' },
                    id: 1
                }
            ]
        })

        cy.route('GET', '/api/result/description', [testResult])

        cy.visit('/flow/1')
    })

    it('Dialog with flow-form is shown on edit click', () => {
        cy.get('#update-dialog-title').should('not.be.visible')
        cy.get('#update-init').click()
        cy.get('#update-dialog-title').should('be.visible')
    })

    it('Dialog disappear on cancel', () => {
        cy.get('#update-dialog-title').should('not.be.visible')
        cy.get('#update-init').click()
        cy.get('#update-dialog-title').should('be.visible')
        cy.get('#form-cancel').click()
        cy.get('#update-dialog-title').should('not.be.visible')
    })

    it('Update snack appear upon when form is saved', () => {
        cy.get('#update-init').click()
        cy.get('#update-dialog-title').should('be.visible')
        cy.get('#name-field').clear().type('New and cool name').blur()
        cy.get('#submit').click()

        cy.contains('Flow updated')
    })
})
