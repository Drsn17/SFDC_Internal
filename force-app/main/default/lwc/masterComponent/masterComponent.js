import { LightningElement } from 'lwc';
import getRecordList from '@salesforce/apex/RecordPreviewController.fetchRecordList';
export default class MasterComponent extends LightningElement 
{
    selectedObject;
    selectedFields = [];
    accountFields = ['Name', 'Industry', 'Rating'];
    contactFields = ['Name', 'Phone', 'Email'];
    opportunityFields = ['Name', 'StageName', 'CloseDate'];
    leadFields = ['Name', 'Email', 'Phone'];
    caseFields = ['CaseNumber', 'Origin', 'Status'];
    listOfRecords;
    callbackError;
    isPreviewFormRendered = false;
    isSpinner = false;


    handleSelectedItem(event){
       
        this.isSpinner = true;
        /*
        if(this.selectedObject && event.detail  !== this.selectedObject) {
            eval("$A.get('e.force:refreshView').fire();");
            console.log('refresh');
        }*/
        this.selectedObject = event.detail;
        this.isPreviewFormRendered = false;
        

        console.log(this.selectedObject);

        //Calling the apex to get the records for selected object...
        if(this.selectedObject) {
            //const selectedFields = switch-case;

            switch(this.selectedObject) { 
                case 'Account' : this.selectedFields = this.accountFields; 
                    break; 
                case 'Contact' : this.selectedFields = this.contactFields; 
                    break;
                case 'Opportunity' : this.selectedFields = this.opportunityFields;
                    break;
                case 'Lead' : this.selectedFields = this.leadFields;
                    break;
                case 'Case' : this.selectedFields = this.caseFields;
                    break; 
                default: this.selectedFields = null;
            }

            getRecordList({sobjectName : this.selectedObject, fields : JSON.stringify(this.selectedFields)})
                .then(result => {
                    this.listOfRecords = result;
                    this.template.querySelector('c-record-card-view').onHnadleRecord();
                })
                .catch(error => {
                    console.log(error);
                    this.callbackError = error;
                });
        }
    }

    

}