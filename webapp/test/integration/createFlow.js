describe('Test flow creation form', () => {
	beforeEach(() => {
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

	it('Schedule name must be non-empty', () => {
		cy.get('input[name="schedule"]')
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

	it('Schedule must be no more than 255 long', () => {
		cy.get('input[name="schedule"]')
			.type('#'.repeat(101))
			.blur()

		cy.contains('Schedule is too long!')
	})

	it('Displays error when flow name is already in use', () => {
		cy.get('input[name="name"]')
			.type('What a lovely name')

		cy.get('input[name="applicationId"]')
			.type('And a lovely ID')

		cy.get('input[name="schedule"]')
			.type('* * * * * *')

		cy.server()
		cy.route({
			url: '/api/flow',
			method: 'POST',
			status: 409,
			response: {}
		})

		cy.get('button[type="submit"]').click()

		cy.contains('Name already exist!')
	})

	it('Displays error when cron is invalid', () => {
		cy.get('input[name="name"]')
			.type('What a lovely name')

		cy.get('input[name="applicationId"]')
			.type('And a lovely ID')

		cy.get('input[name="schedule"]')
			.type('* * * * * *')

		cy.server()
		cy.route({
			url: '/api/flow',
			method: 'POST',
			status: 400,
			response: {}
		})

		cy.get('button[type="submit"]').click()

		cy.contains('Invalid Cron expression!')
	})

	it('Shows "Flow added" toast when creating flow', () => {
		cy.get('input[name="name"]')
			.type('What a lovely name')

		cy.get('input[name="applicationId"]')
			.type('And a lovely ID')

		cy.get('input[name="schedule"]')
			.type('* * * * * *')

		cy.server()
		cy.route({
			url: '/api/flow',
			method: 'POST',
			status: 200,
			response: {}
		})

		cy.get('button[type="submit"]').click()

		cy.contains('Flow added')
	})

	it('Shows "Connection error!" toast when failing to create flow', () => {
		cy.get('input[name="name"')
			.type('What a lovely name')

		cy.get('input[name="applicationId"')
			.type('And a lovely ID')

		cy.get('input[name="schedule"]')
			.type('* * * * * *')

		cy.server()
		cy.route({
			url: '/api/flow',
			method: 'POST',
			status: 504,
			response: {}
		})

		cy.get('button[type="submit"]').click()

		cy.contains('Connection error!')
	})

	it('Goes back to / page when flow is created', () => {
		cy.get('input[name="name"]')
			.type('What a lovely name')

		cy.get('input[name="applicationId"]')
			.type('And a lovely ID')

		cy.get('input[name="schedule"]')
			.type('* * * * * *')

		cy.server()
		cy.route({
			url: '/api/flow',
			method: 'POST',
			status: 200,
			response: {}
		})

		cy.get('button[type="submit"]').click()

		cy.wait(2000)

		cy.location('pathname').should('eq', '/')
	})
})
