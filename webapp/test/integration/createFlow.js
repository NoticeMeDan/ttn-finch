describe('Test flow creation form', () => {
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

    function fillOutSchedule () {
        cy.get('input[name="schedule"]')
            .type('* * * * * *')
    }

    function fillOutName () {
        cy.get('input[name="name"]')
            .type('What a lovely name')
    }

    function fillOutApplicationId () {
        cy.get('input[name="applicationId"]')
            .type('And a lovely ID')
    }

    function fillOutResultConfig () {
        cy.get('.MuiSelect-root').click()
        cy.get('.MuiList-root > .MuiButtonBase-root').click()
        cy.get('#root_fileName').type('I am a filename')
        cy.get('.MuiButton-textPrimary').click()
    }

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
        })

        cy.route('GET', '/api/result/description', [testResult])

        cy.visit('/newflow')
    })

    it('Flow name must be non-empty', () => {
        cy.get('input[name="name"]')
            .focus()
            .blur()

        cy.contains('Required')
    })

    it('Flow name must be no more than 50 long', () => {
        cy.get('input[name="name"]')
            .type('#'.repeat(51))
            .blur()

        cy.contains('Name is too long!')
    })

    it('Application ID must be non-empty', () => {
        cy.get('input[name="applicationId"]')
            .focus()
            .blur()

        cy.contains('Required')
    })

    it('Application ID must be no more than 50 long', () => {
        cy.get('input[name="applicationId"]')
            .type('#'.repeat(51))
            .blur()

        cy.contains('Application ID is too long!')
    })

    it('Schedule name must be non-empty', () => {
        cy.get('input[name="schedule"]')
            .focus()
            .blur()

        cy.contains('Required')
    })

    it('Schedule must be no more than 255 long', () => {
        cy.get('input[name="schedule"]')
            .type('#'.repeat(101))
            .blur()

        cy.contains('Schedule is too long!')
    })

    it('ResultConfig must be added', () => {
        cy.get('.MuiSelect-root').click()
        cy.get('#menu-').click()
        cy.contains('Required')
    })

    it('ResultConfig must be created', () => {
        cy.get('.MuiSelect-root').click()
        cy.get('.MuiList-root > .MuiButtonBase-root').click()
        cy.get('.MuiButton-textSecondary').click()
        cy.contains('Required')

        fillOutResultConfig()
        cy.contains('Required').should('not.exist')
    })

    it('ResultConfig displays error when not properly filled out', () => {
        cy.get('.MuiSelect-root').click()
        cy.get('.MuiList-root > .MuiButtonBase-root').click()
        cy.get('.MuiButton-textPrimary').click()
        cy.contains('- is a required property')
    })

    it('Displays error when flow name is already in use', () => {
        fillOutName()

        fillOutApplicationId()

        fillOutSchedule()

        fillOutResultConfig()

        cy.server()
        cy.route({
            url: '/api/flow',
            method: 'POST',
            status: 409,
            response: {}
        })

        cy.get('button#submit').click()

        cy.contains('Name already exist!')
    })

    it('Displays error when cron is invalid', () => {
        fillOutName()

        fillOutApplicationId()

        fillOutSchedule()

        fillOutResultConfig()

        cy.server()
        cy.route({
            url: '/api/flow',
            method: 'POST',
            status: 400,
            response: {}
        })

        cy.get('button#submit').click()

        cy.contains('Invalid ResultConfig or Cron Expression!')
    })

    it('Shows "Flow added" toast when creating flow', () => {
        fillOutName()

        fillOutApplicationId()

        fillOutSchedule()

        fillOutResultConfig()

        cy.server()
        cy.route({
            url: '/api/flow',
            method: 'POST',
            status: 200,
            response: {}
        })

        cy.get('button#submit').click()

        cy.contains('Flow added')
    })

    it('Shows "Connection error!" toast when failing to create flow', () => {
        fillOutName()

        fillOutApplicationId()

        fillOutSchedule()

        fillOutResultConfig()

        cy.server()
        cy.route({
            url: '/api/flow',
            method: 'POST',
            status: 504,
            response: {}
        })

        cy.get('button#submit').click()

        cy.contains('Connection error!')
    })

    it('Goes back to / page when flow is created', () => {
        fillOutName()

        fillOutApplicationId()

        fillOutSchedule()

        fillOutResultConfig()

        cy.server()
        cy.route({
            url: '/api/flow',
            method: 'POST',
            status: 200,
            response: {}
        })

        cy.get('button#submit').click()

        cy.wait(2000)

        cy.location('pathname').should('eq', '/')
    })
})
