// Handle form submission on the Track Budget page
if (window.location.pathname.endsWith('track-budget.html')) {
    document.getElementById('budget-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const totalBudgetInput = document.getElementById('total-budget');
        const expenseNameInput = document.getElementById('expense-name');
        const expenseAmountInput = document.getElementById('expense-amount');
        const remainingBudgetElement = document.getElementById('remaining-budget');

        const totalBudget = parseFloat(totalBudgetInput.value) || 0;
        const expenseName = expenseNameInput.value.trim();
        const expenseAmount = parseFloat(expenseAmountInput.value) || 0;

        // Input validation
        if (!expenseName || expenseAmount <= 0) {
            alert('Please enter valid expense details.');
            return;
        }

        // Initialize expenses in local storage if not present
        if (!localStorage.getItem('expenses')) {
            localStorage.setItem('expenses', JSON.stringify([]));
        }

        // Update expenses in local storage
        const expenses = JSON.parse(localStorage.getItem('expenses'));
        expenses.push({ name: expenseName, amount: expenseAmount });
        localStorage.setItem('expenses', JSON.stringify(expenses));

        // Calculate the remaining budget
        const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
        const remainingBudget = totalBudget - totalExpenses;

        // Update UI
        remainingBudgetElement.innerText = `Remaining Budget: $${remainingBudget.toFixed(2)}`;

        // Clear form fields
        expenseNameInput.value = '';
        expenseAmountInput.value = '';
    });
}

// Render expense data on the Expense Report page
if (window.location.pathname.endsWith('expense-report.html')) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const tableBody = document.getElementById('expense-table');

    // Populate the table with expense data
    if (expenses.length > 0) {
        expenses.forEach(expense => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${expense.name}</td><td>$${expense.amount.toFixed(2)}</td>`;
            tableBody.appendChild(row);
        });
    } else {
        // Show a message if no expenses are available
        const noDataMessage = document.createElement('tr');
        noDataMessage.innerHTML = `<td colspan="2" style="text-align: center;">No expenses recorded yet.</td>`;
        tableBody.appendChild(noDataMessage);
    }
}

// Clear all data (optional: add this feature to your UI if required)
function clearAllData() {
    localStorage.removeItem('expenses');
    alert('All data has been cleared.');
    if (window.location.pathname.endsWith('expense-report.html')) {
        location.reload();
    }
}
