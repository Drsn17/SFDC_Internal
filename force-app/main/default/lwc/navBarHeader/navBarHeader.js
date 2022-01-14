import { LightningElement, api } from 'lwc';

export default class NavBarHeader extends LightningElement {
    //@api activeTab = 1;
    @api isModel = false;
    showTabTwo (event){
        console.log(event);
    }

    handleActive = (event) => {
      //  this.activeTab = event.target.value;
    }

    handleBookNow =()=>{
        this.isModel = true;
    }

    handleSelectedItem (event)
    {
        console.log('On Parent');
        this.isModel = false;
        
    }
}