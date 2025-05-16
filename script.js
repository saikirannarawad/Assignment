let counters = [];
counters = [{ customers: [] }, { customers: [] }, { customers: [] }];

function renderCounters() {
    const container = document.getElementById('counters');
    container.innerHTML = '';

    counters.forEach((counter, index) => {
        const counterDiv = document.createElement('div');
        counterDiv.className = 'counter';

        counterDiv.addEventListener('click', () => {
            document.querySelectorAll('.counter').forEach(c => c.classList.remove('selected'));

            counterDiv.classList.add('selected');
        });

        const header = document.createElement('div');
        header.className = 'counter-header';
        header.innerHTML = `
        <span>
            Counter ${index + 1}
        </span>
        <span class="people-count-main"> 
        <span class="people-count"><i class="fas fa-users"></i> ${counter.customers.length} customers</span>
        <button class="delete" onclick="deleteCounter(${index})"><i class="fa-solid fa-trash" style="color: #4880ae; padding-left:3px"></i></button>
        </span>
        `;
        counterDiv.appendChild(header);

        const list = document.createElement('ul');
        list.className = 'customer-list';

        counter.customers.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'customer-item';

            const itemSpan = document.createElement('span');
            itemSpan.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> ${item} items`;


            const removeBtn = document.createElement('button');
            removeBtn.textContent = '-';
            removeBtn.className = 'remove-btn';

            removeBtn.onclick = () => {
                counter.customers.splice(index, 1);
                renderCounters();
            };

            li.appendChild(itemSpan);
            li.appendChild(removeBtn);
            list.appendChild(li);
        });

        counterDiv.appendChild(list);

        const total = counter.customers.reduce((a, b) => a + b, 0);
        const totalDiv = document.createElement('div');
        totalDiv.className = 'total-items';
        totalDiv.textContent = `Total Items: ${total}`;
        counterDiv.appendChild(totalDiv);

        container.appendChild(counterDiv);
    });
}

function addCustomer() {
    const input = document.getElementById('itemInput');
    const items = parseInt(input.value);

    if (!items || items <= 0) {
        alert('Please enter a valid number of items');
        return;
    }

    if (counters.length === 0) {
        alert('No counters available. Please add one.');
        return;
    }

    let minIndex = 0;
    let minTotal = counters[0].customers.reduce((a, b) => a + b, 0);

    for (let i = 1; i < counters.length; i++) {
        const total = counters[i].customers.reduce((a, b) => a + b, 0);
        if (total < minTotal) {
            minTotal = total;
            minIndex = i;
        }
    }

    counters[minIndex].customers.push(items);
    input.value = '';
    renderCounters();
}

function addCounter() {
    counters.push({ customers: [] });
    renderCounters();
}

function deleteCounter(index) {
    if (counters[index].customers.length > 0) {
        alert('Cannot delete. Customers are still in queue.');
        return;
    }
    counters.splice(index, 1);
    renderCounters();
}


renderCounters();
