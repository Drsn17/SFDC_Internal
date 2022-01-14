import { LightningElement , track} from 'lwc';

import getContactList from '@salesforce/apex/ContactController.fetchFewContacts';
import getAccount from '@salesforce/apex/miniProject.getAccounts';
import getContact from '@salesforce/apex/miniProject.getContacts';

export default class ObjectListingAppParent extends LightningElement
{
    @track listOfAccounts;
    @track listOfContacts;

    listOfContacts;
    selectedContact;

    accountCheck = false;
    contactCheck =false;

    handleSelect(event) {
        const selectedName = event.detail.name;
        console.log(selectedName);

        if(selectedName === 'accounts')
        {
            this.contactCheck=false;
            this.accountCheck=true;
        }
        else if(selectedName === 'contacts')
        {
            this.accountCheck=false;
            this.contactCheck=true;
        }
        else
        {
            this.accountCheck=false;
            this.contactCheck=false;
        }
    }

    connectedCallback()
    {
        getAccount()
            .then(acc =>
            {
                this.listOfAccounts = acc;
            })
            .catch(error =>
            {
                console.log(JSON.stringify(error));
            })
        
        getContact()
            .then(conc =>
            {
                this.listOfContacts = conc;
            })
            .catch(error =>
            {
                console.log(JSON.stringify(error));
            })
    }

    // connectedCallback()
    // {
    //     getContactList().then(response => {this.listOfContacts = response})
    // }

    // contactSelected = (event) =>
    // {
    //     console.log('Inside Parent Handler');
    //     const contactId = event.detail;
    //     this.listOfContacts.map(contact =>
    //     {
    //         if (contact.Id === contactId) {
    //             this.selectedContact = contact;
    //         }
    //     });
    // }
}