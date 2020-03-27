
describe('Test flow creation form', () => {
	beforeEach(() => {
		cy.server()

		cy.route('GET', '/api/flow/all//0', {
			totalPages: 2,
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

		cy.route('GET', '/api/flow/all//1', {
			totalPages: 2,
			pageData: [
				{
					name: 'Not so cool flow 1',
					applicationId: 'worst application ever',
					id: 3
				},
				{
					name: 'Not so cool flow 2',
					applicationId: 'worst application ever',
					id: 4
				}
			]
		}).as('pageTwo')

		cy.visit('/')
	})

	it('Paginates correctly', () => {
		cy.contains('Cool flow 1')
		cy.contains('Cool flow 2')

		cy.get('button[title="Next page"]').click()

		cy.contains('Not so cool flow 1')
		cy.contains('Not so cool flow 2')
	})

	it('Goes to activityLog for given flow', () => {
		cy.location('pathname').should('eq', '/')
		cy.get(':nth-child(1) > .MuiTableCell-alignRight > .MuiButtonBase-root').click()
		cy.location('pathname').should('eq', '/flow/1')
	})
})
