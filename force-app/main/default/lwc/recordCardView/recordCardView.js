import { LightningElement, api } from 'lwc';

export default class RecordCardView extends LightningElement {
    @api listOfRecords;
    @api selectedObject;
    selectedRecordId;
    @api isPreviewFormRendered;
    @api isSpinner;

    isAccount;
    isContact;
    isLead;
    isOpportunity;
    isCase;
    


    onPreview = (event) => {
        const recordIds  = event.target.value;
        console.log('recordIds----'+recordIds);

        const selectedRecordId1 = event.target.dataset.id;
        console.log('recordIds----'+selectedRecordId1);
        this.selectedRecordId = selectedRecordId1;
        this.isPreviewFormRendered = true;
        //Get the recordId of clicked preview card..
        //this.selectedRecordId = event.target.Id;
    }

    @api onHnadleRecord() {
        
        console.log('on Connected callback');
        this.isPreviewFormRendered = false;
       // this.template.querySelector('c-preview-record-component').onPreviewCall();
        //alert('connectedCallBack');
        if(this.selectedObject == 'Account'){
            this.isAccount = true;
            this.isContact = false;
            this.isLead =false;
            this.isOpportunity = false;
            this.isCase =false;
        }
        else if(this.selectedObject == 'Contact'){
            this.isAccount = false;
            this.isContact = true;
            this.isLead =false;
            this.isOpportunity = false;
            this. isCase =false;
        }
        else if(this.selectedObject == 'Opportunity'){
            this.isAccount = false;
            this.isContact = false;
            this.isLead =false;
            this.isOpportunity = true;
            this.isCase =false;
        }
        else if(this.selectedObject == 'Lead'){
            this.isAccount = false;
            this.isContact = false;
            this.isLead = true;
            this.isOpportunity = false;
            this.isCase =false;
        }
        else if(this.selectedObject == 'Case'){
            this.isAccount = false;
            this.isContact = false;
            this.isLead =false;
            this.isOpportunity = false;
            this.isCase = true;
        }
        this.isSpinner = !this.isSpinner;
    }
}