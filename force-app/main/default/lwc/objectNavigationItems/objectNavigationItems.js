import { LightningElement } from 'lwc';

export default class ObjectNavigationItems extends LightningElement 
{
    handleSelect(event) {
        
        const selectedObject = event.target.selectedItem;
        
        //dispatching the event to pass the selected item to Master Component...
        this.dispatchEvent(new CustomEvent('select', {detail : selectedObject} ));
    } 



        // console.log(selectedName);

        // if(selectedName === 'accounts')
        // {
        //     this.contactCheck=false;
        //     this.accountCheck=true;
        // }
        // else if(selectedName === 'contacts')
        // {
        //     this.accountCheck=false;
        //     this.contactCheck=true;
        // }
        // else
        // {
        //     this.accountCheck=false;
        //     this.contactCheck=false;
        // }
    //}
}