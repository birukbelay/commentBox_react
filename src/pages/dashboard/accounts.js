

 const accounts = [
    {
        id: 1,
        name: 'Checking',
        transactions: [
            {
                id: 1,
                amount: -100.00,
                type: 'debit',
                tags: [
                    'groceries'
                ]
            },
            {
                id: 2,
                amount: 2000.00,
                type: 'credit',
                tags: [
                    'payroll'
                ]
            },
            {
                id: 3,
                amount: -50.00,
                type: 'debit',
                tags: [
                    'credit card',
                    'bills'
                ]
            },
            {
                id: 4,
                amount: -300.00,
                type: 'debit',
                tags: [
                    'car',
                    'bills'
                ]
            },
            {
                id: 5,
                amount: -1000.00,
                type: 'transfer out',
                tags: [
                    'savings'
                ]
            },
            {
                id: 5,
                amount: -1000.00,
                type: 'transfer out',
                tags: [
                    'mm account'
                ]
            }
        ]
    },
    {
        id: 2,
        name: 'Savings',
        transactions: [
            {
                id: 1,
                amount: 1000.00,
                type: 'transfer in',
                tags: [
                    'savings'
                ]
            }
        ]
    },
    {
        id: 3,
        name: 'Mutual Market',
        transactions: [
            {
                id: 1,
                amount: 1000.00,
                type: 'transfer in',
                tags: [
                    'groceries'
                ]
            }
        ]
    },
]


export default accounts