import { LightningElement, wire } from 'lwc';
import getVisitorsDetails from '@salesforce/apex/VistorDetailController.getVisitorsDetails';
import updateVisitorRecord from '@salesforce/apex/VistorDetailController.updateVisitorRecord';
import FIELDS from '@salesforce/schema/Visitor_Details__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const actions = [
    { label: 'Show details', name: 'show_details' },
    { label: 'Checked Id', name:'checkIn'},
];

const columns = [
    {
        label: 'Vistor Id', fieldName: 'Name', type: 'text', sortable: true
    },
    {
        label: 'First Name', fieldName: 'First_Name__c', type: 'text', sortable: true
    }, {
        label: 'Last Name', fieldName: 'Last_Name__c', type: 'text'
    }, {
        label: 'Adhar Crad', fieldName: 'Adhar_Card__c', type: 'text', sortable: true
    }, {
        label: 'Visiting Date', fieldName: 'Visit_Date__c', type: 'date', sortable: true
    },
    {
        label: 'Visiter Status', fieldName: 'Status__c', type: 'text', sortable: true
    },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    },
    
]

export default class VisitorAdminTable extends LightningElement {

    fields = [FIELDS];
    accountColumns = columns;
    searchedAccountData = [];
    accountAllData = [];
    sortBy;
    sortDirection;
    error;
    visitorrecordId;
    isrecordView = false;

    @wire(getVisitorsDetails)
    wiredAccounts({ data, error })
    {
        if (error) {
            this.error = error;
            console.log(error);
        }
        else if (data) {
            this.accountAllData = data;
            this.searchedAccountData = [...this.accountAllData];
            console.log(this.searchedAccountData);
        }
    }

    searchDataTable = (event) =>
    {
        let searchString = event.target.value;
        let allRecords = this.accountAllData;

        if (searchString && searchString !== '') {
            this.searchedAccountData = allRecords.filter(record =>
            {
                return record.Name.toUpperCase().includes(searchString.toUpperCase());
            })
        }
        else {
            this.searchedAccountData = this.accountAllData;
        }
    }

    handleSortData = (event) =>
    {
        this.sortBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;

        this.sortData(this.sortBy, this.sortDirection);
    }

    sortData = (fieldName, direction) =>
    {
        let parseData = JSON.parse(JSON.stringify(this.searchedAccountData));

        //Return the value stored on the field
        let keyValue = (record) =>
        {   
            return record[fieldName];
        }

        let isReverse = direction === 'asc' ? 1 : -1;

        parseData.sort((x, y) =>
        {
            x = keyValue(x) ? keyValue(x) : ''; //handling null values
            y = keyValue(y) ? keyValue(y) : '';
            return isReverse * ((x > y) - (y > x))
        });

        this.searchedAccountData = parseData;

    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        console.log('actionName---'+actionName);
        const row = event.detail.row;
        switch (actionName) {
            case 'checkIn':
                this.updateRecord(row);
                break;
            case 'show_details':
                this.showRowDetails(row);
                break;
            default:
        }
    }

    showRowDetails(row){
        console.log('row');
        console.log(row);
        console.log('row---'+row.Id);

        if(row.Status__c != 'Approved'){
            this.visitorrecordId = row.Id;
            this.isrecordView = true;
        }
        else{
            const evt = new ShowToastEvent({
                title: "ERROR",
                message: `This User is already checked In`,
                variant: "ERROR",
                });
                this.dispatchEvent(evt);
        }
    }

    updateRecord(row){
        console.log('Update Records');
        if(row.Status__c != 'Approved'){
            //Apex Method called
            updateVisitorRecord({vistorObj : row})
            .then(result => {
                console.log(result);
                //this.contacts = result;
            })
            .catch(error => {
                console.log(error);
                //this.error = error;
            });
            //this.visitorrecordId = row.Id;
            //this.isrecordView = true;
        }
        else{
            const evt = new ShowToastEvent({
                title: "ERROR",
                message: `This User is already checked In`,
                variant: "ERROR",
                });
                this.dispatchEvent(evt);
        }
        
    }

    handleBack= () =>{
        this.isrecordView = false;
    }

}