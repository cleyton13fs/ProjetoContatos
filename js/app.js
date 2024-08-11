document.addEventListener("DOMContentLoaded", () => {
    const contactList = document.getElementById('contact-list');
    const searchInput = document.getElementById('search');
    const addContactButton = document.getElementById('add-contact');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const saveButton = document.getElementById('save-button');
    const cancelButton = document.getElementById('cancel-button');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    
    let contacts = [
        { id: 1, name: "John Doe", phone: "555-1234", email: "john@example.com" },
        { id: 2, name: "Jane Smith", phone: "555-5678", email: "jane@example.com" },
        { id: 3, name: "Bob Johnson", phone: "555-9012", email: "bob@example.com" }
    ];
    let editingContactId = null;

    const displayContacts = (contactsToDisplay) => {
        contactList.innerHTML = '';
        contactsToDisplay.forEach(contact => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="contact-name">${contact.name}</td>
                <td class="contact-phone hidden-sm">${contact.phone}</td>
                <td class="contact-email hidden-sm">${contact.email}</td>
                <td><button class="button edit-button" data-id="${contact.id}">Editar</button></td>
            `;
            contactList.appendChild(row);

            row.querySelector('.contact-name').addEventListener('click', () => {
                row.classList.toggle('expanded');
            });

            row.querySelector('.edit-button').addEventListener('click', () => {
                editingContactId = contact.id;
                modalTitle.textContent = 'Editar Contato';
                saveButton.textContent = 'Atualizar';
                nameInput.value = contact.name;
                phoneInput.value = contact.phone;
                emailInput.value = contact.email;
                modal.classList.remove('hidden');
            });
        });
    };

    const updateContactCounter = () => {
        const counterElement = document.querySelector('.header h1');
        counterElement.textContent = `Contatos (${contacts.length})`;
    };

    const filterContacts = (searchTerm) => {
        const filteredContacts = contacts.filter(contact => 
            contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        displayContacts(filteredContacts);
    };

    searchInput.addEventListener('input', (e) => {
        filterContacts(e.target.value);
    });

    addContactButton.addEventListener('click', () => {
        editingContactId = null;
        modalTitle.textContent = 'Adicionar Contato';
        saveButton.textContent = 'Salvar';
        nameInput.value = '';
        phoneInput.value = '';
        emailInput.value = '';
        modal.classList.remove('hidden');
    });

    saveButton.addEventListener('click', () => {
        if (editingContactId === null) {
            const newContact = {
                id: contacts.length + 1,
                name: nameInput.value,
                phone: phoneInput.value,
                email: emailInput.value
            };
            contacts.push(newContact);
        } else {
            const contact = contacts.find(c => c.id === editingContactId);
            contact.name = nameInput.value;
            contact.phone = phoneInput.value;
            contact.email = emailInput.value;
        }
        displayContacts(contacts);
        updateContactCounter();
        modal.classList.add('hidden');
    });

    cancelButton.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    displayContacts(contacts);
    updateContactCounter();
});
