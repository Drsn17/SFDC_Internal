import { LightningElement, api } from 'lwc';
import carouselImages from '@salesforce/resourceUrl/Amusement';


export default class UsecaseCarousel extends LightningElement
{
    image1 = carouselImages + '/beauty.jpg';
    image2 = carouselImages + '/park.jpg';
    image3 = carouselImages + '/water.jpg';
   
}