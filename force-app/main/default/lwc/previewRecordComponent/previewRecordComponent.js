import { LightningElement, api } from 'lwc';

export default class PreviewRecordComponent extends LightningElement {
    @api selectedObjectName;
    @api selectedRecordId;
}