import { LightningElement, api } from 'lwc';
import myResource from '@salesforce/resourceUrl/Payment';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const today = new Date();

export default class VisiterEntryForm extends LightningElement {
    @api visterType;
    @api days;
    pageType = 'date';
    isDate = true;
    isVisiterDetail = false;
    isPayment = false;
    visitDate;
    value = '1';
    cdCard = myResource + '/Payment/cd1.jpg';
    gpayUPI = myResource + '/Payment/cd2.png';
    ishandleCDPayment = false;
    ishandleUPIPayment = false;
    dateErrorMessage;
    isNext = true;
    visitorId;
    Total_Number;
    visitIds;
    isSuccessRegister = false;
    amountPay = 999;


    get options() {
        return [
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5', value: '5' },
            { label: '6', value: '6' },
        ];
    }
    

    handleChange = (event) =>{
        let InName = event.target.name;
        let Inval = event.target.value;

        console.log(InName);
        console.log(Inval);

        if(InName === 'vistingdate'){
            console.log('IN1');
            this.visitDate = Inval;
            console.log('today---'+today);
            console.log('new Date(Inval)--'+new Date(Inval));
            let visitDateCls = this.template.querySelector('.visitDate');
            if(today > new Date(Inval)){
                visitDateCls.setCustomValidity("Date should be greater then today");
                this.isNext = true;
            }
            else{
                visitDateCls.setCustomValidity("");
                this.isNext = false;
              
            }
            visitDateCls.reportValidity();
           
        }   
        if(InName === 'Totalnumber'){
            this.Total_Number = Inval;
            this.amountPay = 999 * parseInt(this.Total_Number);
        }
        //console.log(visitorObj);
    }

    handleButton = (event) =>{
        console.log('Button');
        console.log(event.target.name);
        if(event.target.name === 'back'){
            console.log(back);
        }
        if(event.target.name === 'next'){
            if(this.pageType == 'date'){
                this.pageType = 'detailpage';
                this.isDate = false;
                this.isPayment = false;
                this.isVisiterDetail = true;
                console.log(this.visitDate);
                //if(!this.visitDate){
                    let visitDateCls = this.template.querySelector('.visitDate');
                    visitDateCls.setCustomValidity('Please Select the Date');
                    //}else{
                     //   visitDateCls.setCustomValidity('');
                   // }
                    visitDateCls.reportValidity();
                    
                    //dateErrorMessage = 'Please Select the date';
                
            }
            else if(this.pageType == 'detailpage'){
                if(this.visitorId){
                    this.pageType = 'paymentPage';
                    this.isDate = false;
                    this.isVisiterDetail = false;
                    this.isPayment = true;
                }
                else{
                    const evt = new ShowToastEvent({
                        title: "ERROR",
                        message: `Please enter the details and then Click the Submit button`,
                        variant: "ERROR",
                        });
                        this.dispatchEvent(evt);
                }
               
            }
            else if(this.pageType == 'paymentPage'){
                if(this.visitorId){
                    this.pageType = 'finalPage';
                    this.isDate = false;
                    this.isVisiterDetail = false;
                    this.isPayment = false;
                }
                else{
                    const evt = new ShowToastEvent({
                        title: "ERROR",
                        message: `Please enter the details and then Click the Submit button`,
                        variant: "ERROR",
                        });
                        this.dispatchEvent(evt);
                }
               
            }
            console.log(next);
        }
    }

    handleCDPayment = (event) =>{
        console.log('handleCDPayment');
        this.isDate = false;
        this.isVisiterDetail = false;
        this.isPayment = false;
        this.ishandleUPIPayment = false;
        this.ishandleCDPayment = false;
        this.isSuccessRegister = true;
        this.isNext = true;
        this.pageType == 'finalPage';

        
    }

    handleUPIPayment = (event) => {
        console.log('handleAPIPayment');
        this.isDate = false;
        this.isVisiterDetail = false;
        this.isPayment = false;
        this.ishandleUPIPayment = false;
        this.ishandleCDPayment = false;
        this.pageType == 'finalPage';
    }

    handleSuccess(event){
       this.visitorId = event.detail.id;
       //this.visitIds = event.detail.Name;
       //console.log('visitIds---'+visitIds);
       const evt = new ShowToastEvent({
        title: "SUCCESS",
        message: `User Detail Save Successfully with the ID- ${event.detail.Id}`,
        variant: "SUCCESS",
        });
        this.dispatchEvent(evt);
    }

    handleSubmit(event){
        event.preventDefault();
        // Get data from submitted form
        const fields = event.detail.fields;
        // Here you can execute any logic before submit
        // and set or modify existing fields
        fields.Visit_Date__c = this.visitDate;
        fields.Total_Number__c = parseInt(this.Total_Number);
        fields.Status__c = 'Submitted';
        // You need to submit the form after modifications
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }

    handleError(event){
        const evt = new ShowToastEvent({
            title: "ERROR",
            message: `Error`,
            variant: "ERROR",
            });
            this.dispatchEvent(evt);
    }

    handleBack = (event) =>{
        console.log('this.pageType---'+this.pageType);
            if(this.pageType == 'detailpage'){
                this.pageType = 'date';
                this.isDate = true;
                this.isPayment = false;
                this.isVisiterDetail = false;
                this.isNext = false;
            }
            else if(this.pageType == 'paymentPage'){
                this.pageType = 'finalPage';
                this.isDate = false;
                this.isVisiterDetail = true;
                this.isPayment = false;
                this.isNext = false;
            }
            else if(this.pageType == 'date' || this.pageType == 'finalPage'){
                this.isVisiterDetail = false;
                console.log('IN -----')
                this.dispatchEvent(new CustomEvent('select', {detail : false} ));
            }        
    }
}