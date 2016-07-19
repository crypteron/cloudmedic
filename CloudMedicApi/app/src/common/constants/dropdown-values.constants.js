angular.module('cloudmedic.dropdown.values', [])
.constant('DROPDOWN_PLANS', [
    { value: 0, text: 'Developer ($0)', amount: 0 },
    { value: 4, text: 'Startup ($49 / month)', amount:49 },
    { value: 5, text: 'Medium ($499 / month)', amount: 499 },
    { value: 6, text: 'Large ($1,200 / month)', amount: 1200 }
])
.constant('DROPDOWN_COMPANY_SIZES', [
    { value: 0, text: '--Select company size--' },
    { value: 1, text: '1' },
    { value: 2, text: '2-5' },
    { value: 3, text: '6-10' },
    { value: 4, text: '11-49' },
    { value: 5, text: '50-99' },
    { value: 6, text: '100-499' },
    { value: 7, text: '500-999' },
    { value: 8, text: '1,000-14,999' },
    { value: 9, text: '15,000-49,999' },
    { value: 10, text: '50,000-100,000' },
    { value: 11, text: '100,000+'}
])
.constant('DROPDOWN_INDUSTRY_VERTICALS', [
    { value: 0, text: '--Select an industry--' },
    { value: 1, text: 'Automotive' },
    { value: 2, text: 'Banking' },
    { value: 3, text: 'Consumer' },
    { value: 4, text: 'Education' },
    { value: 5, text: 'Engineering' },
    { value: 6, text: 'Energy' },
    { value: 8, text: 'Oil and Gas' },
    { value: 8, text: 'Fast-Moving Consumer Goods' },
    { value: 9, text: 'Financial' },
    { value: 10, text: 'Food and Beverage' },
    { value: 11, text: 'Government' },
    { value: 12, text: 'Healthcare' },
    { value: 13, text: 'Insurance' },
    { value: 14, text: 'Manufacturing' },
    { value: 15, text: 'Media' },
    { value: 16, text: 'Online' },
    { value: 17, text: 'Real Estate' },
    { value: 18, text: 'Religion' },
    { value: 19, text: 'Retail' },
    { value: 20, text: 'Technology' },
    { value: 21, text: 'Telecommunications' },
    { value: 22, text: 'Transportation' },
    { value: 23, text: 'Other'}
])
.constant('MONTHS', [
    { value: 1, text: 'January' },
    { value: 2, text: 'February' },
    { value: 3, text: 'March' },
    { value: 4, text: 'April' },
    { value: 5, text: 'May' },
    { value: 6, text: 'June' },
    { value: 7, text: 'July'},
    { value: 8, text: 'August' },
    { value: 9, text: 'September' },
    { value: 10, text: 'October' },
    { value: 11, text: 'November' },
    { value: 12, text: 'December' }
])
;