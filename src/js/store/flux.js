const getState = ({ getStore, getActions, setStore }) => {
	const urlApi = "https://playground.4geeks.com/contact/";
	const slug = "ricardoclaro"; 

	return {
		store: { 
			slug: slug, 
			contacts: [] 
		},
		actions: { 

					
			createAgenda: () => {
				return fetch(urlApi + "agendas/" + slug, {
					method: "POST", 
					headers: {
						"Content-Type": "application/json" 
					},
					body: JSON.stringify({
						slug: slug, 
						contacts: [] 
					})
				})
					.then(response => { 
						if (response.ok) { 
							console.log("Agenda creada exitosamente");
						} else { 
							throw new Error("Error creando la agenda");
						}
					}) 
					.catch(error => console.error("Error creando la agenda:", error));
			},
			
			fetchContacts: () => {
				fetch(urlApi + "agendas/" + slug + "/contacts")
					.then(response => { 
						if (!response.ok) {
							if (response.status === 404) { 
								
								return getActions().createAgenda().then(() => getActions());
							} else { 
								throw new Error('Network response was not ok');
							}
						} 
						return response.json();
					})
					
					.then(data => setStore({ contacts: data.contacts }))
					.catch(error => console.error("Error fetching contacts:", error)); 
			},
			
			addContact: (contact) => {
				return fetch(urlApi + `agendas/${slug}/contacts`, { 
					method: "POST", 
					headers: {
						"Content-Type": "application/json" 
					},
					body: JSON.stringify({ 
						name: contact.name, 
						email: contact.email,
						phone: contact.phone,
						address: contact.address
					})
				})
					.then(response => { 
						if (!response.ok) throw new Error('Network response was not ok');
						return response.json(); 
					})
					.then(newContact => {
						const store = getStore(); 
						
						const updatedContacts = [...store.contacts, newContact];
						setStore({ contacts: updatedContacts });
					})
					.catch(error => console.error("Error adding contact:", error)); 
			},
			
			editContact: (updatedContact) => { 
				fetch(urlApi + `agendas/${slug}/contacts/${updatedContact.id}`, { 
					method: "PUT", 
					headers: {
						"Content-Type": "application/json" 
					},
					body: JSON.stringify({ 
						name: updatedContact.name, 
						email: updatedContact.email,
						phone: updatedContact.phone,
						address: updatedContact.address
					})
				})
					.then(response => { 
						
						if (!response.ok) throw new Error('Network response was not ok');
						return response.json();
					})
					.then(modifiedContact => { 
						const store = getStore();

						const updatedContacts = store.contacts.map(contact =>

							contact.id === modifiedContact.id ? modifiedContact : contact
						);
						setStore({ contacts: updatedContacts }); 
					})
					.catch(error => console.error("Error editing contact:", error)); 
			},
			
			deleteContact: (id) => { 
				fetch(urlApi + `agendas/${slug}/contacts/${id}`, {
					method: "DELETE" 
				})
					.then(response => { 
						if (!response.ok) throw new Error('Network response was not ok');
						const store = getStore(); 						
						const updatedContacts = store.contacts.filter(contact => contact.id !== id);
						setStore({ contacts: updatedContacts }); 
					})
					.catch(error => console.error("Error deleting contact:", error)); 
			}
		}
	};
};

export default getState; 